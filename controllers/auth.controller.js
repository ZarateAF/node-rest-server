const bcrypt = require("bcryptjs");
const { response } = require("express");
const { createJWT } = require("../helpers/create-jwt");
const User = require("../models/user");

const loginPost = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        msg: "Wrong information",
      });

    if (!user.state)
      return res.status(400).json({
        msg: "Wrong information | pass",
      });

    const pass = bcrypt.compareSync(password, user.password);

    if (!pass)
      return res.status(400).json({
        msg: "Invalid Pass",
      });

    const token = await createJWT(user.id);

    res.json({
      msg: "Login ok",
      entry: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error",
    });
  }
};

module.exports = {
  loginPost,
};
