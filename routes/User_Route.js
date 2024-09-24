const router = require("express").Router();
const { fetchUserById, updateUser } = require("../controllers/User_Controller");
const verifyToken = require("../Middlewares/authMiddleware");

// =========================================================

router.get("/own", verifyToken, fetchUserById);
router.patch("/:id", updateUser);

module.exports = router;
