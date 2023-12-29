import { Request, Response, NextFunction } from "express";
import validator from "validator";
import BadRequest from "../exceptions/badRequest";
import { readProductService } from "../services/productServices";
import NotFound from "../exceptions/notFound";

export const productValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Porduct validator hitttt");
  const { name, description, price, imageUrl } = req.body;
  if (!name || !description || !price) {
    console.log("error at empty check ");
    next(new BadRequest("All Proudct fields not provided"));
  }
  if (imageUrl && !validator.isURL(imageUrl)) {
    next(new BadRequest("Image Url is not valid"));
  }
  if (!validator.isDecimal(price)) {
    next(new BadRequest("Price must be some number"));
  }
  next();
};

export const parmValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("parm validator hit");
  if (!req.params.id) {
    next(new BadRequest("Product id is required in the path"));
  }
  try {
    await readProductService(req.params.id);
  } catch (error) {
    next(new NotFound());
  }

  next();
};
