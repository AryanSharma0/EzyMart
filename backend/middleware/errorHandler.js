const { isHttpError } = require("http-errors");

const errorHandler = (err, req, res, next) => {
  console.log("errorHandler");
  let statusCode = 500;
  let errorMessage = "Server Error";
  if (isHttpError(err)) {
    statusCode = err.status;
    errorMessage = err.message;
  }
  res.status(statusCode).json({ status: "failed", message: errorMessage });
};

module.exports = errorHandler;
