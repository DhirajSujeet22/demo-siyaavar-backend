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
  .post("/signup", signUpUser)
  .post("/login", loginUser)
  .post("/logout", logOutUser);

// ------------------------

module.exports = router;
