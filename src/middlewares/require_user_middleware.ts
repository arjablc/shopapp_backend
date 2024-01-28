import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/base_exception";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return next(new HttpException({ message: "forbidden", statusCode: 403 }));
  }

  next();
};
