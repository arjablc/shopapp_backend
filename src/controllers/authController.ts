import { InternalError } from "../errors/InternalError";
import { UniqueError } from "../errors/uniqueError";
import { createUserService } from "../services/userServices";
import { Request, Response, NextFunction } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const userId = await createUserService({
      email: email,
      password: password,
      name: name,
    });
    res.status(201).json(userId);
  } catch (error: any) {
    if (error.code === "P2002") {
      next(new UniqueError(error));
    } else {
      console.log(error);
      next(new InternalError());
    }
  }
};
