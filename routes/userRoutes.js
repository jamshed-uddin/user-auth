const express = require("express");
const {
  registerUser,
  loginUser,
  searchUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", searchUser);
module.exports = router;
