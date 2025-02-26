import { Model } from "mongoose";


export interface IUser extends Document {
    _id: string;
    name: string;
    account: string;
    email: string;
    password: string;
  }
  
  // Define the IUserModel interface with static methods
  export interface IUserModel extends Model<IUser> {
    signUp: (
      name: string,
      account: string,
      email: string,
      password: string,
      confirmPassword: string
    ) => Promise<IUser>;
  
    signIn: (
      email: string,
      password: string
    ) => Promise<IUser>;
  }
  