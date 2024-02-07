import { Router } from "express";
import {
  loginUser,
  signUp,
  forgotPassword,
} from "../controllers/auth_controllers";
import { validateResource } from "../middlewares/validation_middleware";
import { userLoginSchema, userCreateSchema } from "../schema/user_schema";
import { z } from "zod";

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
router.post(
  "/forgot-password",
  validateResource({
    bodySchema: z.object({
      email: z.string({ required_error: "email must be provided" }),
    }),
  }),
  forgotPassword
);

export default router;
