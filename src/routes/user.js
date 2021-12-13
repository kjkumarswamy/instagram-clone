const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserById,
  updateUser,
  followUser,
  searchUser,
} = require("../controllers/user");
const verifyToken = require("../middlewares");

//Get User
router.get("/user/getuser", verifyToken, getUser);

//Get User by id
router.get("/user/profile/:id", verifyToken, getUserById);

//Update User
router.put("/user/update", verifyToken, updateUser);

//Follow & Unfollow User
router.put("/user/follow", verifyToken, followUser);

//Search User
router.get("/user/search", verifyToken, searchUser);

module.exports = router;
