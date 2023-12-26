import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/baseException";
import { Prisma } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export function errorMiddleWare(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.statusCode).json({
    message: error.message,
    code: error.code,
  });

  next();
}
