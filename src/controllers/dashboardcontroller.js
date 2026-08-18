const FinancialProfile = require('../models/FinancialProfile');
const Debt = require('../models/Debt');
const Expense = require('../models/Expense');
const Alert = require('../models/Alert');
const Recommendation = require('../models/Recommendation');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const [profile, debts, expenses, alerts, recommendations] = await Promise.all([
      FinancialProfile.findOne({ userId }),
      Debt.find({ userId }),
      Expense.find({ userId }),
      Alert.find({ userId, isRead: false }),
      Recommendation.find({ userId, isTaken: false })
    ]);

    const totalIncome = (profile?.monthlyIncome || 0) + (profile?.additionalIncome || 0);
    const totalDebt = debts.reduce((s, d) => s + d.monthlyPayment, 0);
    const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

    return res.status(200).json({
      success: true,
      data: {
        financialPosition: {
          monthlyIncome: totalIncome,
          totalDebtPayments: totalDebt,
          totalExpenses: totalExpense,
          remainingCapacity: totalIncome - (totalDebt + totalExpense),
          liquidBuffer: profile?.liquidBuffer || 0
        },
        dtiRatio: profile?.calculatedMetrics?.dtiRatio || 0,
        riskLevel: profile?.calculatedMetrics?.riskLevel || 'LOW',
        unreadAlerts: alerts,
        recommendations
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};