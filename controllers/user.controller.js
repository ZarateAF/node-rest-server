const bcrypt = require("bcryptjs");
const { response } = require("express");
const User = require("../models/user");

const userGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  // const users = await User.find(query).skip(Number(from)).limit(Number(limit));
  // const total = await User.countDocuments(query);

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ limit, from, total, users });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: "User updated",
    entry: {
      user,
    },
  });
};

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();
  res.json({
    msg: "User created",
    entry: {
      user,
    },
  });
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false});

  res.json({
    user,
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: "patch API",
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
};
