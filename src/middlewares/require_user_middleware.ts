import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/base_exception";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (req.path === "/products/") {
    return next();
  }
  if (!user) {
    return next(
      new HttpException({ message: "You are not logged In", statusCode: 401 })
    );
  }
  next();
};
