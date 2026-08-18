const Alert = require('../models/Alert');

exports.listAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: alerts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAlert = async (req, res) => {
  try {
    const alert = await Alert.findOne({ _id: req.params.alertId, userId: req.user.id });
    if (!alert) return res.status(404).json({ success: false, message: 'Alert not found' });
    return res.status(200).json({ success: true, data: alert });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      { _id: req.params.alertId, userId: req.user.id },
      { isRead: true },
      { new: true }
    );
    return res.status(200).json({ success: true, data: alert });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.recordFeedback = async (req, res) => {
  try {
    const { useful, comments } = req.body;
    const alert = await Alert.findOneAndUpdate(
      { _id: req.params.alertId, userId: req.user.id },
      { feedback: { useful, comments } },
      { new: true }
    );
    return res.status(200).json({ success: true, data: alert });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};