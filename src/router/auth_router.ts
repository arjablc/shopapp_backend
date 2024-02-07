import { Router } from 'express';
import {
  loginUser,
  signUp,
  forgotPassword,
  resetPassword,
} from '../controllers/auth_controllers';
import { validateResource } from '../middlewares/validation_middleware';
import {
  userLoginSchema,
  userCreateSchema,
  resetPasswordSceham,
} from '../schema/user_schema';
import { ZodObject, z } from 'zod';

const router = Router();

router.post(
  '/sign-up',
  validateResource({ bodySchema: userCreateSchema }),
  signUp
);
router.post(
  '/login',
  validateResource({ bodySchema: userLoginSchema }),
  loginUser
);
router.post(
  '/forgot-password',
  validateResource({
    bodySchema: z.object({
      email: z.string({ required_error: 'email must be provided' }),
    }),
  }),
  forgotPassword
);
//TODO: Implement a serverside page to enter new password
// router.get("/reset-password/:id");

router.put(
  '/reset-password/:token',
  validateResource({
    bodySchema: resetPasswordSceham,
  }),
  resetPassword
);

export default router;
