const mongoose = require('mongoose');

const financialProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  monthlyIncome: { type: Number, required: true, default: 0 },
  additionalIncome: { type: Number, default: 0 },
  liquidBuffer: { type: Number, default: 0 }, // Emergency savings
  // Derived/calculated domain logic values saved server-side
  calculatedMetrics: {
    dtiRatio: { type: Number },
    remainingCapacity: { type: Number },
    riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
    riskFactors: [{ type: String }],
    lastAssessedAt: { type: Date }
  }
}, { timestamps: true });

module.exports = mongoose.model('FinancialProfile', financialProfileSchema);    