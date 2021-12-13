const User = require("../models/User");
const bcrypt = require("bcrypt");

//Get User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Update User
exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcyrpt.genSalt(10);
      req.body.password = await bcrypt.compare(req.body.password, salt);
    }
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          profilePic: req.body.data.profilePic,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "User updated Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Follow & Unfollow USer
exports.followUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const user = await User.findById(req.body.id);

    if (!user.followings.includes(req.user._id)) {
      await user.updateOne({ $push: { followings: req.user._id } });
      await currentUser.updateOne({ $push: { followers: req.body.id } });
      res.status(200).json({ message: "User has been followed" });
    } else {
      await user.updateOne({ $pull: { followings: req.user._id } });
      await currentUser.updateOne({ $pull: { followers: req.body.id } });
      res.status(200).json({ message: "User has been unfollowed" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Search User
exports.searchUser = async (req, res) => {
  try {
    res.status(200).json({ message: "User searching" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
