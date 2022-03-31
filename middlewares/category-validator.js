const { request, response } = require("express");
const { Category } = require("../models");

const categoryValidation = async (req = request, res = response, next) => {

  const { catId } = req.params;
  if (!catId) {
    return res.status(401).json({
      msg: "Invalid category",
    });
  }
  try {
    const category = await Category.findById(catId);

    if (!category)
      return res.status(401).json({
        msg: "Invalid category DB",
      });

    if (!category.state)
      return res.status(401).json({
        msg: "Invalid category status",
      });
    req.category = category;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid category",
    });
  }
};

module.exports = {
  categoryValidation,
};
