const bcrypt = require("bcryptjs");
const { response } = require("express");
const { createJWT } = require("../helpers/create-jwt");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, email, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });
    if (!user) {
      const data = {
        name,
        email,
        img,
        password: ":P",
        role: "USER_ROLE",
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "User blocked, call with Admin",
      });
    }

    const token = await createJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error google token",
    });
  }
};

const refreshToken = async(req, res) => {
  const { user } = req;
  const token = await createJWT(user.id);
  
  res.json({
    user,
    token
  });
}


module.exports = {
  loginPost,
  googleSignIn,
  refreshToken
};
