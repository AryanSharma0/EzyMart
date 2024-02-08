const createHttpError = require("http-errors");

const asyncErrorHandler = (func) => {
  return (req, res, next) =>
    func(req, res, next).catch((error) => {
      let statusCode = 400;
      let message = error instanceof Error ? error.message : "Server Error";
      console.log(error);
      next(createHttpError(statusCode, message));
    });
};

module.exports = asyncErrorHandler;
