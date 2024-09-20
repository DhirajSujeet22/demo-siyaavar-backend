const router = require("express").Router();
const { fetchUserById, updateUser } = require("../controllers/User_Controller");

// =========================================================

router.get("/own", fetchUserById);
router.patch("/:id", updateUser);

module.exports = router;
