const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  actionType: { type: String, required: true },
  isTaken: { type: Boolean, default: false },
  actionTakenAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);