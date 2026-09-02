const authService = require("../services/authService");

// --------------------------------------------------
// SEND OTP
// --------------------------------------------------

exports.sendOtp = async (req, res) => {
  try {
    const result = await authService.sendOtp(req.validatedBody.email);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------------------------
// RESEND OTP
// --------------------------------------------------

exports.resendOtp = async (req, res) => {
  try {
    const result = await authService.resendOtp(req.validatedBody.email);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------------------------
// VERIFY OTP
// --------------------------------------------------

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.validatedBody;

    const result = await authService.verifyEmailOtp(email, otp);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------------------------
// FORGOT PASSWORD
// --------------------------------------------------

exports.forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.validatedBody.email);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------------------------
// RESET PASSWORD
// --------------------------------------------------

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.validatedBody;

    const result = await authService.resetPassword(email, otp, newPassword);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------------------------
// UPDATE PASSWORD
// --------------------------------------------------

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.validatedBody;

    const result = await authService.updatePassword(
      req.user.id,
      currentPassword,
      newPassword,
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
