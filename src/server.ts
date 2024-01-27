import express from "express";
import productRouter from "./router/productRouter";
import { errorMiddleWare } from "./middlewares/errorMiddleware";
import prisma from "./db/prisma_client";
import authRouter from "./router/authRouters";
import { exit } from "process";

const app = express();
const port = process.env.PORT;
console.clear();
testDbConnection();
app.use(express.json());
app.use("/products", productRouter);
app.use("/auth", authRouter);
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

app.use(errorMiddleWare);
app.listen(port, () => {
  console.log("Server started at http://localhost:" + port);
});
