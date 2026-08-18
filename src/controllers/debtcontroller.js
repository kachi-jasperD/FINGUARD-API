const Debt = require('../models/Debt');

exports.listDebts = async (req, res) => {
  try {
    const debts = await Debt.find({ userId: req.user.id });
    return res.status(200).json({ success: true, data: debts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createDebt = async (req, res) => {
  try {
    const debt = await Debt.create({ ...req.body, userId: req.user.id });
    return res.status(201).json({ success: true, data: debt });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDebt = async (req, res) => {
  try {
    const debt = await Debt.findOne({ _id: req.params.debtId, userId: req.user.id });
    if (!debt) return res.status(404).json({ success: false, message: 'Debt record not found' });
    return res.status(200).json({ success: true, data: debt });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateDebt = async (req, res) => {
  try {
    const debt = await Debt.findOneAndUpdate(
      { _id: req.params.debtId, userId: req.user.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({ success: true, data: debt });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteDebt = async (req, res) => {
  try {
    await Debt.findOneAndDelete({ _id: req.params.debtId, userId: req.user.id });
    return res.status(200).json({ success: true, message: 'Debt record deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};