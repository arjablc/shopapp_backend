import {
  createProductService,
  deleteProductService,
  readProductService,
  updateProductService,
} from "../services/productServices";
import { Request, Response, NextFunction } from "express";
import NotFound from "../errors/notFound";
import { Product } from "../schema/product";
import { InternalError } from "../errors/InternalError";

export const readSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prodId = req.params.id;
  try {
    const product = await readProductService(prodId);
    res.status(200).json(product);
  } catch (error) {
    next(new NotFound());
  }
};
export const readProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await readProductService();
    res.status(200).json(products);
  } catch (error) {
    next(new NotFound());
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("the create Product controller hit");
  const product: Product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  };

  try {
    const id = await createProductService(product);
    res.status(201).json({
      id: id.id,
    });
  } catch (error) {
    next(new InternalError());
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    await deleteProductService(id);
    res.status(200).json({
      message: "Removed successfuly",
    });
  } catch (error) {
    next(new InternalError());
  }
};
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const incomingProduct: Product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  };
  try {
    await updateProductService(req.params.id, incomingProduct);
    res.status(200).json({
      message: "resource updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    next(new InternalError());
  }
};

export const toggleFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(new InternalError());
  }
};
