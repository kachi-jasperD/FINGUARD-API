const Joi = require('joi');

// --- Authentication Schemas ---
const registerSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required(),
  name: Joi.string().trim().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required()
});

// --- Consent Schema ---
const recordConsentSchema = Joi.object({
  consentVersion: Joi.string().required()
});

// --- Financial Profile Schema ---
const financialProfileSchema = Joi.object({
  monthlyIncome: Joi.number().min(0).required(),
  additionalIncome: Joi.number().min(0).default(0),
  liquidBuffer: Joi.number().min(0).default(0)
});


// --- Debt Schema ---
const debtSchema = Joi.object({
  creditorName: Joi.string().trim().required(),
  balance: Joi.number().min(0).required(),
  monthlyPayment: Joi.number().min(0).required(),
  interestRate: Joi.number().min(0).max(100).required(),
  dueDate: Joi.number().integer().min(1).max(31).optional(),
  category: Joi.string()
    .valid('MORTGAGE', 'AUTO', 'PERSONAL', 'CREDIT_CARD', 'STUDENT', 'OTHER')
    .required()
});

const debtUpdateSchema = debtSchema.fork(
  ['creditorName', 'balance', 'monthlyPayment', 'interestRate', 'category'],
  (schema) => schema.optional()
);

// --- Recurring Expense Schema ---
const expenseSchema = Joi.object({
  name: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().trim().required(),
  frequency: Joi.string()
    .valid('WEEKLY', 'BIWEEKLY', 'MONTHLY', 'ANNUALLY')
    .default('MONTHLY')
});

const expenseUpdateSchema = expenseSchema.fork(
  ['name', 'amount', 'category'],
  (schema) => schema.optional()
);

// --- Alert Feedback Schema ---
const alertFeedbackSchema = Joi.object({
  useful: Joi.boolean().required(),
  comments: Joi.string().trim().allow('').optional()
});

// --- Loan Impact Simulation Schema (Phase 2) ---
const loanSimulationSchema = Joi.object({
  proposedLoanAmount: Joi.number().positive().required(),
  proposedMonthlyPayment: Joi.number().positive().required()
});

// --- Intervention Schema (Phase 2) ---
const interventionSchema = Joi.object({
  type: Joi.string().trim().required(),
  status: Joi.string()
    .valid('PROPOSED', 'IN_PROGRESS', 'COMPLETED', 'DISCARDED')
    .default('PROPOSED'),
  outcome: Joi.string().trim().allow('').optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  recordConsentSchema,
  financialProfileSchema,
  debtSchema,
  debtUpdateSchema,
  expenseSchema,
  expenseUpdateSchema,
  alertFeedbackSchema,
  loanSimulationSchema,
  interventionSchema
};