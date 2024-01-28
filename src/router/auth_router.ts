import { Router } from "express";
import { loginUser, signUp } from "../controllers/auth_controllers";
import { validateResource } from "../middlewares/validation_middleware";
import { userLoginSchema, userCreateSchema } from "../schema/user_schema";

const router = Router();

router.post(
  "/sign-up",
  validateResource({ bodySchema: userCreateSchema }),
  signUp
);
router.post(
  "/login",
  validateResource({ bodySchema: userLoginSchema }),
  loginUser
);

export default router;
