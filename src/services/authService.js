const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const { createOtp, verifyOtp } = require("./otpService");

const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");

// --------------------------------------------------
// SEND OTP
// --------------------------------------------------

const sendOtp = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified");
  }

  const otp = await createOtp(user.email, "VERIFY_EMAIL");

  await sendVerificationEmail({
    email: user.email,
    firstName: user.firstName,
    verificationCode: otp,
  });

  return {
    message: "OTP sent successfully",
    otp,
  };
};

// --------------------------------------------------
// RESEND OTP
// --------------------------------------------------

const resendOtp = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified");
  }

  const otp = await createOtp(user.email, "VERIFY_EMAIL");

  await sendVerificationEmail({
    email: user.email,
    firstName: user.firstName,
    verificationCode: otp,
  });

  return {
    message: "OTP resent successfully",
    otp,
  };
};

// --------------------------------------------------
// VERIFY OTP
// --------------------------------------------------

const verifyEmailOtp = async (email, otp) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    return {
      message: "Email is already verified",
    };
  }

  const valid = await verifyOtp(user.email, otp, "VERIFY_EMAIL");

  if (!valid) {
    throw new Error("Invalid or expired OTP");
  }

  user.isVerified = true;
  await user.save();

  return {
    message: "Email verified successfully",
  };
};

// --------------------------------------------------
// FORGOT PASSWORD
// --------------------------------------------------

const forgotPassword = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const otp = await createOtp(user.email, "FORGOT_PASSWORD");

  await sendResetPasswordEmail({
    email: user.email,
    firstName: user.firstName,
    resetCode: otp,
  });

  return {
    message: "Password reset OTP sent successfully",
    otp,
  };
};

// --------------------------------------------------
// RESET PASSWORD
// --------------------------------------------------

const resetPassword = async (email, otp, newPassword) => {
  if (!email || !otp || !newPassword) {
    throw new Error("Email, OTP and new password are required");
  }

  if (newPassword.length < 12) {
    throw new Error("Password must be at least 12 characters long");
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const valid = await verifyOtp(user.email, otp, "FORGOT_PASSWORD");

  if (!valid) {
    throw new Error("Invalid or expired OTP");
  }

  user.password = await bcrypt.hash(newPassword, 12);

  await user.save();

  return {
    message: "Password reset successfully",
  };
};

// --------------------------------------------------
// UPDATE PASSWORD
// --------------------------------------------------

const updatePassword = async (userId, currentPassword, newPassword) => {
  if (!currentPassword || !newPassword) {
    throw new Error("Current password and new password are required");
  }

  if (newPassword.length < 12) {
    throw new Error("New password must be at least 12 characters long");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatches = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatches) {
    throw new Error("Current password is incorrect");
  }

  const samePassword = await bcrypt.compare(newPassword, user.password);

  if (samePassword) {
    throw new Error("New password must be different from current password");
  }

  user.password = await bcrypt.hash(newPassword, 12);

  await user.save();

  return {
    message: "Password updated successfully",
  };
};

module.exports = {
  sendOtp,
  resendOtp,
  verifyEmailOtp,
  forgotPassword,
  resetPassword,
  updatePassword,
};
