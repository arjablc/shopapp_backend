import NotFound from '../exceptions/not_fount_exception';
import { defaultConfig } from '../config/config';
import {
  createUserService,
  findUniqueUser,
  findUserByPasswrodReset,
  giveJwtTokens,
  updatePasswordResetData,
  updateUser,
} from '../services/auth_service';
import { createHash, randomBytes } from 'crypto';

import { Request, Response, NextFunction, CookieOptions } from 'express';
import { compare } from '../utils/hash_util';
import { catchAsyncErrors } from '../utils/async_error_util';
import { LoginFailed } from '../exceptions/login_exception';
import { sendMail } from '../utils/email';
import { HttpException } from '../exceptions/base_exception';

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

      res.cookie('accessToken', accessToken, defaultConfig.accessCookieOptions);
      res.cookie(
        'refreshToken',
        refreshToken,
        defaultConfig.refreshCookieOptions
      );

      res.status(200).json({
        message: 'login succesful',
      });
    } else {
      return next(new LoginFailed());
    }
  }
);

export const forgotPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    // get the user with email
    const user = await findUniqueUser({ email: req.body.email });
    if (!user) {
      next(new NotFound());
    }
    // create a pw reset token for the user
    const resetToken = randomBytes(32).toString('hex');

    //hash the pw reset token and put in db
    const passwordResetToken = createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await updatePasswordResetData(user!.id, {
      passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
      passwordResetToken,
    });

    //send mail with the original reset token
    const message =
      'Forgot your password for our Ecommerce application ?? Please click in the link provided in this email below, or copy and paste it in your browser';
    const resetLink = `${req.protocol}://${req.get(
      'host'
    )}/auth/reset-password/${resetToken}`;
    await sendMail({
      to: user?.email,
      subject: 'Reset password at Jonas Ecom',
      text: `${message} \n ${resetLink}`,
    });
    res.status(200).json({
      status: 'success',
      message:
        'if an account exists wtih this email you will get a reset url in your email.',
    });
  }
);

export const resetPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const hashToken = createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    //check if there is a user
    const user = await findUserByPasswrodReset(hashToken);
    if (!user) {
      return res.status(403).json({
        status: 'failed',
        message: 'Invalid token or the token has expired',
      });
    }
    //reset to the enw password
    await updateUser(user.id, { password: req.body.password });
    res.status(200).json({
      status: 'success',
      message: 'password was changed successfully',
    });
  }
);
