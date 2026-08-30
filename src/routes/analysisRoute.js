const express = require("express");

const {
  createAnalysis,
  getAnalyses,
  getAnalysisById,
  updateAnalysis,
  deleteAnalysis,
} = require("../controllers/analysisController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

// Generate a new AI analysis
router.post("/", requireAuth, createAnalysis);

// Get all analyses belonging to authenticated user
router.get("/", requireAuth, getAnalyses);

// Get one analysis belonging to authenticated user
router.get("/:id", requireAuth, getAnalysisById);

// Update an existing analysis
router.put("/:id", requireAuth, updateAnalysis);

// Delete an existing analysis
router.delete("/:id", requireAuth, deleteAnalysis);

module.exports = router;
