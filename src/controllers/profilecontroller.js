const FinancialProfile = require('../models/FinancialProfile');
const Debt = require('../models/Debt');
const Expense = require('../models/Expense');

exports.getProfile = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    return res.status(200).json({ success: true, data: profile });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.upsertProfile = async (req, res) => {
  try {
    const { monthlyIncome, additionalIncome, liquidBuffer } = req.body;
    const profile = await FinancialProfile.findOneAndUpdate(
      { userId: req.user.id },
      { monthlyIncome, additionalIncome, liquidBuffer },
      { new: true, upsert: true }
    );
    return res.status(200).json({ success: true, data: profile });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.assess = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await FinancialProfile.findOne({ userId });
    const debts = await Debt.find({ userId });
    const expenses = await Expense.find({ userId });

    const totalIncome = (profile?.monthlyIncome || 0) + (profile?.additionalIncome || 0);
    const totalDebtPayment = debts.reduce((sum, d) => sum + d.monthlyPayment, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    const dtiRatio = totalIncome > 0 ? (totalDebtPayment / totalIncome) * 100 : 0;
    const remainingCapacity = totalIncome - (totalDebtPayment + totalExpenses);

    let riskLevel = 'LOW';
    const riskFactors = [];

    if (dtiRatio > 43) {
      riskLevel = 'HIGH';
      riskFactors.push('Debt-To-Income exceeds recommended threshold of 43%');
    }
    if (remainingCapacity < 0) {
      riskLevel = 'CRITICAL';
      riskFactors.push('Monthly net cash flow is negative');
    }

    const updatedProfile = await FinancialProfile.findOneAndUpdate(
      { userId },
      {
        calculatedMetrics: {
          dtiRatio,
          remainingCapacity,
          riskLevel,
          riskFactors,
          lastAssessedAt: new Date()
        }
      },
      { new: true }
    );

    return res.status(200).json({ success: true, data: updatedProfile.calculatedMetrics });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};