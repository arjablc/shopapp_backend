import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

import { ValidationFailed } from "../exceptions/validation_failed_exception";

export const validateResource = ({
  bodySchema,
  parmSchema,
}: {
  bodySchema?: AnyZodObject;
  parmSchema?: AnyZodObject;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (parmSchema) {
        parmSchema.parse(req.params);
      }
      if (bodySchema) {
        bodySchema.parse(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const err: any = error.issues.map((e: any) => ({
          path: e.path[0],
          message: e.message,
        }));
        console.log(err);
        return next(new ValidationFailed(err));
      }
    }
  };
};
