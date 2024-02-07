import { prisma } from "../db/prisma_client";
import { hash } from "../utils/hash_util";
import { signJwt } from "../utils/jwt_util";
import { redisClient } from "../db/redis_client";
import { defaultConfig } from "../config/config";
import { Prisma } from "@prisma/client";
import { UserDto } from "../schema/user_schema";

export const createUserService = async (input: UserDto) => {
  const hashedPassword = await hash(input.password);
  input.password = hashedPassword;
  const newUser = await prisma.user.create({
    data: input,
  });
  return newUser.id;
};

interface userWhere {
  id?: string;
  email?: string;
}
export const findUniqueUser = async (where: userWhere) => {
  const user = await prisma.user.findUnique({
    where: {
      id: where.id,
      email: where.email,
    },
  });
  return user;
};
export const updateUser = async (id: string, user: Partial<UserDto>) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
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
function async(arg0: { placeholder: import("lodash").LoDashStatic }) {
  throw new Error("Function not implemented.");
}
