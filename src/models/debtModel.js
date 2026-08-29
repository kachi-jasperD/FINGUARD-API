const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    lenderName: {
      type: String,
      required: true,
      trim: true,
    },

    debtType: {
      type: String,
      required: true,
      enum: [
        "personal_loan",
        "credit_card",
        "mortgage",
        "student_loan",
        "vehicle_loan",
        "other",
      ],
    },

    outstandingBalance: {
      type: Number,
      required: true,
      min: [0, "Outstanding balance cannot be negative"],
    },

    monthlyRepayment: {
      type: Number,
      required: true,
      min: [0, "Monthly repayment cannot be negative"],
    },

    interestRate: {
      type: Number,
      default: 0,
      min: [0, "Interest rate cannot be negative"],
    },

    dueDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.models.Debt || mongoose.model("Debt", debtSchema);
