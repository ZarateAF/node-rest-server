const { Category, Role, User, Product } = require("../models");

const roleIsValid = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) throw new Error(`Role ${role} is invalid`);
};

const emailIsValid = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new Error(`Email ${email} does not  exists`);
};

const userIdExists = async (id = "") => {
  const idExist = await User.findById(id);
  if (!idExist) throw new Error(`id ${id} does not  exists`);
};

const categoryIdExists = async (id = "") => {
  const idExist = await Category.findById(id);
  if (!idExist) throw new Error(`id ${id} does not exists`);
};

const productIdExists = async (id = "") => {
  const idExist = await Product.findById(id);
  if (!idExist) throw new Error(`id ${id} does not exists`);
};

module.exports = {
  categoryIdExists,
  emailIsValid,
  productIdExists,
  roleIsValid,
  userIdExists,
};
