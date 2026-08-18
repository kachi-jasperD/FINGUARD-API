const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

    const user = await User.create({ email, passwordHash: password, name });
    return res.status(201).json({ success: true, data: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    return res.status(200).json({ success: true, token: 'mock-jwt-token', user: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = async (req, res) => {
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};