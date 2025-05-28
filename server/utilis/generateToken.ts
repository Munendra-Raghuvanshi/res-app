import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model"; 
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (res: Response, user: IUserDocument): string => {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }

  if (!user._id) {
    throw new Error("User ID is missing");
  }

  const token = jwt.sign({ userId: user._id.toString() }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
 

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
