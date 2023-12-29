import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/baseException";

export function errorMiddleWare(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error.message);
  res.status(error.statusCode).json({
    message: error.message,
  });

  next();
}
