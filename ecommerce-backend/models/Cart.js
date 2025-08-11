const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      imgUrl: { type: String, required: true },
      quantity: { type: Number, required: true,  default: 1,
 }, // ✅ this is what schema expects
    },
  ],
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
