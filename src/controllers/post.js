const Post = require("../models/Post");
const User = require("../models/User");

//Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.url,
      postedBy: req.user._id,
    });
    await newPost.save();
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Get All Post
exports.getAllposts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ $natural: -1 })
      .populate("_id", "username")
      .populate("postedBy", "username")
      .populate("comments.postedBy", "username");
    res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Get My Post
exports.myposts = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.params.id }).populate(
      "postedBy",
      "name"
    );
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Delete Post
exports.deletepost = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.send(400).json({ error: error.message });
  }
};

//timeline (Followig) Post
exports.timelinePosts = async (req, res) => {
  try {
    //user posts
    const myposts = await Post.find({ postedBy: req.user._id })
      .sort({ $natural: -1 })
      .populate("_id", "username")
      .populate("postedBy", "username")
      .populate("comments.postedBy", "username");

    //friends posts
    const currentUser = await User.findById(req.user._id);
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ postedBy: friendId })
          .sort({ $natural: -1 })
          .populate("_id", "username")
          .populate("postedBy", "username")
          .populate("comments.postedBy", "username");
      })
    );
    res.status(200).json(myposts.concat(...friendsPosts));
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Like or Dislike
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    if (!post.likes.includes(req.user._id)) {
      await post.updateOne({ $push: { likes: req.user._id } }, { new: true });
      res.status(200).json({ message: "Post liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.user._id } }, { new: true });
      res.status(200).json({ message: "Post disliked" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Comment Post
exports.commentPost = async (req, res) => {
  try {
    const comments = { text: req.body.text, postedBy: req.user._id };
    await Post.findByIdAndUpdate(req.body.id, {
      $push: { comments },
    });
    res.status(200).json({ message: "Post commented" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
