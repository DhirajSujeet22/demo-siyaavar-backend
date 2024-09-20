const router = require("express").Router();
const verifyToken = require("../Middlewares/authMiddleware");

const { signUpUser, loginUser } = require("../controllers/Auth_Controller");

// ======================================================

router.post("/signup", signUpUser).post("/login", verifyToken, loginUser);

// ------------------------

module.exports = router;
