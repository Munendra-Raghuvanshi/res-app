import mongoose from "mongoose";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  contact: number;
  address: string;
  city: string;
  countary: string;
  profilePicture: string;
  admin: boolean;
  lastLogin?: Date;
  isVerified?: boolean;
  resetPasswordToken?: String;
  resetPasswordTokenExpiresAt?: Date;
  verificationToken?: String;
  verificationTokenExpiresAt?: Date;
}

export interface IUserDocument extends IUser, Document{
    _id: any;
    createdAt:Date;
    updatedAt:Date;

}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    contact: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      default: "Update your address",
    },
    city: {
      type: String,
      default: "update your city",
    },
    countary: {
      type: String,
      default: "update your city",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    admin: { type: Boolean, default: false },
    //advanced authentication

    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
