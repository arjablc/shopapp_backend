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
import { parmValidator, productValidator } from "../utils/validator";

const router = Router();

router.use(bodyParser.json());

//reading Product(s)
router.get("/:id", parmValidator, readSingleProduct);
router.get("/", readProducts);

//creating a new product
router.post("/", productValidator, createProduct);

//deleting product
router.delete("/:id", parmValidator, deleteProduct);

//update product
router.put("/:id", parmValidator, updateProduct);

router.put("/toggle-favorite/:id", parmValidator, toggleFavorite);

export default router;
