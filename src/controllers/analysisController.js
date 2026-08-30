const FinancialProfile = require("../models/financialProfileModel");
const Debt = require("../models/DebtModel");
const Analysis = require("../models/analysisModel");

// const { generateAnalysis } = require("../services/analysisService");
const { generateMockAnalysis } = require("../services/mockAnalysisService");

// ==========================================
// CREATE / GENERATE AI ANALYSIS
// POST /api/analyses
// ==========================================

const createAnalysis = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find the authenticated user's financial profile
    const profile = await FinancialProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Financial profile not found",
      });
    }

    // Find all debts belonging to the authenticated user
    const debts = await Debt.find({ userId });

    // Calculate total debt
    const totalDebtBalance = debts.reduce(
      (sum, debt) => sum + debt.outstandingBalance,
      0,
    );

    // Calculate total monthly debt payments
    const totalMonthlyDebtPayments = debts.reduce(
      (sum, debt) => sum + debt.monthlyRepayment,
      0,
    );

    // Calculate DTI
    const dti =
      profile.monthlyIncome > 0
        ? totalMonthlyDebtPayments / profile.monthlyIncome
        : 0;

    // Calculate monthly financial buffer
    const buffer =
      profile.monthlyIncome -
      profile.recurringExpenses -
      totalMonthlyDebtPayments;

    // Information sent to AI
    const financialContext = {
      monthlyIncome: profile.monthlyIncome,
      recurringExpenses: profile.recurringExpenses,
      accountBalance: profile.accountBalance,
      additionalIncome: profile.additionalIncome,
      currency: profile.currency,
      totalDebtBalance,
      totalMonthlyDebtPayments,
      dti,
      dtiPercentage: dti * 100,
      buffer,
    };

    console.log("AI FINANCIAL CONTEXT:", financialContext);

    // Generate AI analysis
    // const aiResponse = await generateAnalysis(financialContext);
    // console.log("AI RESPONSE:", aiResponse);

    // ==========================================
    // MOCK AI
    // ==========================================

    const aiResponse = generateMockAnalysis(financialContext);
    console.log("MOCK AI RESPONSE:", aiResponse);

    // ==========================================
    // SAVE ANALYSIS
    // ==========================================

    // Save AI analysis to MongoDB
    const analysis = await Analysis.create({
      userId,
      financialProfileId: profile._id,

      riskLevel: aiResponse.riskLevel,
      summary: aiResponse.summary,

      keyDrivers: aiResponse.keyDrivers,
      recommendations: aiResponse.recommendations,

      snapshot: financialContext,

      // modelUsed: "gpt-5",
      modelUsed: "mock-ai",
    });

    return res.status(201).json({
      success: true,
      // message: "AI financial analysis generated successfully",
      message: "Financial analysis generated successfully",
      data: analysis,
    });
  } catch (err) {
    next(err);
  }
};

// ==========================================
// GET ALL ANALYSES FOR AUTHENTICATED USER
// GET /api/analyses
// ==========================================

const getAnalyses = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const analyses = await Analysis.find({ userId })
      .sort({ createdAt: -1 })
      .populate("financialProfileId");

    return res.status(200).json({
      success: true,
      count: analyses.length,
      data: analyses,
    });
  } catch (err) {
    next(err);
  }
};

// ==========================================
// GET ONE ANALYSIS
// GET /api/analyses/:id
// ==========================================

const getAnalysisById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const analysisId = req.params.id;

    const analysis = await Analysis.findOne({
      _id: analysisId,
      userId,
    }).populate("financialProfileId");

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (err) {
    next(err);
  }
};

// ==========================================
// UPDATE ANALYSIS
// PUT /api/analyses/:id
// ==========================================

const updateAnalysis = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const analysisId = req.params.id;

    const allowedFields = [
      "riskLevel",
      "summary",
      "keyDrivers",
      "recommendations",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const analysis = await Analysis.findOneAndUpdate(
      {
        _id: analysisId,
        userId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Analysis updated successfully",
      data: analysis,
    });
  } catch (err) {
    next(err);
  }
};

// ==========================================
// DELETE ANALYSIS
// DELETE /api/analyses/:id
// ==========================================

const deleteAnalysis = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const analysisId = req.params.id;

    const analysis = await Analysis.findOneAndDelete({
      _id: analysisId,
      userId,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAnalysis,
  getAnalyses,
  getAnalysisById,
  updateAnalysis,
  deleteAnalysis,
};
