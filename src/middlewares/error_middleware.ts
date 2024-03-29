import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/base_exception";

export function errorMiddleWare(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.statusCode).json({
    error: error.message,
    details: error.error,
  });
  next();
}
