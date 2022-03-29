const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategoriesById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { categoryIdExists } = require("../helpers/db-validators");
const { jwtValidation, fieldsValidations, isAdmin } = require("../middlewares");

const router = Router();
/**
 * {{url}}/api/categories
 */

//All categories - public
router.get("/", getCategories);

//Specific category - public
router.get(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(categoryIdExists),
    fieldsValidations,
  ],
  getCategoriesById
);

//Create category - private
router.post(
  "/",
  [
    jwtValidation,
    check("name", "Name is required").notEmpty(),
    fieldsValidations,
  ],
  createCategory
);

//Update category - private
router.put(
  "/:id",
  [
    jwtValidation,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(categoryIdExists),
    check("name", "Name is required").notEmpty(),
    fieldsValidations,
  ],
  updateCategory
);

//Delete category - private - Admin
router.delete("/:id", 
[
  jwtValidation,
  isAdmin,
  check("id", "Invalid id").isMongoId(),
  check("id").custom(categoryIdExists),
  fieldsValidations,
],
deleteCategory);

module.exports = router;
