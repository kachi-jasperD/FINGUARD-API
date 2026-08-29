const express = require("express");

const { createAnalysis } = require("../controllers/analysisController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/", requireAuth, createAnalysis);

module.exports = router;
