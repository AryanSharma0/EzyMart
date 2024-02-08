const { NextFunction, Request, Response } = require("express");
const User = require("../models/User");
const { encPassword, verifyPassword } = require("../utils/password");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const Merchant = require("../models/Merchant");

dotenv.config();
// Signup
const signUp = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await encPassword(password);
  const user = new User({ name, email, password: hashedPassword });
  const result = await user.save();
  const resultObject = result.toObject();
  delete resultObject.password;
  const token = jwt.sign(resultObject, process.env.JWT_SECRET_KEY);
  res.cookie("cookieName", "1234", { maxAge: 900000, httpOnly: true });
  res.json(resultObject);
});

// Login
const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (user) {
    const hashedPassword = user.password;
    const isMatch = await verifyPassword(password, hashedPassword);
    if (isMatch) {
      const result = user.toObject();
      // const checkMerchant = await Merchant.findOne({
      //     userId: result._id,
      // });
      // const licenseId = checkMerchant?.licenseId || 0;

      delete result.password;
      const token = jwt.sign(result, process.env.JWT_SECRET_KEY);
      res.cookie("ezToken", token);
      res.json({ status: "Success", /* licenseId, */ ...result, token });
    } else {
      next(createHttpError(404, "User not found"));
    }
  } else {
    next(createHttpError(404, "User not found"));
  }
});
// Reset password
const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = await encPassword(password);

  const user = await User.findOneAndUpdate(
    {
      email: email.toLowerCase(),
    },
    { password: hashedPassword },
    {
      new: true,
    }
  );
  if (user) {
    res.json({ status: "Success", message: "Password changed" });
  } else {
    next(createHttpError(404, "User not found"));
  }
});

module.exports = { signUp, login, resetPassword };
