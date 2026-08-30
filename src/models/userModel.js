const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "First Name must be at least 5 characters long"],
      maxlength: [100, "First Name must be at most 100 characters long"],
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "Last Name must be at least 5 characters long"],
      maxlength: [100, "Last Name must be at most 100 characters long"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [12, "Password must be at least 12 characters long"],
      maxlength: [100, "Password must be at most 100 characters long"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);