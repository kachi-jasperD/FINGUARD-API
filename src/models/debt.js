const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  creditorName: { type: String, required: true },
  balance: { type: Number, required: true },
  monthlyPayment: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  dueDate: { type: Number }, // Day of the month (1-31)
  category: { type: String, enum: ['MORTGAGE', 'AUTO', 'PERSONAL', 'CREDIT_CARD', 'STUDENT', 'OTHER'] }
}, { timestamps: true });

module.exports = mongoose.model('Debt', debtSchema);