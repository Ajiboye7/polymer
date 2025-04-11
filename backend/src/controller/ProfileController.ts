import UserProfile from "../models/ProfileModels";
import { Request, Response } from "express";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      phoneNumber,
      address,

      nextOfKin,
      nextOfKinRelationship,
      userId,
    } = req.body;
    const existingProfile = await UserProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
      });
    }

    const profile = await UserProfile.profile(
      phoneNumber,

      address,
      nextOfKin,
      nextOfKinRelationship,
      userId
    );

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Profile creation error:", error);

    if (error instanceof Error) {
      const errorMessage = error.message;

      const clientErrors = [
        "All fields are to be filled",
        "Invalid phone number format",
      ];

      if (clientErrors.some((msg) => errorMessage.includes(msg))) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating profile",
    });
  }
};
