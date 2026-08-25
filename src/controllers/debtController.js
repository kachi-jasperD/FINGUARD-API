const Debt = require('../models/debtModel');  

const createDebtProfile = async (req, res, next) => {
  try {
    // Extracted authenticated user ID from auth middleware (req.user)
    const userId = req.user.id;

    // Create record using sanitized data from validation middleware
    const debtProfile = await Debt.create({
      userId,
      ...req.validatedBody,
    });

    return res.status(201).json({
      success: true,
      message: 'Debt profile created successfully',
      data: debtProfile,
    });
  } catch (err) {
    next(err); // Pass error to global error handling middleware
  }
};

const updateDebtProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const debtId = req.params.debtId;

    // Find the debt profile by ID and user ID to ensure ownership
    const debtProfile = await Debt.findOne({ _id: debtId, userId });

    if (!debtProfile) {
      return res.status(404).json({
        success: false,
        message: 'Debt profile not found',
      });
    }

    // Update the debt profile with validated data
    Object.assign(debtProfile, req.validatedBody);
    await debtProfile.save();

    return res.status(200).json({
      success: true,
      message: 'Debt profile updated successfully',
      data: debtProfile,
    });
  } catch (err) {
    next(err); // Pass error to global error handling middleware
  }
};

const getDebtProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Retrieve all debt profiles for the authenticated user
    const debtProfiles = await Debt.find({ userId });

    return res.status(200).json({
      success: true,
      message: 'Debt profiles retrieved successfully',
      data: debtProfiles,
    });
  } catch (err) {
    next(err); // Pass error to global error handling middleware
  }
};

const deleteDebtProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const debtId = req.params.debtId;

    // Find and delete the debt profile by ID and user ID to ensure ownership
    const deletedDebtProfile = await Debt.findOneAndDelete({ _id: debtId, userId });

    if (!deletedDebtProfile) {
      return res.status(404).json({
        success: false,
        message: 'Debt profile not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Debt profile deleted successfully',
    });
  } catch (err) {
    next(err); // Pass error to global error handling middleware
  }
};

module.exports = {
  createDebtProfile,
  updateDebtProfile,
  getDebtProfile,
  deleteDebtProfile,
};  