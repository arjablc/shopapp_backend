import { Router } from "express";
import bodyParser from "body-parser";
import {
  createProduct,
  deleteProduct,
  readProducts,
  readSingleProduct,
  updateProduct,
} from "../controllers/product_controllers";
import { validateResource } from "../middlewares/validation_middleware";
import { productSchema } from "../schema/product_schema";
import { parmSchema } from "../schema/parm_schema";

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
  validateResource({
    parmSchema: parmSchema,
    bodySchema: productSchema.partial(),
  }),
  updateProduct
);

export default router;
