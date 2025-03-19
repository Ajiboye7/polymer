import User from "../models/UserModels";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const createToken = (_id: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { otp } = req.body;

  try {
    if (!otp) {
      throw new Error("OTP is required");
    }

    if (otp.length !== 6) {
      throw new Error("Please enter a valid 6-digit OTP");
    }

    const user = await User.findOne({ otp });

    if (!user) {
      throw new Error("Invalid OTP");
    }

    if (user.otp === otp && user.otpExpiry && user.otpExpiry > new Date()) {
      user.otp = undefined;
      user.otpExpiry = undefined;

      const token = createToken(user._id);

      await user.save();

      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        data: { token, email: user.email, name: user.name },
      });
    } else {
      throw new Error("Invalid or expired OTP");
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  }
};



