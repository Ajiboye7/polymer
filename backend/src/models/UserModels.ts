import mongoose, { Error } from "mongoose";
import { Schema } from "mongoose";
import { IUser, IUserModel } from "../types/types";
import validator from "validator";
import bcrypt from "bcrypt";
import { generateOTP } from "../utils/send-otp";
import { sendOtpEmail } from "../utils/send-otp";

const UserSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: true,
  },

  account: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
  },

  otpExpiry: {
    type: Date,
  },
});

UserSchema.statics.signUp = async function (
  name: string,
  account: number,
  email: string,
  password: string,
  confirmPassword: string
) {
  try {
    if (!name || !email || !password || !confirmPassword) {
      throw new Error("All fields are to be filled ");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid email");
      }

      const accountExists = await this.findOne({ account }).session(session);
      if (accountExists) {
        throw new Error("Account number already exists");
      }

      if (!validator.isStrongPassword(password)) {
        throw new Error("Password not strong enough");
      }

      const normalizedEmail = email.toLowerCase();
      const exists = await this.findOne({ email: normalizedEmail }).session(
        session
      );
      if (exists) {
        throw new Error("Email already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

      try {
        await sendOtpEmail({ email, otp: otp.toString() });
      } catch (error) {
        console.error("Failed to send OTP email:", error);
        throw new Error("Failed to send OTP email. Please try again.");
      }

      const user = await this.create(
        [
          {
            name,
            account,
            email: normalizedEmail,
            password: hash,
            otp,
            otpExpiry,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return user[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("SignUp error:", error);
    throw error;
  }
};

UserSchema.statics.signIn = async function (email: string, password: string) {

  if (!email || !password ) {
    throw new Error("All fields are to be filled ");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  }

  const normalizedEmail = email.toLowerCase();
  const user = await this.findOne({ email: normalizedEmail });

  if (!user) {
    throw new Error("User does not exist");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

export default mongoose.model<IUser, IUserModel>("User", UserSchema);
