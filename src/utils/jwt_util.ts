import * as JWT from "jsonwebtoken";

export const signJwt = (
  payload: Object,
  secret: string,
  options?: JWT.SignOptions
) => {
  const token = JWT.sign(payload, secret, {
    ...options,
  });
  return token;
};

export const verifyJwt = (
  token: string,
  secret: string,
  option?: JWT.VerifyOptions
) => {
  try {
    const result = JWT.verify(token, secret, option);
    return { result, expired: false };
  } catch (error: any) {
    console.log(error);
    return { result: null, expired: error.message.includes("expired") };
  }
};
