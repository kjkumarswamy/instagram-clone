const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
exports.signup = async (req, res) => {
  try {
    const already = await User.findOne({ email: req.body.email });
    if (already)
      return res.status(400).json({ error: "User already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed_password,
    });
    await newUser.save();
    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//login
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ error: "User email or password is wrong" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ error: "User email or password is wrong" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//logout
exports.signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
