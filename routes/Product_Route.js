const router = require("express").Router();
const {
  //   createProduct,
  fetchAllProduct,
  fetchProductById,
  //   updateProduct,
  //   deleteProduct,
} = require("../controllers/Product_Controller");

// =========================================================

router.get("/", fetchAllProduct).get("/:id", fetchProductById);
//   .post("/", createProduct)
//   .patch("/:id", updateProduct)
//   .delete("/:id", deleteProduct);

module.exports = router;
