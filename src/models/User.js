const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: [3, "Minimum length should be 3 charecter"],
      maxLength: [12, "maximum length should 12 charecter"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Email should be valid"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password shoud be minimum 8 charecter"],
    },
    profilePic: {
      type: String,
      default:
        "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
