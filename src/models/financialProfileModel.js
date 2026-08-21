const mongoose = require("mongoose");

const financialProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    monthlyIncome: {
      type: Number,
      required: true,
      min: [0, "Monthly income cannot be negative"],
    },

    recurringExpenses: {
      type: Number,
      required: true,
      min: [0, "Recurring expenses cannot be negative"],
    },

    accountBalance: {
      type: Number,
      required: true,
      min: [0, "Account balance cannot be negative"],
    },

    currency: {
      type: String,
      default: "EUR",
      enum: ["EUR", "USD", "GBP", "ZAR", "NGN"],
    },

    lastAnalyzedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("FinancialProfile", financialProfileSchema);
