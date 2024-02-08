const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { v2: cloudinary } = require("cloudinary");

// Db Connection
const connectDB = require("./utils/db");

// Routes
const auth = require("./routes/auth");
const merchant = require("./routes/merchant");
const client = require("./routes/client");
const { errorHandler } = require("./middleware/errorHandler");
const { authorize } = require("./middleware/authorize");
const { authenticate } = require("./middleware/authenticate");
// const { authenticateMerchant } = require("./middleware/authenticateMerchant");

const app = express();

// PORT
const PORT = 5000;

// middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Error handler
// app.use(errorHandler);
// Routes
app.use("/api/auth", auth);
app.use("/api/merchant", merchant);
app.use("/api/client", client);

// Server listening on port 5000
connectDB();

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
