const FinancialProfile = require("../models/FinancialProfileModel");
const Debt = require("../models/DebtModel");
const Analysis = require("../models/analysisModel");

const { generateAnalysis } = require("../services/analysisService");

const createAnalysis = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profile = await FinancialProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Financial profile not found",
      });
    }

    const debts = await Debt.find({ userId });

    const totalDebtBalance = debts.reduce(
      (sum, debt) => sum + debt.outstandingBalance,
      0,
    );

    const totalMonthlyDebtPayments = debts.reduce(
      (sum, debt) => sum + debt.monthlyRepayment,
      0,
    );

    const dti = totalMonthlyDebtPayments / profile.monthlyIncome;

    const buffer =
      profile.monthlyIncome -
      profile.recurringExpenses -
      totalMonthlyDebtPayments;

    const financialContext = {
      monthlyIncome: profile.monthlyIncome,
      recurringExpenses: profile.recurringExpenses,
      accountBalance: profile.accountBalance,
      totalDebtBalance,
      totalMonthlyDebtPayments,
      dti,
      buffer,
    };

    const aiResponse = await generateAnalysis(financialContext);

    const analysis = await Analysis.create({
      userId,
      riskLevel: "medium",
      summary: aiResponse,
      snapshot: financialContext,
    });

    return res.status(201).json({
      success: true,
      data: analysis,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAnalysis,
};
