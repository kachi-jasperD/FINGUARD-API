const express = require("express");
const router = express.Router();
const {
  createDebtProfile,
  updateDebtProfile,
  getDebtProfile,
  deleteDebtProfile,
} = require("../controllers/debtController");
const validateTodo = require("../middlewares/validator");
const { debtSchema, debtUpdateSchema } = require("../schemas/schema");
const requireAuth = require("../middlewares/requireAuth");
//const authenticateUser = require('../middlewares/authenticateUser'); 

// Route to create a new debt profile
router.post("/", requireAuth,validateTodo(debtSchema), createDebtProfile);

// Route to update an existing debt profile
router.put(
  "/:id",
  requireAuth,validateTodo(debtUpdateSchema),
  updateDebtProfile,
);

// Route to get all debt profiles for the authenticated user
router.get("/", requireAuth, getDebtProfile);

// Route to update an existing debt profile
router.delete(
  "/:id",
  requireAuth,
  deleteDebtProfile,
);


module.exports = router;
