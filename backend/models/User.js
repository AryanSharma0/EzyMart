const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "is required field"] },
    email: {
      type: String,
      required: [true, "is required field"],
      unique: true,
      lowercase: true,
    },
    merchant: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "is required field"],
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
