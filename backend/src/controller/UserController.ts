import User from "../models/UserModels";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const createToken = (_id: string) => {
  if (!process.env.SECRET) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

export const signUpUser = async (req: Request, res: Response) => {
  console.log("Signup request received:", req.body); 

  const { name, account, email, password, confirmPassword } = req.body;

  try {
    const user = await User.signUp(
      name,
      account,
      email,
      password,
      confirmPassword
    );
    const token = createToken(user._id);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { name, email, account, token },
    });
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.signIn(email, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({
        success: true,
        message: "User signed in successfully",
        data: { token, email, password },
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};
