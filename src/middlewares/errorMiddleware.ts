import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/baseException";
import { Prisma } from "@prisma/client";

export function errorMiddleWare(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.error === Prisma.PrismaClientInitializationError) {
    console.log("Same error");
  }

  // if (error.error === Prisma.PrismaClientInitializationError) {
  //   res.status(500).json({
  //     error: "Database connection Error",
  //   });
  // }
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.code,
  });
  next();
}
