const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExt = ["jpg", "png", "jpeg", "gif"],
  dir = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const shortName = file.name.split(".");
    const ext = shortName[shortName.length - 1];

    if (!validExt.includes(ext)) {
      return reject("Invalid extension");
    }

    const tempName = uuidv4() + "." + ext;
    const uploadPath = path.join(__dirname, "../uploads/", dir, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(tempName);
    });
  });
};

module.exports = {
  uploadFile,
};
