const router = require("express").Router();
const verifyToken = require("../Middlewares/authMiddleware");

const {
  signUpUser,
  loginUser,
  checkAuth,
  logOutUser,
} = require("../controllers/Auths_Controller");

// ======================================================

router
  .get("/check", verifyToken, checkAuth)
  .get("/logout", verifyToken, logOutUser)
  .post("/signup", signUpUser)
  .post("/login", loginUser);

// ------------------------

module.exports = router;
