const Consent = require('../models/Consent');
const User = require('../models/User');
const Debt = require('../models/Debt');
const Expense = require('../models/Expense');
const FinancialProfile = require('../models/FinancialProfile');

exports.getCurrentConsent = async (req, res) => {
  try {
    const consent = await Consent.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: consent });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.recordConsent = async (req, res) => {
  try {
    const { consentVersion } = req.body;
    const consent = await Consent.create({ userId: req.user.id, consentVersion, isConsented: true });
    return res.status(201).json({ success: true, data: consent });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.withdrawConsent = async (req, res) => {
  try {
    const consent = await Consent.findOneAndUpdate(
      { userId: req.user.id, isConsented: true },
      { isConsented: false, withdrawnAt: new Date() },
      { new: true }
    );
    return res.status(200).json({ success: true, data: consent });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getStoredData = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    const debts = await Debt.find({ userId: req.user.id });
    const expenses = await Expense.find({ userId: req.user.id });
    return res.status(200).json({ success: true, data: { profile, debts, expenses } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.exportData = async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    const debts = await Debt.find({ userId: req.user.id });
    const expenses = await Expense.find({ userId: req.user.id });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=financial-data.json');
    return res.status(200).send(JSON.stringify({ profile, debts, expenses }, null, 2));
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAccountData = async (req, res) => {
  try {
    await Promise.all([
      User.findByIdAndDelete(req.user.id),
      FinancialProfile.deleteMany({ userId: req.user.id }),
      Debt.deleteMany({ userId: req.user.id }),
      Expense.deleteMany({ userId: req.user.id }),
      Consent.deleteMany({ userId: req.user.id })
    ]);
    return res.status(200).json({ success: true, message: 'All financial and account data deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};