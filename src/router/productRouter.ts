import { Router } from "express";
import bodyParser from "body-parser";
import {
  createProduct,
  deleteProduct,
  readProducts,
  readSingleProduct,
  toggleFavorite,
  updateProduct,
} from "../controllers/productController";
import { validateResource } from "../middlewares/validator";
import { productSchema } from "../schema/productSchema";
import { parmSchema } from "../schema/parmSchema";

const router = Router();

router.use(bodyParser.json());

//reading Product(s)
router.get(
  "/:id",
  validateResource({ parmSchema: parmSchema }),
  readSingleProduct
);
router.get("/", readProducts);

//creating a new product
router.post(
  "/",
  validateResource({ bodySchema: productSchema }),
  createProduct
);

//deleting product
router.delete("/:id", validateResource({ parmSchema }), deleteProduct);

//update product
router.put(
  "/:id",
  validateResource({ parmSchema: parmSchema, bodySchema: productSchema }),
  updateProduct
);

router.put(
  "/toggle-favorite/:id",
  validateResource({ parmSchema }),
  toggleFavorite
);

export default router;
