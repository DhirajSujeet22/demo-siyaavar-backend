const jwt = require("jsonwebtoken");
const userAuth = require("../model/auth_schema");

// ------------------------------------------------------------------

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token required" });
    }

    const { userID } = jwt.verify(token, process.env.AUTH_SECRET);

    const rootUser = await userAuth.findById(userID).select({ password: 0 });

    if (!rootUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = rootUser;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
