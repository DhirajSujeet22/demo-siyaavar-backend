const router = require("express").Router();
const verifyToken = require("../Middlewares/authMiddleware");

const { signUpUser, loginUser } = require("../controllers/Auths_Controller");

// ======================================================

router.post("/signup", signUpUser).post("/login", verifyToken, loginUser);

// ------------------------

module.exports = router;
