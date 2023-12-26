import { Router } from "express";
import bodyParser from "body-parser";
import {
  createProduct,
  readProducts,
  readSingleProduct,
} from "../controllers/productController";
const router = Router();

router.use(bodyParser.json());

//reading Product(s)
router.get("/:id", readSingleProduct);
router.get("/", readProducts);

//TODO: Chnage to proper http methods
router.post("/", createProduct);
export default router;
