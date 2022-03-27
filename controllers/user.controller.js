const { response } = require("express");

const userGet = (req, res = response) => {
  const { query } = req;
  res.json({
    msg: "get API",
    query,
  });
};

const userPut = (req, res = response) => {
  const { params } = req;
  res.json({
    msg: "put API",
    params,
  });
};

const userPost = (req, res = response) => {
  const { body } = req;
  res.json({
    msg: "post API",
    body,
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: "delete API",
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
