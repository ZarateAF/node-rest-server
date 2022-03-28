const jwt = require("jsonwebtoken");

const createJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "8h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error jwt");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  createJWT,
};
