import { ErrorRequestHandler } from "express";
import { handleMongoDuplicateError } from "./handleMongoError";
import AppError from "./errorHelper";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;

  // Mongo duplicate key error
  if (err?.code === 11000) {
    error = handleMongoDuplicateError(err);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
