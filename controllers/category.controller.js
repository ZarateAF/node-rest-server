const { response } = require("express");
const { Category } = require("../models");

const getCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({ limit, from, total, categories });
};

const getCategoriesById = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.json(category);
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });

  if (categoryDB)
    return res.status(400).json({ msg: `Category ${categoryDB.name} exists` });

  const data = {
    name,
    user: req.user._id,
  };

  const category = await new Category(data);
  category.save();
  res.status(201).json(category);
};

const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  let { name, user } = req.body;
  name = name.toUpperCase();
  user = req.user._id;
  const category = await Category.findByIdAndUpdate(id, { name, user }, { new: true });

  res.json({
    msg: "Category updated",
    category,
  });
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true });

  res.json({
    msg: "Category was deleted",
    category,
  });
};

module.exports = {
  getCategories,
  getCategoriesById,
  createCategory,
  updateCategory,
  deleteCategory,
};
