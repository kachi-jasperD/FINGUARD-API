const FinancialProfile = require('../models/FinancialProfileModel');

const createFinancialProfile = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    console.log('DEBUG req.user:', req.user); 
    const existingProfile = await FinancialProfile.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Financial profile already exists for this user',
      });
    }

    const newProfile = new FinancialProfile({
      userId,
      ...req.validatedBody,
    });

    await newProfile.save();

    return res.status(201).json({
      success: true,
      message: 'Financial profile created successfully',
      data: newProfile,
    });
  } catch (err) {
    next(err);
  }
};

const getFinancialProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await FinancialProfile.findById(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Financial profile not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

const updateFinancialProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProfile = await FinancialProfile.findByIdAndUpdate(
      id,
      req.validatedBody,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: 'Financial profile not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Financial profile updated successfully',
      data: updatedProfile,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFinancialProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await FinancialProfile.findOneAndDelete({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Financial profile not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Financial profile deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFinancialProfile,
  getFinancialProfileById,
  updateFinancialProfile,
  deleteFinancialProfile,
};  