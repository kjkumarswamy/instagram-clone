const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllposts,
  myposts,
  deletepost,
  timelinePosts,
  likePost,
  commentPost,
} = require("../controllers/post");
const verifyToken = require("../middlewares");

//Create Post
router.post("/post/create", verifyToken, createPost);

//Get All Post
router.get("/post/getallposts", verifyToken, getAllposts);

//Get post By id
router.get("/post/myposts/:id", verifyToken, myposts);

//get timeline (following) post
router.get("/post/timeline", verifyToken, timelinePosts);

//Like or Dislike
router.put("/post/like", verifyToken, likePost);

//Comment Post
router.put("/post/comment", verifyToken, commentPost);

//Delete Post
router.delete("/post/delete/:id", verifyToken, deletepost);

module.exports = router;
