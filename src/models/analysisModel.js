const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    financialProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FinancialProfile",
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    keyDrivers: [
      {
        title: String,
        explanation: String,
        severity: {
          type: String,
          enum: ["low", "medium", "high"],
        },
      },
    ],

    recommendations: [
      {
        title: String,
        reason: String,
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
        },
      },
    ],

    snapshot: {
      monthlyIncome: Number,
      recurringExpenses: Number,
      accountBalance: Number,
      totalDebtBalance: Number,
      totalMonthlyDebtPayments: Number,
      dti: Number,
      buffer: Number,
    },

    modelUsed: {
      type: String,
      default: "gpt-5",
    },
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Analysis || mongoose.model("Analysis", analysisSchema);