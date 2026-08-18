const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, required: true }, // e.g., DEBT_REPAYMENT_PLAN, BUDGET_ADJUSTMENT
  status: { type: String, enum: ['PROPOSED', 'IN_PROGRESS', 'COMPLETED', 'DISCARDED'], default: 'PROPOSED' },
  outcome: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Intervention', interventionSchema);