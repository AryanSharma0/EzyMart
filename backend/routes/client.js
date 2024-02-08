const express = require("express");
const {
  becomeMerchant,
  cartCount,
  getProducts,
  getProductsByCategory,
  search,
  updateCart,
  viewCart,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  getAllOrder,
  addNewOrder,
} = require("../controller/client");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/getProducts", authenticate, getProducts);
router.get("/getProductsByCategory", authenticate, getProductsByCategory);
router.get("/viewCart", authenticate, viewCart);
router.get("/search/:searchTerm", search);
router.get("/cartCount", authenticate, cartCount);
router.post("/becomeMerchant", authenticate, becomeMerchant);
router.post("/updateCart", authenticate, updateCart);
router.put("/decreaseProduct/:cartItemId", authenticate, decreaseQuantity);
router.put("/increaseProduct/:cartItemId", authenticate, increaseQuantity);
router.delete("/removeProduct/:cartItemId", authenticate, removeProduct);
router.get("/getAllOrder", authenticate, getAllOrder);
router.post("/addNewOrder", authenticate, addNewOrder);
module.exports = router;
