import { Request, Response, NextFunction} from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utilis/cloudinary";
import { generateToken } from "../utilis/generateToken";
import { generateVerificationCode } from "../utilis/generateverificationCode";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendwelcomeEmail } from "../mailtrap/email";

// Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
 
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exists with this email"
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode(); // Make sure this is never undefined

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    generateToken(res, user);
    await sendVerificationEmail(email, verificationToken);

    const userWithoutPassword = await User.findOne({ email }).select("-password");

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
      return;
    }
    generateToken(res, user);
    user.lastLogin = new Date();
    await user.save();

    const userWithoutPassword = await User.findOne({ email }).select("-password");
    res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Verify User
export const isVerified = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendwelcomeEmail(user.email, user.fullname);
    res.status(200).json({
      success: true,
      message: "Email is verified successfully.",
      user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Logout
export const logout = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User does not exist",
      });
      return;
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);
    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update Profile
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } = req.body;

    let cloudResponse: any;
    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    
    const updateData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture: cloudResponse.secure_url, // Assuming you want to store the image URL
    };

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    res.status(200).json({
      success: true,
      user,
      message: "Your profile picture has been successfully updated"
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
      const userId = req.id;
      const user = await User.findById(userId).select("-password");
      
      if (!user) {
          res.status(404).json({
              success: false,
              message: 'User not found'
          });
          return; 
      }

      res.status(200).json({
          success: true,
          user
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};
