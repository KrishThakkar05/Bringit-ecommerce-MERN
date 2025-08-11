const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  deleteFromCart,
  checkoutCart,
  updateCartItemQuantity,
} = require("../controllers/cartController");

router.post("/", addToCart);                        // Add product
router.get("/:userId", getCart);                       // Get user cart
router.delete('/:userId/:productId', deleteFromCart);  // Delete item
router.post("/:userId/checkout", checkoutCart);        // Checkout

// PATCH route for updating quantity
router.put('/:userId/:productId', updateCartItemQuantity);

module.exports = router;
