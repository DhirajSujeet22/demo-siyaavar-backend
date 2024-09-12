const jwt = require("jsonwebtoken");
const userAuth = require("../model/auth_schema");
console.log("something");
//   ------------------------------------------------------------------
const verifyToken = async (req, res) => {
  try {
    console.log(req.cookies);
    const token = await req.cookies.user_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token required" });
    }

    const VerifyToken = jwt.verify(token, process.env.AUTH_SECRET);

    const rootUser = await userAuth.findOne({ email: VerifyToken.email });

    if (!rootUser) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    res.status(200).json({ message: "user found" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Unauthorize User" });
  }
};

module.exports = verifyToken;
