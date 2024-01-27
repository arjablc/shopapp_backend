import { InternalError } from "../errors/internal_exception";
import NotFound from "../errors/not_fount_exception";
import { UniqueError } from "../errors/unique_exception";
import {
  createUserService,
  findUserByEmail,
  giveJwtTokens,
} from "../services/auth_service";
import { Request, Response, NextFunction, CookieOptions } from "express";
import { compare } from "../utils/hash_util";

import { HttpException } from "../errors/base_exception";

const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 60 * 2 * 1000,
};
const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 60 * 4 * 1000,
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const userId = await createUserService({
      email: email,
      password: password,
      name: name,
    });
    res.status(201).json(userId);
  } catch (error: any) {
    if (error.code === "P2002") {
      next(new UniqueError(error));
    } else {
      console.log(error);
      next(new InternalError());
    }
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      next(new NotFound());
    }

    const passwordMatch = await compare(password, user!.password);
    if (passwordMatch) {
      const { accessToken, refreshToken } = giveJwtTokens(user!.id);
      console.log(accessToken, refreshToken);
      res.cookie("accessToken", accessToken, accessCookieOptions);
      res.cookie("refreshToken", refreshToken, refreshCookieOptions);
      res.cookie("logged-in", true, {
        httpOnly: false,
      });
      res.status(200).json({
        message: "login succesful",
      });
    } else {
      next(
        new HttpException({
          message: "Either password or Email doesn't match",
          statusCode: 401,
        })
      );
    }
  } catch (error) {
    console.log(error);
    next(new InternalError());
  }
};
