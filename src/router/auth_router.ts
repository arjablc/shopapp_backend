import { Router } from 'express';
import {
  loginUser,
  signUp,
  forgotPassword,
  resetPassword,
  logoutUser,
} from '../controllers/auth_controllers';
import { validateResource } from '../middlewares/validation_middleware';
import {
  userLoginSchema,
  userCreateSchema,
  resetPasswordSceham,
} from '../schema/user_schema';
import { ZodObject, z } from 'zod';
import { deserialize } from 'v8';
import { deserializeUser } from '../middlewares/deserialize_user_middleware';
import { requireUser } from '../middlewares/require_user_middleware';

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

router.get('/logout', deserializeUser, requireUser, logoutUser);

export default router;
