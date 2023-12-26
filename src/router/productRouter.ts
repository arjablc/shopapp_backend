import { Prisma } from "@prisma/client";
import controller from "../controllers/productController";
import { Router } from "express";
import { Request, Response } from "express";
import { HttpException } from "../exceptions/baseException";
const router = Router();

function forceJson(req: Request, res: Response, next: Function) {
  res.setHeader("content-tyepe", "application/json");
  next();
}

router.get("/", async (req, res, next) => {
  try {
    const products = await controller.readProduct();
    console.log(products);
    res.status(200).send(products);
  } catch (error) {
    next(
      new HttpException({
        error: error,
        code: 10001,
        statusCode: 500,
        message: "Couldnot connect to the db Server",
      })
    );
  }
});

router.get("/helloworld", (req, res, next) => {
  res.status(200).send("Helllo world");
});

export default router;
