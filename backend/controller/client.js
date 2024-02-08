const express = require("express");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const createHttpError = require("http-errors");
const User = require("../models/User");
const Merchant = require("../models/Merchant");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");

// Become a Merchant
const becomeMerchant = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  const { licenseId } = req.body;
  const merchantExist = await Merchant.findOne({ userId });

  if (!merchantExist) {
    if (userId) {
      const merchant = new Merchant({ userId, licenseId });
      const result = await merchant.save();
      const resObj = result.toObject();
      return res.status(201).json({ status: "success", ...resObj });
    }
  } else {
    return res
      .status(200)
      .json({ status: "success", message: "Already a merchant" });
  }

  next(createHttpError(401, "Request not allowed"));
});

// Get all products
const getProducts = asyncErrorHandler(async (req, res, next) => {
  const { pageNumber, limit } = req.query;
  const query = Product.find()
    .sort({ createdAt: -1 })
    .skip((Number(pageNumber) - 1) * Number(limit))
    .limit(Number(limit));
  const products = await query.exec();
  res.json(products);
});

// Get products by category with default sorting
const getProductsByCategory = asyncErrorHandler(async (req, res, next) => {
  const { category, pageNumber, limit } = req.query;
  const query = Product.find({ category: category })
    .sort({ createdAt: -1 })
    .skip((Number(pageNumber) - 1) * Number(limit))
    .limit(Number(limit));
  const products = await query.exec();
  res.json(products);
});

// Add to cart
const updateCart = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  if (userId) {
    if (quantity == 0) {
      await Cart.findOneAndDelete({ userId, productId });
      return res.json({
        status: "success",
        message: "Product removed",
      });
    }
    const updateCart = await Cart.findOneAndUpdate(
      { productId, userId },
      { $inc: { quantity } },
      { new: true }
    );
    if (updateCart) {
      return res.json(updateCart);
    }
    const cart = new Cart({ productId, userId, quantity });
    const result = await cart.save();
    const cartItem = await Cart.findById(result._id).populate(
      "userId productId"
    );
    return res.json(cartItem);
  }
  next(createHttpError(404, "User not found"));
});

// View Cart
// const viewCart = asyncErrorHandler(async (req, res, next) => {
//   const userId = req.userId;
//   if (userId) {
//     const cart = await Cart.aggregate([
//       {
//         $lookup: {
//           from: "products",
//           localField: "productId",
//           foreignField: "_id",
//           as: "productData",
//         },
//       },
//     ]);
//     return res.json(cart);
//   }
//   next(createHttpError(404, "User not found"));
// });
const viewCart = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  console.log(userId);
  if (userId) {
    try {
      const cartItems = await Cart.find({ userId }).populate(
        "userId productId"
      );

      if (cartItems.length === 0) {
        // If the user has no items in the cart, you might handle it here
        return res.status(404).json({ message: "Cart is empty" });
      }

      // Send the cart details with associated product details in the response
      res.status(200).json({ cartItems });
    } catch (error) {
      console.error(error);
      next(createHttpError(500, "Internal Server Error"));
    }
  } else {
    next(createHttpError(404, "User not found"));
  }
});

// Get Cart Count
const cartCount = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  const count = await Cart.countDocuments({ userId });
  return res.json(count);
});

// Search
const search = asyncErrorHandler(async (req, res, next) => {
  const { searchTerm } = req.params;
  console.log(searchTerm);
  const results = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ],
  }).exec();
  console.log(results);

  res.json(results);
});

const decreaseQuantity = async (req, res, next) => {
  try {
    const cartItemId = req.params.cartItemId;

    // Find the cart item
    const cartItem = await Cart.findById(cartItemId).populate(
      "userId productId"
    );

    // Check if the cart item exists
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Ensure the quantity doesn't go below zero
    if (cartItem.quantity > 1) {
      // Decrease the quantity
      const updatedCart = await Cart.findByIdAndUpdate(
        cartItemId,
        { $inc: { quantity: -1 } },
        { new: true }
      ).populate("userId productId");

      res.status(200).json({ cartItem: updatedCart });
    } else {
      res.status(400).json({ message: "Quantity cannot go below zero" });
    }
  } catch (error) {
    console.error(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

const increaseQuantity = async (req, res, next) => {
  try {
    const cartItemId = req.params.cartItemId;
    const updatedCart = await Cart.findByIdAndUpdate(
      cartItemId,
      { $inc: { quantity: 1 } },
      { new: true }
    ).populate("userId productId");

    res.status(200).json({ cartItem: updatedCart });
  } catch (error) {
    console.error(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const cartItemId = req.params.cartItemId;
    const removedCartItem = await Cart.findByIdAndRemove(cartItemId).populate(
      "userId productId"
    );

    res.status(200).json({ removedCartItem });
  } catch (error) {
    console.error(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

const getAllOrder = async (req, res, next) => {
  const userId = req.userId;
  try {
    const orders = await Order.find({ userId })
      .populate({
        path: "products.productId",
        model: "product",
        select: "name category description imageUrl price", // Choose fields you want to select
      })
      .sort({ orderDate: -1 });
    res.json(orders);
    // console.log;
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};
const addNewOrder = async (req, res, next) => {
  const userId = req.userId;
  const { products, totalPrice, delivery_address } = req.body;
  console.log(products);
  // Validate the products array
  if (!Array.isArray(products) || products.length === 0) {
    return next(createHttpError(400, "Invalid products array"));
  }

  const isValidOrder = products.every((product) =>
    mongoose.Types.ObjectId.isValid(product.productId)
  );

  if (!isValidOrder) {
    return next(
      createHttpError(400, "Invalid productId in the products array")
    );
  }
  // Validate each product in the array
  for (const product of products) {
    if (!product.productId || !product.quantity) {
      return next(
        createHttpError(400, "Each product must have productId and quantity")
      );
    }
  }

  try {
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      delivery_address,
    });
    console.log(newOrder);
    const savedOrder = await newOrder.save();
    console.log(savedOrder);

    res.json(savedOrder);
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

module.exports = {
  becomeMerchant,
  getProducts,
  getProductsByCategory,
  updateCart,
  viewCart,
  cartCount,
  search,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  getAllOrder,
  addNewOrder,
};
// TODO:
// Add to wishList
// Remove from wishlist
// Product rating
// Product Reviews
