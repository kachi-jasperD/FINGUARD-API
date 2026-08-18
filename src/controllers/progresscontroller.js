const FinancialProfile = require('../models/FinancialProfile');

exports.getProgressTrends = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      data: {
        trends: [
          { date: profile?.updatedAt, dti: profile?.calculatedMetrics?.dtiRatio, riskLevel: profile?.calculatedMetrics?.riskLevel }
        ]
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};