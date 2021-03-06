const { Router } = require("express");
const { check } = require("express-validator");
const { loadFiles, updateFiles, showFiles, updateFilesCloudinary } = require("../controllers/uploads.controller");
const { allowCollection } = require("../helpers");

const { fieldsValidations } = require("../middlewares/field-validator");
const { hasFile } = require("../middlewares/file-validator");

const router = Router();

router.post("/", hasFile, loadFiles);

router.put(
  "/:collection/:id",
  [
    hasFile,
    check("id", "Id is invalid").isMongoId(),
    check("collection").custom((c) =>
      allowCollection(c, ["users", "products"])
    ),
    fieldsValidations,
  ],
  // updateFiles
  updateFilesCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("id", "Id is invalid").isMongoId(),
    check("collection").custom((c) =>
      allowCollection(c, ["users", "products"])
    ),
    fieldsValidations,
  ],
  showFiles
);

module.exports = router;
