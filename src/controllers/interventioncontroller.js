const Intervention = require('../models/Intervention');

exports.listInterventions = async (req, res) => {
  try {
    const interventions = await Intervention.find({ userId: req.user.id });
    return res.status(200).json({ success: true, data: interventions });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.create({ ...req.body, userId: req.user.id });
    return res.status(201).json({ success: true, data: intervention });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findOne({ _id: req.params.interventionId, userId: req.user.id });
    if (!intervention) return res.status(404).json({ success: false, message: 'Intervention not found' });
    return res.status(200).json({ success: true, data: intervention });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateIntervention = async (req, res) => {
  try {
    const intervention = await Intervention.findOneAndUpdate(
      { _id: req.params.interventionId, userId: req.user.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({ success: true, data: intervention });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};