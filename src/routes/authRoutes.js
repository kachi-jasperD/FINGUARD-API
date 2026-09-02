const router = require("express").Router();

const authController = require("../controllers/authController");
const validate = require("../middlewares/validator");
const requireAuth = require("../middlewares/requireAuth");

const {
  emailSchema,
  otpSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} = require("../schemas/schema");

// Send verification OTP
router.post("/send-otp", validate(emailSchema), authController.sendOtp);

// Resend verification OTP
router.post("/resend-otp", validate(emailSchema), authController.resendOtp);

// Verify verification OTP
router.post("/verify-otp", validate(otpSchema), authController.verifyOtp);

// Request password reset OTP
router.post(
  "/forgot-password",
  validate(emailSchema),
  authController.forgotPassword,
);

// Reset password using OTP
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword,
);

// Change password while logged in
router.patch(
  "/update-password",
  requireAuth,
  validate(updatePasswordSchema),
  authController.updatePassword,
);

module.exports = router;
