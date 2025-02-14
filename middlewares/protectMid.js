const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const protectMid = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    res.status(401).send({ message: "Authorization error" });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decode.id).select("-password");

    if (!user) {
      res.status(401).send({ message: "Authorization error" });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ message: "Authorization error" });
  }
};

module.exports = { protectMid };
