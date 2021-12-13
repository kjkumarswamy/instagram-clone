const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");
const verifyToken = require("../middlewares");

//register
router.post("/user/signup", signup);

//login
router.post("/user/signin", signin);

//signout
router.post("/user/signout", verifyToken, signout);

module.exports = router;
