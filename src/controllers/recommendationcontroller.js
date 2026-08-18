const Recommendation = require('../models/Recommendation');

exports.listRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ userId: req.user.id });
    return res.status(200).json({ success: true, data: recommendations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getRecommendation = async (req, res) => {
  try {
    const rec = await Recommendation.findOne({ _id: req.params.recommendationId, userId: req.user.id });
    if (!rec) return res.status(404).json({ success: false, message: 'Recommendation not found' });
    return res.status(200).json({ success: true, data: rec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.recordAction = async (req, res) => {
  try {
    const rec = await Recommendation.findOneAndUpdate(
      { _id: req.params.recommendationId, userId: req.user.id },
      { isTaken: true, actionTakenAt: new Date() },
      { new: true }
    );
    return res.status(200).json({ success: true, data: rec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};