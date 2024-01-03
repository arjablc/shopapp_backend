import prisma from "../db/prismaClient";

export const createUserService = async ({
  name,
  password,
  email,
}: {
  name: string;
  password: string;
  email: string;
}) => {
  const newUserId = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: password,
    },
  });
  return newUserId;
};
