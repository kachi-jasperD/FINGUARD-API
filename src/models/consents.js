const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  consentVersion: { type: String, required: true },
  isConsented: { type: Boolean, required: true, default: true },
  consentedAt: { type: Date, default: Date.now },
  withdrawnAt: { type: Date }
}, { timestamps: true });

 module.exports = mongoose.model('Consent', consentSchema);