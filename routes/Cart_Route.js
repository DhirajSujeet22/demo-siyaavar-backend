const router = require("express").Router();
const {
  addToCarts,
  fetchCartsByUser,
  updateCarts,
  deleteCarts,
} = require("../controllers/Cart_Controller");

// =========================================================

router
  .get("/", fetchCartsByUser)
  .post("/", addToCarts)
  .patch("/:id", updateCarts)
  .delete("/:id", deleteCarts);

module.exports = router;
