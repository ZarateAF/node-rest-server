const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/user.controller");
const {
  roleIsValid,
  emailIsValid,
  userIdExists,
} = require("../helpers/db-validators");
const { fieldsValidations } = require("../middlewares/field-validator");
const { jwtValidation } = require("../middlewares/jwt-validator");

const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(userIdExists),
    check("role").custom(roleIsValid),
    fieldsValidations,
  ],
  userPut
);

router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("password", "Password should have more 6 words").isLength({ min: 6 }),
    check("email", "Email invalid").isEmail(),
    check("email").custom(emailIsValid),
    check("role").custom(roleIsValid),
    fieldsValidations,
  ],
  userPost
);

router.delete(
  "/:id",
  [
    jwtValidation,
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(userIdExists),
    fieldsValidations,
  ],
  userDelete
);

router.patch("/", userPatch);

module.exports = router;
