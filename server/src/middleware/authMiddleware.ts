import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId?: number;
}

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const payload = jwt.verify(token, "secret");
      req.userId = (payload as { id: number }).id;
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }
  } else {
    return res.status(403).json({ message: "Token not found" });
  }

  next();
};
