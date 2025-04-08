import { Request, Response } from "express";
import User from "../models/UserModels";

export const updateIdentity = async (req: Request, res: Response): Promise<any> => {
  const { userId, identityType } = req.body;

  try {
    // Validate input
    if (!userId || !identityType) {
      return res.status(400).json({
        success: false,
        message: "User ID and identity type are required"
      });
    }

    // Update operation
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { identityType },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Identity type updated successfully",
      data: {
        //userId: updatedUser._id,
        identityType: updatedUser.identityType
      }
    });

  } catch (error) {
    console.error("Identity update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during identity update"
    });
  }
};

export const identityNumber = async (req: Request, res: Response): Promise<any> => {
  const { userId, identityNumber } = req.body;

  try {
    // Validate input
    if (!userId || !identityNumber) {
      return res.status(400).json({
        success: false,
        message: "User ID and identity number are required"
      });
    }

    // Update operation
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { identityNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Identity number updated successfully",
      data: {
        //userId: updatedUser._id,
        identityNumber: updatedUser.identityNumber
      }
    });

  } catch (error) {
    console.error("Identity number update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during identity number update"
    });
  }
};