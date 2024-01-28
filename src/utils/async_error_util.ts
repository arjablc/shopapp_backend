import { Prisma } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { UniqueError } from "../exceptions/unique_exception";
import { ValidationFailed } from "../exceptions/validation_failed_exception";
import NotFound from "../exceptions/not_fount_exception";
import { InternalError } from "../exceptions/internal_exception";
import { ZodError } from "zod";
import { ErrorReply } from "redis";
export const catchAsyncErrors = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      //sorting the error into different types of error
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            return next(new UniqueError(error));
          case "2025":
            return next(new NotFound());
          default:
            console.log("some prismaclientknown erorors were not handled");
            return next(new UniqueError(error));
        }
      }
      if (error instanceof PrismaClientUnknownRequestError) {
        return next(new InternalError());
      }
      return next(new InternalError());
    });
  };
};
