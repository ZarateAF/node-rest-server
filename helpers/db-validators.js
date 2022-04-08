const { Category, Role, User, Product } = require("../models");

const roleIsValid = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) throw new Error(`Role ${role} is invalid`);
  return true;
};

const emailIsValid = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new Error(`Email ${email} does not  exists`);
  return true;
};

const userIdExists = async (id = "") => {
  const idExist = await User.findById(id);
  if (!idExist) throw new Error(`id ${id} does not  exists`);
  return true;
};

const categoryIdExists = async (id = "") => {
  const idExist = await Category.findById(id);
  if (!idExist) throw new Error(`id ${id} does not exists`);
  return true;
};

const productIdExists = async (id = "") => {
  const idExist = await Product.findById(id);
  if (!idExist) throw new Error(`id ${id} does not exists`);
  return true;
};

const allowCollection = (collection= '', collections = []) => {
   const included = collections.includes(collection);
   if(!included) throw new Error(`This collection ${collection} does not exists`);
   return true;
}

module.exports = {
  allowCollection,
  categoryIdExists,
  emailIsValid,
  productIdExists,
  roleIsValid,
  userIdExists,
};
