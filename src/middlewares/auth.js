const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware for user authentication
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const decodeOnj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodeOnj;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user; // Attach user object to request for use in next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token not valid!!!!!" });
  }
};


module.exports = {
  userAuth,
};