const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  riskLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
  isRead: { type: Boolean, default: false },
  feedback: {
    useful: { type: Boolean },
    comments: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);