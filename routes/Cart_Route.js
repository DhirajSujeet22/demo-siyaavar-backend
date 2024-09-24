const router = require("express").Router();
const {
  addToCarts,
  fetchCartsByUser,
  updateCarts,
  deleteCarts,
} = require("../controllers/Cart_Controller");
const verifyToken = require("../Middlewares/authMiddleware");

// =========================================================

router
  .get("/", verifyToken, fetchCartsByUser)
  .post("/", verifyToken, addToCarts)
  .patch("/:id", updateCarts)
  .delete("/:id", deleteCarts);

module.exports = router;
