import { Request, Response, NextFunction } from "express";

const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const user = res.user;
  const path = req.path;
  if (!user) {
    res.status(403).json({
      message: "forbidden",
    });
  }
};

export { protectRoute };
