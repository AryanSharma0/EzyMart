const express = require("express");
const dotenv = require("dotenv");
const createHttpError = require("http-errors");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Merchant = require("../models/Merchant");
const { Schema } = require("mongoose");

dotenv.config();

const authenticateMerchant = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;

  // Check in DB
  const merchant = await Merchant.findOne({ userId });

  if (merchant) {
    return next();
  }
  next(createHttpError(401, "Only merchants are allowed"));
});

module.exports = authenticateMerchant;
