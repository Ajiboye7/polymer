import { Request, Response } from 'express';
import User from '../models/UserModels';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const createToken = (_id: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  const { otp } = req.body;

  try {
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    if (otp.length !== 6) {
      return res.status(400).json({ message: "Please enter a valid 6-digit OTP" });
    }

    const user = await User.findOne({ otp });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token // Make sure to send the token if needed
    });
    
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : "Internal server error" 
    });
  }
};



{/*const createToken = (_id: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  const { otp, email } = req.body;

  try {
   
    if (!otp || !email) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP and email are required" 
      });
    }

    if (otp.length !== 6) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP must be 6 digits" 
      });
    }

    const user = await User.findOne({ 
      email: email.toLowerCase(),
      otp,
      otpExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired OTP" 
      });
    }

    
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

  
    const token = createToken(user._id);

  
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isVerified: true
        }
      }
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during OTP verification"
    });
  }
};*/}