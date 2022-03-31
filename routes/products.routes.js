const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { productIdExists, categoryIdExists } = require("../helpers/db-validators");
const { jwtValidation, fieldsValidations, isAdmin, categoryValidation } = require("../middlewares");

const router = Router();
/**
 * {{url}}/api/categories
 */

//All categories - public
router.get("/", getProducts);

//Specific category - public
router.get(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(productIdExists),
    fieldsValidations,
  ],
  getProductsById
);

//Create category - private
router.post(
  "/",
  [
    jwtValidation,
    check("name", "Name is required").notEmpty(),
    check("category", "Category is invalid").isMongoId(),
    check("category").custom(categoryIdExists),
    fieldsValidations,
  ],
  createProduct
);

//Update category - private
router.put(
  "/:id",
  [
    jwtValidation,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(productIdExists),
    check("name", "Name is required").notEmpty(),
    fieldsValidations,
  ],
  updateProduct
);

//Delete category - private - Admin
router.delete("/:id", 
[
  jwtValidation,
  isAdmin,
  check("id", "Invalid id").isMongoId(),
  check("id").custom(productIdExists),
  fieldsValidations,
],
deleteProduct);

module.exports = router;
