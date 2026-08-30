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
        title: {
          type: String,
          required: true,
        },

        explanation: {
          type: String,
          required: true,
        },

        severity: {
          type: String,
          enum: ["low", "medium", "high"],
          required: true,
        },
      },
    ],

    recommendations: [
      {
        title: {
          type: String,
          required: true,
        },

        reason: {
          type: String,
          required: true,
        },

        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          required: true,
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
  }
);

module.exports =
  mongoose.models.Analysis ||
  mongoose.model("Analysis", analysisSchema);
