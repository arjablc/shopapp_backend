import {
  createProductService,
  deleteProductService,
  readProductService,
  updateProductService,
} from "../services/product_service";
import { Request, Response, NextFunction } from "express";
import { Product } from "../schema/product_schema";
import { catchAsyncErrors } from "../utils/async_error_util";

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
    const product: Product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };

    const id = await createProductService(product, "author");
    res.status(201).json({
      id: id.id,
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
    const incomingProduct: Product = {
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

export const toggleFavorite = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentProduct = await readProductService(req.params.id);
    if (Array.isArray(currentProduct)) {
      return;
    } else {
      currentProduct.isFavorite = !currentProduct.isFavorite;

      await updateProductService(req.params.id, currentProduct);
      res.status(204).json({
        message: "Product is now favorite",
      });
    }
  }
);
