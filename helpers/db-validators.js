const Role = require("../models/role");
const User = require("../models/user");

const roleIsValid = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) throw new Error(`Role ${role} is invalid`);
};

const emailIsValid = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new Error(`Email ${email} exists`);
};

const userIdExists = async (id = "") => {
  const idExist = await User.findById(id);
  if (!idExist) throw new Error(`id ${id} exists`);
};

module.exports = {
  roleIsValid,
  emailIsValid,
  userIdExists,
};
