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

const middleware = require("../middlewares")

const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(userIdExists),
    check("role").custom(roleIsValid),
    middleware.fieldsValidations,
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
    middleware.fieldsValidations,
  ],
  userPost
);

router.delete(
  "/:id",
  [
    middleware.jwtValidation,
    // isAdmin,
    middleware.hasAnyRole('ADMIN_ROLE', 'SALES_ROLE'),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(userIdExists),
    middleware.fieldsValidations,
  ],
  userDelete
);

router.patch("/", userPatch);

module.exports = router;
