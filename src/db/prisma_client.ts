import { PrismaClient } from "@prisma/client";
import { exit } from "process";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
async function testDbConnection() {
  try {
    await prisma.$connect();
  } catch (error: any) {
    if (error.errorCode == "P1001") {
      console.log("Database is not running");
      exit(1);
    }
  }
}
testDbConnection();
export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
