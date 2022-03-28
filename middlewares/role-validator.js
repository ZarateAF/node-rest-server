const { request, response } = require("express");
const { json } = require("express/lib/response");

const isAdmin = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Role error",
    });
  }
  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE")
    return res.status(401).json({
      msg: `${name} Unauthorized`,
    });

  next();
};

const hasAnyRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user)
      return res.status(500).json({
        msg: "Role error",
      });

    if (!roles.includes(req.user.role))
      return res.status(401).json({
        msg: "Role error unauthorized",
      });
    next();
  };
};

module.exports = {
  isAdmin,
  hasAnyRole,
};
