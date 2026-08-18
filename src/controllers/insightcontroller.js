const FinancialProfile = require('../models/FinancialProfile');
const Debt = require('../models/Debt');
const Expense = require('../models/Expense');

exports.getPosition = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    const debts = await Debt.find({ userId: req.user.id });
    const expenses = await Expense.find({ userId: req.user.id });

    const totalIncome = (profile?.monthlyIncome || 0) + (profile?.additionalIncome || 0);
    const totalDebt = debts.reduce((sum, d) => sum + d.monthlyPayment, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

    return res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalDebt,
        totalExpense,
        remainingCapacity: totalIncome - (totalDebt + totalExpense),
        liquidBuffer: profile?.liquidBuffer || 0,
        dtiRatio: totalIncome > 0 ? (totalDebt / totalIncome) * 100 : 0
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    const debts = await Debt.find({ userId: req.user.id });
    const expenses = await Expense.find({ userId: req.user.id });

    const totalIncome = (profile?.monthlyIncome || 0) + (profile?.additionalIncome || 0);
    const totalOutflow = debts.reduce((s, d) => s + d.monthlyPayment, 0) + expenses.reduce((s, e) => s + e.amount, 0);
    const monthlyNet = totalIncome - totalOutflow;

    const forecast = [];
    let cumulativeBuffer = profile?.liquidBuffer || 0;
    const shortfalls = [];

    for (let month = 1; month <= 6; month++) {
      cumulativeBuffer += monthlyNet;
      if (cumulativeBuffer < 0) {
        shortfalls.push({ month, shortfallAmount: Math.abs(cumulativeBuffer) });
      }
      forecast.push({ month, projectedCashflow: monthlyNet, projectedBuffer: cumulativeBuffer });
    }

    return res.status(200).json({ success: true, data: { forecast, shortfalls } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getRisk = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      data: {
        riskLevel: profile?.calculatedMetrics?.riskLevel || 'LOW',
        riskFactors: profile?.calculatedMetrics?.riskFactors || []
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};