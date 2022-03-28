const { request, response } = require("express");
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtValidation = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: "Invalid user",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(uid);
    req.uid = uid;
    req.user= user;
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
