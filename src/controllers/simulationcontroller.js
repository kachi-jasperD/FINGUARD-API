const FinancialProfile = require('../models/FinancialProfile');
const Debt = require('../models/Debt');

exports.simulateLoanImpact = async (req, res) => {
  try {
    const { proposedLoanAmount, proposedMonthlyPayment } = req.body;
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    const debts = await Debt.find({ userId: req.user.id });

    const totalIncome = (profile?.monthlyIncome || 0) + (profile?.additionalIncome || 0);
    const currentDebtPayments = debts.reduce((s, d) => s + d.monthlyPayment, 0);
    const newTotalDebtPayments = currentDebtPayments + proposedMonthlyPayment;

    const projectedDti = totalIncome > 0 ? (newTotalDebtPayments / totalIncome) * 100 : 0;
    const projectedRisk = projectedDti > 43 ? 'HIGH' : 'LOW';

    return res.status(200).json({
      success: true,
      data: {
        proposedLoanAmount,
        proposedMonthlyPayment,
        currentDti: profile?.calculatedMetrics?.dtiRatio || 0,
        projectedDti,
        projectedRiskLevel: projectedRisk
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};