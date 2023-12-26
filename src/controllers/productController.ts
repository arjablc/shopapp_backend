import {
  createProductService,
  readProductService,
} from "../services/productServices";
import { Request, Response, NextFunction } from "express";
import { Product } from "../types";
import prisma from "../prisma_client/prismaClient";
import { ResourceNotFound } from "../exceptions/rescourceNotFound";

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
    next(new ResourceNotFound());
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
    next(new ResourceNotFound());
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
};
