const OTP = require("../models/otpModel");
const generateOtp = require("../utils/generateOtp");

// Create a new OTP
const createOtp = async (email, purpose) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Only one active OTP per email + purpose
  await OTP.deleteMany({
    email: normalizedEmail,
    purpose,
  });

  const otp = generateOtp();

  await OTP.create({
    email: normalizedEmail,
    purpose,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  return otp;
};

// Verify OTP
const verifyOtp = async (email, otp, purpose) => {
  const normalizedEmail = email.toLowerCase().trim();

  const record = await OTP.findOne({
    email: normalizedEmail,
    purpose,
  });

  if (!record) {
    return false;
  }

  // OTP expired
  if (record.expiresAt < new Date()) {
    await OTP.deleteOne({ _id: record._id });
    return false;
  }

  // Wrong OTP
  if (record.otp !== String(otp).trim()) {
    return false;
  }

  // OTP is single-use
  await OTP.deleteOne({
    _id: record._id,
  });

  return true;
};

module.exports = {
  createOtp,
  verifyOtp,
};
