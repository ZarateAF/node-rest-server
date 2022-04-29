const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtValidation = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Invalid user",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(uid);

    if (!user)
      return res.status(401).json({
        msg: "Invalid user DB",
      });

    if (!user.state)
      return res.status(401).json({
        msg: "Invalid user status",
      });

    req.uid = uid;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  jwtValidation,
};
