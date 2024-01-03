import { Router } from "express";
import { createUser } from "../controllers/authController";
import { validateResource } from "../middlewares/validator";
import { userSchema } from "../schema/userSchema";

const router = Router();

router.post(
  "/sign-up",
  validateResource({ bodySchema: userSchema }),
  createUser
);

export default router;
