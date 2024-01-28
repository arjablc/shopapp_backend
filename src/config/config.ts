import { CookieOptions } from "express";
import { SignOptions, VerifyOptions } from "jsonwebtoken";
const isProdEnv = process.env.NODE_ENVIRONMENT === "production";
const accessTokenLife = 15;
const refreshTokenLife = 43800;
const accessSecret = process.env.ACCESS_SECRET!;
const refreshSecret = process.env.REFRESH_SECRET!;
type Config = {
  accessCookieOptions: CookieOptions;
  refreshCookieOptions: CookieOptions;
  refreshJwtSignOptions: SignOptions;
  accessJwtSignOptions: SignOptions;
  accessSecret: string;
  refreshSecret: string;
};
const accessCookieOptions: CookieOptions = isProdEnv
  ? {
      httpOnly: true,
      maxAge: accessTokenLife * 60 * 1000,
    }
  : {
      httpOnly: true,
      maxAge: 60 * 2 * 1000,
    };
const refreshCookieOptions: CookieOptions = isProdEnv
  ? {
      httpOnly: true,
      secure: true,
      maxAge: refreshTokenLife * 60 * 1000,
    }
  : {
      httpOnly: true,
      maxAge: 60 * 15 * 1000,
    };
const refreshJwtSignOptions: SignOptions = isProdEnv
  ? {
      expiresIn: `${refreshTokenLife}m`,
    }
  : {
      expiresIn: "15m",
    };
const accessJwtSignOptions: SignOptions = isProdEnv
  ? {
      expiresIn: `${accessTokenLife}m`,
    }
  : {
      expiresIn: "2m",
    };
export const defaultConfig: Config = {
  accessCookieOptions,
  refreshCookieOptions,
  accessJwtSignOptions,
  refreshJwtSignOptions,
  accessSecret,
  refreshSecret,
};
