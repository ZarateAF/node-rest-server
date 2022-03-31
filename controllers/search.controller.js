const { response } = require("express");
const { isValidObjectId, ObjectId } = require("mongoose").Types;
const { Category, Product } = require("../models");
const User = require("../models/user");

const collectionsEnabled = ["users", "categories", "products", "roles"];

const searchByUser = async (term = "", res) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const exp = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: exp }, { email: exp }],
    $and: [{ state: true }],
  });

  return res.json({ results: users });
};

const searchByCategory = async (term = "", res) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const exp = new RegExp(term, "i");

  const categories = await Category.find({
    $or: [{ name: exp }],
    $and: [{ state: true }],
  });

  return res.json({ results: categories });
};

const searchByProducts = async (term = "", res) => {
  // const isMongoId = isValidObjectId(term);
  // if (isMongoId) {
  //   const product = await Product.findById(term).populate("category", "name");
  //   return res.json({
  //     results: product ? [product] : [],
  //   });
  // }

  const exp = new RegExp(term, "i");

  const products = await Product.find({
    $or: [{ name: exp }, { categories: ObjectId(term) }],
    $and: [{ state: true }],
  }).populate("category", "name");

  return res.json({ results: products });
};

const search = async (req, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsEnabled.includes(collection))
    return res.status(400).json({
      msg: "This collection doesn't exist",
    });

  switch (collection) {
    case "users":
      searchByUser(term, res);
      break;
    case "categories":
      searchByCategory(term, res);
      break;
    case "products":
      searchByProducts(term, res);
      break;
    default:
      return res.status(500).json({ msg: "This collection is not permited" });
  }
};

module.exports = {
  search,
};
