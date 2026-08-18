const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  frequency: { type: String, enum: ['WEEKLY', 'BIWEEKLY', 'MONTHLY', 'ANNUALLY'], default: 'MONTHLY' }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);