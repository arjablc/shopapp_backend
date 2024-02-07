import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt_util';
import { verify } from 'crypto';
import { HttpException } from '../exceptions/base_exception';
import { redisClient } from '../db/redis_client';
import { findUniqueUser, giveJwtTokens } from '../services/auth_service';
import { catchAsyncErrors } from '../utils/async_error_util';
import { defaultConfig } from '../config/config';

function handleAccessToken(
  res: Response,
  accessToken: string,
  next: NextFunction
) {
  const { result: accessResult, expired: accessExpired } = verifyJwt<{
    id: string;
  }>(accessToken, defaultConfig.accessSecret);
  // not expired accessToken = check for the session ?? or just give the data ?? TBD
  if (!accessExpired) {
    res.locals.user = accessResult;
    return next();
  }
}
async function handleRefreshToken(
  res: Response,
  refreshToken: string,
  next: NextFunction
) {
  //expired accessToken = check refreshtoken
  const { result: refreshResult, expired: refreshExpired } = verifyJwt<{
    id: string;
  }>(refreshToken, defaultConfig.refreshSecret);

  //expired refresh token = 403
  if (refreshExpired || !refreshResult) {
    return next(
      new HttpException({
        message: 'Not Authorized -> ref verify error',
        statusCode: 403,
      })
    );
  }
  // not expired refresh token = check redis for session
  const session = await redisClient.get(refreshResult.id);

  if (!session) {
    return next(
      new HttpException({
        message: 'Not Authorized -> checking redis ',
        statusCode: 403,
      })
    );
  }

  // check if user exists
  const user = await findUniqueUser({ id: refreshResult.id });

  if (!user) {
    return next(
      new HttpException({
        message: 'No such user -> found while checking user',
        statusCode: 403,
      })
    );
  }

  //create a new accessToken
  const { accessToken: newAccessToken } = await giveJwtTokens(user.id);
  res.cookie('accessToken', newAccessToken, defaultConfig.accessCookieOptions);

  // give data
  res.locals.user = user;
  next();
}

export const deserializeUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    //check for the accesstoken
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken) {
      return next();
    }
    if (!accessToken && refreshToken) {
      return handleRefreshToken(res, refreshToken, next);
    }

    handleAccessToken(res, accessToken, next);
  }
);
