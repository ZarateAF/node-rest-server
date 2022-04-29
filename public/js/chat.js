const URL = "http://localhost:9090/api/auth";
let user = null;
let socket = null;
const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ulUsers = document.querySelector("#ulUsers");
const ulMessages = document.querySelector("#ulMessages");
const btnExit = document.querySelector("#btnExit");

const jwtValidation = async () => {
  const token = localStorage.getItem("token") || "";
  if (token.length < 10) {
    window.location = "index.html";
    throw new Error("Invalid token");
  }
  const resp = await fetch(URL, {
    headers: { "x-token": token },
  });
  const { user: userDB, token: tokenDB } = await resp.json();
  localStorage.setItem("token", tokenDB);
  user = userDB;
  document.title = user.name;


  await socketConnect();
};

const socketConnect = async () => {
  socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });
  socket.on("connect", () => {
    console.log("Online");
  });

  socket.on("disconnect", () => {
    console.log("Offline");
  });

  socket.on("messages-recieved", renderMessages);

  socket.on("active-users", renderUsers);

  socket.on("private-message", (payload) => {
      console.log(payload)
  });
};

const renderUsers = (users = []) => {
  let usersHtml = "";
  users.forEach(({ name, uid }) => {
    usersHtml += `
        <li>
        <p>
        <h5 class='text-success'>
            ${name}
        </h5>
        <span class='fs-6 text-muted'>
        ${uid}
        </span>
        </p>
        </li>
        `;
  });
  ulUsers.innerHTML = usersHtml;
};

const renderMessages = (messages = []) => {
  let messagesHtml = "";
  messages.forEach(({ name, message }) => {
    messagesHtml += `
        <li>
        <p>
        <span class='text-primary'>
            ${name}:
        </span>
        <span>
        ${message}
        </span>
        </p>
        </li>
        `;
  });
  ulMessages.innerHTML = messagesHtml;
};

txtMessage.addEventListener('keyup', ({keyCode}) => {
    if(keyCode !== 13) return;
    const message = txtMessage.value;
    if(message.length === 0) return;
    const uid = txtUid.value;
    socket.emit("send-message", {message, uid});
})

const main = async () => {
  await jwtValidation();
};

main();
