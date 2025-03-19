import { Model } from "mongoose";


export interface IUser extends Document {
    _id: string;
    name: string;
    account: number;
    email: string;
    password: string;
    otp?: string;
  otpExpiry?: Date;
  }

  export interface IUserModel extends Model<IUser> {
    signUp: (
      name: string,
      account: number,
      email: string,
      password: string,
      confirmPassword: string,

    ) => Promise<IUser>;
  
    signIn: (
      email: string,
      password: string
    ) => Promise<IUser>;
  }

  export interface sendOtpProps {
    email: string;
    otp: string;
  }
  