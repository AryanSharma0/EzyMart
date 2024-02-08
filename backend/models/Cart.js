const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User id is required"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: [true, "Product id is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
    max: [10, "Quantity cannot exceed 10"],
  },
});

const Cart = model("cart", cartSchema);

module.exports = Cart;
