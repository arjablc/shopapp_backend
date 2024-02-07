import NotFound from "../exceptions/not_fount_exception";
import { defaultConfig } from "../config/config";
import {
  createUserService,
  findUniqueUser,
  giveJwtTokens,
} from "../services/auth_service";
import { createHash, randomBytes } from "crypto";

import { Request, Response, NextFunction, CookieOptions } from "express";
import { compare } from "../utils/hash_util";
import { HttpException } from "../exceptions/base_exception";
import { catchAsyncErrors } from "../utils/async_error_util";
import { LoginFailed } from "../exceptions/login_exception";

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

    const user = await findUniqueUser({ email: email });
    if (!user) {
      return next(new LoginFailed());
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

      res.status(200).json({
        message: "login succesful",
      });
    } else {
      next(new LoginFailed());
    }
  }
);

export const forgotPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // get the user with email
    const user = findUniqueUser({ email: req.body.email });
    if (!user) {
      next(new NotFound());
    }
    // create a pw reset token for the user
    const resetToken = randomBytes(32).toString("hex");

    //hash the pw reset token and put in db
    const passwordResetToken = createHash("sha256")
      .update(resetToken)
      .digest("hex");

    //send mail with the original reset token
  }
);
