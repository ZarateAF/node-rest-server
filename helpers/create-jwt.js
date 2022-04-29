const jwt = require("jsonwebtoken");
const { User } = require("../models");

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

const validateJWT = async (token = "") => {
  try {
    if (token.length < 10) return null;

    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(uid);

    if (user && user.state) return user;

    return null;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createJWT,
  validateJWT,
};
