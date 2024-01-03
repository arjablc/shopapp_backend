import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, ZodObject } from "zod";
import BadRequest from "../errors/badRequest";
ZodError;
export const validateResource = ({
  bodySchema,
  parmSchema,
}: {
  bodySchema?: AnyZodObject;
  parmSchema?: AnyZodObject;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (parmSchema) {
        parmSchema.parse(req.params);
      }
      if (bodySchema) {
        bodySchema.parse(req.body);
      }
      next();
    } catch (error: any) {
      const err: any = error.issues.map((e: any) => ({
        path: e.path[0],
        message: e.message,
      }));
      next(new BadRequest("validation failed", err));
    }
  };
};
