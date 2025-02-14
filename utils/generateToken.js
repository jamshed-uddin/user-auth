const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "60s",
  });

  return token;
};

module.exports = { generateToken };
