const express = require("express");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Product = require("../models/Product");
const { IRequest } = require("../middleware/authenticateMerchant");
const createHttpError = require("http-errors");
const uploadImage = require("../utils/uploadImage");
const { v4: uuidv4 } = require("uuid");
const Cart = require("../models/Cart");

// Add Product
const addProduct = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  console.log(res);
  const { name, category, description, price, base64Image } = req.body;
  console.log(req.body);
  // const base64Image = Buffer.from(req.file.buffer).toString("base64");
  const imageId = "uuidv4().split(" - ")[0].substring(0,10)";

  const imageUrl = await uploadImage(base64Image, imageId);
  // const imageUrl =
  // "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg";
  if (typeof imageUrl != "string") {
    return next(createHttpError(500, "Unknown error occurred"));
  }
  if (userId) {
    const product = new Product({
      name,
      category,
      description,
      price,
      imageUrl,
      userId,
    });
    const result = await product.save();
    return res.json(result);
  }
  next(createHttpError(401, "Request not allowed"));
});

// Delete product
const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  const { productId } = req.params;
  if (userId) {
    const product = Product.findOneAndDelete({
      _id: productId,
      userId: userId,
    });
    await Cart.findOneAndDelete({
      productId: productId,
    });
    const deletedProduct = await product.exec();
    if (deletedProduct) {
      res.json({ status: "success", message: "Product deleted" });
    } else {
      next(createHttpError(404, "Product not found"));
    }
  }
});

// Get Merchant Products
const getProducts = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  // const { pageNumber, limit } = req.params;
  const query = Product.find({ userId }).sort({ createdAt: -1 });
  // .skip((Number(pageNumber) - 1) * Number(limit))
  // .limit(Number(limit));
  const products = await query.exec();
  res.json(products);
});

// TODO: Update Product

module.exports = {
  addProduct,
  deleteProduct,
  getProducts,
};
