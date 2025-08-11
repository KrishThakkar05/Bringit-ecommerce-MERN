const mongoose = require("mongoose");
const Cart = require("../models/cart"); // Adjust path if needed

// 🛒 Add to Cart
const addToCart = async (req, res) => {
  const { userId, product } = req.body;

  if (!userId || !product || !product.productId) {
    return res.status(400).json({ message: "Missing userId or product data." });
  }

  try {
    const quantity = Number(product.quantity) || 1;

    let cart = await Cart.findOne({ userId });

    const newProduct = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
      quantity,
    };

    if (!cart) {
      cart = new Cart({
        userId,
        products: [newProduct],
      });
    } else {
      const index = cart.products.findIndex(
        (item) => item.productId.toString() === product.productId.toString()
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push(newProduct);
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("❌ Add to cart error:", error.message);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// 🧾 Get Cart
const getCart = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const cart = await Cart.findOne({ userId });

    const cleanCart = {
      userId,
      products:
        cart?.products.map((p) => ({
          productId: p.productId,
          name: p.name,
          price: p.price,
          imgUrl: p.imgUrl,
          quantity: p.quantity,
        })) || [],
    };

    res.status(200).json(cleanCart);
  } catch (error) {
    console.error("❌ Get cart error:", error.message);
    res.status(500).json({ message: "Error retrieving cart" });
  }
};

// ❌ Delete from cart
const deleteFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Missing userId or productId" });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    await cart.save();
    res.status(200).json({ message: "Product removed", cart });
  } catch (error) {
    console.error("❌ Delete from cart error:", error.message);
    res.status(500).json({ message: "Error removing item" });
  }
};

// ✅ Checkout Cart
const checkoutCart = async (req, res) => {
  const { userId } = req.params;
  const { shippingAddress, paymentMethod } = req.body;

  try {
    console.log("🛒 Checkout started for user:", userId);
    console.log("📦 Request body:", req.body);
    
    if (!userId) {
      console.log("❌ No userId provided");
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId });
    console.log("📦 Cart found:", cart ? "Yes" : "No");
    console.log("📦 Cart products:", cart ? cart.products.length : 0);

    if (!cart || cart.products.length === 0) {
      console.log("❌ Cart is empty");
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate totals
    const totalItems = cart.products.reduce((total, item) => total + (item.quantity || 1), 0);
    const totalAmount = cart.products.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    
    console.log("💰 Totals calculated - Items:", totalItems, "Amount:", totalAmount);

    // Create order data with full product details
    const orderData = {
      userId,
      products: cart.products.map(product => ({
        productId: product.productId,
        name: product.name,
        price: product.price,
        imgUrl: product.imgUrl,
        quantity: product.quantity || 1,
        totalPrice: product.price * (product.quantity || 1)
      })),
      totalItems,
      totalAmount,
      orderDate: new Date(),
      status: 'pending',
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || 'Credit Card',
      orderNumber: 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    console.log("📝 Order data created:", orderData);

    // Save order to MongoDB orders collection
    try {
      const db = mongoose.connection.db;
      if (!db) {
        throw new Error("MongoDB connection not available");
      }
      
      const ordersCollection = db.collection('orders');
      const result = await ordersCollection.insertOne(orderData);
      console.log("✅ Order saved to MongoDB orders collection:", result.insertedId);
    } catch (mongoError) {
      console.error("❌ MongoDB save error:", mongoError.message);
      throw new Error("Failed to save order to database: " + mongoError.message);
    }

    // Clear the cart
    cart.products = [];
    await cart.save();
    console.log("🧹 Cart cleared");

    console.log("🎉 Checkout completed successfully");
    res.status(200).json({ 
      message: "Checkout successful", 
      order: orderData,
      orderNumber: orderData.orderNumber,
      totalAmount,
      totalItems
    });
  } catch (error) {
    console.error("❌ Checkout error:", error.message);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({ message: "Checkout failed: " + error.message });
  }
};

// 🔄 Update Cart Item Quantity
const updateCartItemQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.products.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
    if (index === -1) return res.status(404).json({ message: "Product not found in cart" });

    if (quantity < 1) {
      cart.products.splice(index, 1);
    } else {
      cart.products[index].quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item" });
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteFromCart,
  checkoutCart,
  updateCartItemQuantity,
};
