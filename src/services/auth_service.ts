import { SignOptions } from "jsonwebtoken";
import prisma from "../db/prisma_client";
import { hash } from "../utils/hash_util";
import { signJwt } from "../utils/jwt_util";

export const createUserService = async ({
  name,
  password,
  email,
}: {
  name: string;
  password: string;
  email: string;
}) => {
  const hashedPassword = await hash(password);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });
  return newUser.id;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email: email } });
  return user;
};
const accessTokenOptions: SignOptions = {
  expiresIn: 60 * 2,
};
const refreshTokenOptions: SignOptions = {
  expiresIn: 60 * 4,
};
const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN;
export const giveJwtTokens = (userId: string) => {
  const accessToken = signJwt(
    { id: userId },
    accessSecret!,
    accessTokenOptions
  );
  const refreshToken = signJwt(
    { id: userId },
    refreshSecret!,
    refreshTokenOptions
  );
  return { accessToken, refreshToken };
};
