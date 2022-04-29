const { Router } = require("express");
const { check } = require("express-validator");
const { loginPost, googleSignIn, refreshToken } = require("../controllers/auth.controller");
const { fieldsValidations, jwtValidation } = require("../middlewares");

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
  [check("id_token", "id_token is required").notEmpty(), fieldsValidations],
  googleSignIn
);

router.get("/", jwtValidation, refreshToken);

module.exports = router;
