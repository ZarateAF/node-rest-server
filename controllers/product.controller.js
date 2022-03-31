const { response } = require("express");
const { Product } = require("../models");

const getProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({ limit, from, total, products });
};

const getProductsById = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

const createProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;
  body.name = body.name.toUpperCase();
  const productDB = await Product.findOne({ name: body.name });

  if (productDB)
    return res.status(400).json({ msg: `Product ${productDB.name} exists` });

  const data = {
    ...body,
    user: req.user._id,
  };

  const product = await new Product(data);
  product.save();
  res.status(201).json(product);
};

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  let { state, user, ...data } = req.body;
  data.name = data.name.toUpperCase();
  user = req.user._id;
  const product = await Product.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  res.json({
    msg: "Product updated",
    product,
  });
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({
    msg: "Product was deleted",
    product,
  });
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
