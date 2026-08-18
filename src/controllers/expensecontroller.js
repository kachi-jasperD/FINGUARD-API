const Expense = require('../models/Expense');

exports.listExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    return res.status(200).json({ success: true, data: expenses });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, userId: req.user.id });
    return res.status(201).json({ success: true, data: expense });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.expenseId, userId: req.user.id });
    if (!expense) return res.status(404).json({ success: false, message: 'Expense record not found' });
    return res.status(200).json({ success: true, data: expense });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.expenseId, userId: req.user.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({ success: true, data: expense });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.expenseId, userId: req.user.id });
    return res.status(200).json({ success: true, message: 'Expense record deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};