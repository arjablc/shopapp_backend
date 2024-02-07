import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { UniqueUserError } from "../exceptions/unique_exception";
import NotFound from "../exceptions/not_fount_exception";
import { InternalError } from "../exceptions/internal_exception";
export const catchAsyncErrors = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(error);
      //sorting the error into different types of error
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            return next(new UniqueUserError(error));
          case "2025":
            return next(new NotFound());
          default:
            console.log("some prismaclientknown erorors were not handled");
            return next(new UniqueUserError(error));
        }
      }
      if (error instanceof PrismaClientUnknownRequestError) {
        return next(new InternalError());
      }
      return next(new InternalError());
    });
  };
};
