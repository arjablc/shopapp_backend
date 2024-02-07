import {
  createProductService,
  deleteProductService,
  readProductService,
  updateProductService,
} from "../services/product_service";
import { Request, Response, NextFunction } from "express";
import { ProductDto } from "../schema/product_schema";
import { catchAsyncErrors } from "../utils/async_error_util";
import { number } from "zod";
import { Product } from "@prisma/client";
import { initial, isArray } from "lodash";
import { UnauthorizedError } from "../exceptions/unauthorized_exception";

export const readSingleProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const prodId = req.params.id;

    const product = await readProductService(prodId);
    res.status(200).json(product);
  }
);

export const readProducts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    const products = await readProductService();

    res.status(200).json(products);
  }
);

export const createProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const product: ProductDto = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };
    // get the id form the logged in user and then give it to the create product service
    const createdProduct = await createProductService(
      product,
      res.locals.user.id
    );
    res.status(201).json({
      id: createdProduct.id,
    });
  }
);

export const deleteProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await deleteProductService(id);
    res.status(200).json({
      message: "Removed successfuly",
    });
  }
);

export const updateProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const initialProduct = await readProductService(req.params.id);
    if (isArray(initialProduct)) {
      return;
    }
    if (res.locals.user.id !== initialProduct.authorId) {
      return next(new UnauthorizedError());
    }
    const incomingProduct: ProductDto = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };

    await updateProductService(req.params.id, incomingProduct);
    res.status(200).json({
      message: "resource updated Succesfully",
    });
  }
);
