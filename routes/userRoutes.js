const express = require("express");
const {
  registerUser,
  loginUser,
  searchUser,
} = require("../controllers/userControllers");
const { protectMid } = require("../middlewares/protectMid");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", protectMid, searchUser); //private
module.exports = router;
