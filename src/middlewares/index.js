const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } else {
      return res.status(400).json({ error: "Authorization is required" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = verifyToken;
