import express from "express";
import { protect } from "../middleware/auth.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const router = express.Router();

// GET current user's cart
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");
  res.json(user.cart);
});

// POST add item / increment quantity
router.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user._id);

  const existingItem = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    user.cart.push({ product: productId, quantity: quantity || 1 });
  }

  await user.save();
  res.json(user.cart);
});

// PUT update quantity for a product
router.put("/:productId", protect, async (req, res) => {
  const { quantity } = req.body;
  const user = await User.findById(req.user._id);
  const item = user.cart.find(
    (item) => item.product.toString() === req.params.productId
  );
  if (!item) return res.status(404).json({ message: "Item not in cart" });

  item.quantity = quantity;
  await user.save();
  res.json(user.cart);
});

// DELETE remove a product from cart
router.delete("/:productId", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter(
    (item) => item.product.toString() !== req.params.productId
  );
  await user.save();
  res.json(user.cart);
});

export default router;
