const categoryValidation = require("../middlewares/category-validator");
const fieldValidation = require("../middlewares/field-validator");
const fileValidation = require("../middlewares/file-validator");
const jwtValidation = require("../middlewares/jwt-validator");
const roleValidation = require("../middlewares/role-validator");

module.exports = {
  ...categoryValidation,
  ...fieldValidation,
  ...fileValidation,
  ...jwtValidation,
  ...roleValidation,
};
