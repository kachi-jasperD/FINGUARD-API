const express = require("express");

const { createAnalysis } = require("../controllers/analysisController");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, createAnalysis);

module.exports = router;
