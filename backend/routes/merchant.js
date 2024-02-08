const express = require("express");
const {
  addProduct,
  deleteProduct,
  getProducts,
} = require("../controller/merchant");
const authenticate = require("../middleware/authenticate");
const authenticateMerchant = require("../middleware/authenticateMerchant");
const router = express.Router();

router.get("/getProducts", authenticate, authenticateMerchant, getProducts);
router.post("/addProduct", authenticate, authenticateMerchant, addProduct);
router.delete(
  "/deleteProduct/:productId",
  authenticate,
  authenticateMerchant,
  deleteProduct
);

module.exports = router;
