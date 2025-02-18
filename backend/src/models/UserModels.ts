import mongoose, { Error } from "mongoose";
import { Schema } from "mongoose";
import { IUser, IUserModel } from "../../../types/types";
import validator from "validator";
import bcrypt from "bcryptjs";
const UserSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: true,
  },

  account: {
    type: String,
    required: true,
    unique: true,
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
});

UserSchema.statics.signUp = async function (
  name: string,
  account: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (!name || !account || !email || !password || !confirmPassword) {
    throw new Error("All fields are to be field");
  }

  if (!validator.isEmail(email)) {
    throw new Error("please enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, account, password: hash });

  return user;
};

UserSchema.statics.signIn = async function (email: string, password: string) {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
  
    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email");
    }
  
    const user = await this.findOne({ email });
  
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

//export default mongoose.model("User", UserSchema)

//module.exports = mongoose.model<IUser, IUserModel>("User", UserSchema);
