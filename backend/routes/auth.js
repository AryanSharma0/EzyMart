const express = require("express");
const { login, resetPassword, signUp } = require("../controller/auth");
const authorize = require("../middleware/authorize");
const router = express.Router();

router.post("/login", authorize, login);
router.post("/signup", authorize, signUp);
router.post("/resetPassword", authorize, resetPassword);

module.exports = router;
