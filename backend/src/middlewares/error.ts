import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerTypes } from "../types/types.js";

export const errorHandlerMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.message = err.message || "";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch =
  (func: ControllerTypes) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };

type AsyncHandler<T = any> = (
  req: Request<T>,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const TryCatchId = <T = any>(controller: AsyncHandler<T>) => {
  return (req: Request<T>, res: Response, next: NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};
