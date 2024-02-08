const { Schema, model } = require("mongoose");

const productCategories = [
  "Clothes",
  "Consumables",
  "Jewellery",
  "Home appliance",
  "electronics",
];

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
      maxlength: 100,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: productCategories,
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
      maxlength: 1000,
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
      min: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

const Product = model("product", productSchema);

module.exports = Product;
