import { prisma } from "../db/prisma_client";
import { hash } from "../utils/hash_util";
import { signJwt } from "../utils/jwt_util";
import { redisClient } from "../db/redis_client";
import { defaultConfig } from "../config/config";
import { catchAsyncErrors } from "../utils/async_error_util";

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
  const user = await prisma.user.findFirst({ where: { email } });
  return user;
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const giveJwtTokens = async (userId: string) => {
  //ideally redis should have a separate service but nvm
  await redisClient.set(userId, "true", defaultConfig.redisSetOption);
  const accessToken = signJwt(
    { id: userId },
    defaultConfig.accessSecret,
    defaultConfig.accessJwtSignOptions
  );
  const refreshToken = signJwt(
    { id: userId },
    defaultConfig.refreshSecret,
    defaultConfig.refreshJwtSignOptions
  );
  return { accessToken, refreshToken };
};
