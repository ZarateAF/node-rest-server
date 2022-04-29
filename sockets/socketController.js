const { Socket } = require("socket.io");
const { validateJWT } = require("../helpers");
const { ChatMessages } = require("../models");

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
  const token = socket.handshake.headers["x-token"];
  const user = await validateJWT(token);
  if (!user) return socket.disconnect();

  chatMessages.addUser(user);
  io.emit("active-users", chatMessages.usersArr);
  socket.emit("messages-recieved", chatMessages.last10);

  socket.join(user.id);

  socket.on("disconnect", () => {
    chatMessages.disconnectedUser(user.id);
    io.emit("active-users", chatMessages.usersArr);
  });

  socket.on("send-message", ({ uid, message }) => {
    if (uid) {
      socket.to(uid).emit("private-message", {
        from: user.name,
        message,
      });
    } else {
      chatMessages.sendMessage(user.id, user.name, message);
      io.emit("messages-recieved", chatMessages.last10);
    }
  });
};

module.exports = {
  socketController,
};
