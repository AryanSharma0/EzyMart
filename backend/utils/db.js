const mongoose = require("mongoose");

require("dotenv").config();
const mongoURI = `mongodb+srv://${process.env.REACT_APP_MONGODB_USERID}:${process.env.REACT_APP_MONGODB_PASSWORD}@cluster0.fdkmm.mongodb.net/${process.env.REACT_APP_MONGODB_NAME}?retryWrites=true&w=majority`;
const connectDB = () => {
  try {
    mongoose.connect(mongoURI).then(() => console.log("Login"));
  } catch (err) {
    console.log("Error at db connection : ", err);
  }
};
module.exports = connectDB;
