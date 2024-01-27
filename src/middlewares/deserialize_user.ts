import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt_util";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }
  if (accessToken) {
    const { result, expired } = verifyJwt(
      accessToken,
      process.env.ACCESS_TOKEN!
    );

    if (!expired) {
      //@ts-ignore
      res.user = result.id;
    }
  }
};
