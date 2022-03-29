const { Router } = require("express");
const { check } = require("express-validator");
const { loginPost, googleSignIn } = require("../controllers/auth.controller");
const { fieldsValidations } = require("../middlewares/field-validator");

const router = Router();

router.post(
  "/login",
  [
    check("password", "Password is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    fieldsValidations,
  ],
  loginPost
);

router.post(
  "/google",
  [
    check("id_token", "id_token is required").notEmpty(),
    fieldsValidations,
  ],
  googleSignIn
);
module.exports = router;
