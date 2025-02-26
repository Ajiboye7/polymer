import jwt from "jsonwebtoken";

import User from "../models/UserModels";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: { _id: string };
}

const requiredAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.body;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token Required" });
  }
  const token = authorization.split(" ")[1];

  if (!process.env.SECRET) {
    return res.status(500).json({ error: "JWT secret is not defined" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET) as { _id: string };

    const user = await User.findById(decoded._id).select("_id");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = { _id: user._id.toString() };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requiredAuth;



