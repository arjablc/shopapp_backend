import NotFound from "../exceptions/not_fount_exception";
import { defaultConfig } from "../config/config";
import {
  createUserService,
  findUserByEmail,
  giveJwtTokens,
} from "../services/auth_service";
import { Request, Response, NextFunction, CookieOptions } from "express";
import { compare } from "../utils/hash_util";

import { HttpException } from "../exceptions/base_exception";
import { catchAsyncErrors } from "../utils/async_error_util";

export const signUp = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const userId = await createUserService({
      email: email,
      password: password,
      name: name,
    });
    res.status(201).json(userId);
  }
);

export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return next(new NotFound());
    }

    const passwordMatch = await compare(password, user.password);
    if (passwordMatch) {
      const { accessToken, refreshToken } = await giveJwtTokens(user!.id);

      res.cookie("accessToken", accessToken, defaultConfig.accessCookieOptions);
      res.cookie(
        "refreshToken",
        refreshToken,
        defaultConfig.refreshCookieOptions
      );
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
  }
);
