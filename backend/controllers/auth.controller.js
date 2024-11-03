import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateTokenAndCookie } from "../util/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../emails/email.js";

export const signup = async (req, res) => {
  const { email, password, name, role, classroom, prn, confirmPassword } =
    req.body;

  try {
    if (!email || !password || !name || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are important" });
    }

    // Role-based email validation
    if (role === "student") {
      const studentEmailRegex = /^[\w-.]*\d{5}@sakec\.ac\.in$/;
      if (!studentEmailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Sakec-Student Mail" });
      }
    } else if (role === "teacher") {
      const teacherEmailRegex = /^[^\d@]+@sakec\.ac\.in$/;
      if (!teacherEmailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Teacher Mail" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role specified" });
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long, and include at least one number and one special character",
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: `Password doesn't match` });
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashPassword,
      name,
      role,
      prn,
      classroom,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    });

    await user.save();

    // Generate token and set cookie
    generateTokenAndCookie(res, user._id);

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    // Send final response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user && !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Doesn't exist" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    if (user.role !== role) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    generateTokenAndCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.userId; // Make sure this is set correctly by your middleware

    if (!userId) {
      console.log("userid nahi mili");
      return res.status(400).json({ error: "User ID not provided" });
    }

    // Find the user by ID and update the lastLogout field
    const user = await User.findById(userId);

    if (!user) {
      console.log("user nahi mila");
      return res.status(404).json({ error: "User not found" });
    }

    // Update the lastLogout timestamp
    user.lastLogout = new Date();
    await user.save();

    // Clear the cookie and send a response
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter the code" });
    }
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired verification code",
        });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter your email" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `https://wedgeshape.onrender.com/reset-password/${resetToken}`
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Password reset link sent to your email",
      });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long, and include at least one number and one special character",
      });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: `Password doesn't match` });
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "student" }).select("-password"); // Fetch all users excluding password
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Error in fetchAllUsers: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
