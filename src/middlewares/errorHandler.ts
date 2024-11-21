import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.js';

// handles production error
const productionError = (err: AppError, res: Response) => {
  // operational error: send message to client about the error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    // Sends a generic message to the client about the error
    res.status(500).json({
      statusCode: err.statusCode,
      message: "Something went wrong",
    });
  }
};

// Handles development errors
// sends back the error message, and additional information about the error
const developmentError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
  });
};

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    console.log("\n\n------ begin: ------");
    console.log("ERROR: ", err);
    console.log("------ end: ------\n\n");

    productionError(err, res);
  }
}
