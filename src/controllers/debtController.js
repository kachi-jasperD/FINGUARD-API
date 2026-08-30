const Debt = require("../models/debtModel");

const createDebtProfile = async (req, res, next) => {
  try {

        console.log("REQ.USER:", req.user);
        console.log("VALIDATED BODY:", req.validatedBody);
    const userId = req.user.id;

    console.log("USER ID:", userId);

    const debtProfile = await Debt.create({
      userId,
      ...req.validatedBody,
    });

    
    return res.status(201).json({
      success: true,
      message: "Debt profile created successfully",
      data: debtProfile,
    });
  } catch (err) {
    next(err);
  }
};

const updateDebtProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const debtId = req.params.id;

       console.log("UPDATE USER ID:", userId);
       console.log("UPDATE DEBT ID:", debtId);

    // Find the debt profile by ID and user ID to ensure ownership
    const debtProfile = await Debt.findOne({ _id: debtId, userId });

    if (!debtProfile) {
      return res.status(404).json({
        success: false,
        message: "Debt profile not found",
      });
    }

    // Update the debt profile with validated data
    Object.assign(debtProfile, req.validatedBody);
    await debtProfile.save();

    return res.status(200).json({
      success: true,
      message: "Debt profile updated successfully",
      data: debtProfile,
    });
  } catch (err) {
    next(err); // Pass error to global error handling middleware
  }
};

const getDebtProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    console.log("GET USER:", req.user);
    console.log("QUERY USER ID:", userId);

    const debtProfiles = await Debt.find({ userId });

    console.log("DEBTS FOUND:", debtProfiles);

    return res.status(200).json({
      success: true,
      message: "Debt profiles retrieved successfully",
      data: debtProfiles,
    });
  } catch (err) {
    next(err);
  }
};

const deleteDebtProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const debtId = req.params.id;

    // Find and delete the debt profile by ID and user ID to ensure ownership
    const deletedDebtProfile = await Debt.findOneAndDelete({
      _id: debtId,
      userId,
    });

    if (!deletedDebtProfile) {
      return res.status(404).json({
        success: false,
        message: "Debt profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Debt profile deleted successfully",
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
