const Joi = require("joi");

// --- Authentication Schemas ---
const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required(),
});

// --------------------------------------------------
// AUTH / OTP SCHEMAS
// --------------------------------------------------

const emailSchema = Joi.object({
  email: Joi.string().email().required().trim().lowercase(),
});

const otpSchema = Joi.object({
  email: Joi.string().email().required().trim().lowercase(),

  otp: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": "OTP must be exactly 6 digits",
    }),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().trim().lowercase(),

  otp: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": "OTP must be exactly 6 digits",
    }),

  newPassword: Joi.string().min(12).max(100).required(),
});

const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),

  newPassword: Joi.string().min(12).max(100).required(),
});

// --- Consent Schema ---
const recordConsentSchema = Joi.object({
  consentVersion: Joi.string().required(),
});

// --- Financial Profile Schema ---
const financialProfileSchema = Joi.object({
  monthlyIncome: Joi.number().min(0).required(),
  recurringExpenses: Joi.number().min(0).required(),
  additionalIncome: Joi.number().min(0).default(0),
  accountBalance: Joi.number().min(0).required(),
  currency: Joi.string()
    .valid("EUR", "USD", "GBP", "ZAR", "NGN")
    .default("EUR"),
  lastAnalyzedAt: Joi.date().optional(),
  liquidBuffer: Joi.number().min(0).default(0),
});

// --- Debt Schema ---
const debtSchema = Joi.object({
  lenderName: Joi.string().trim().required(),
  debtType: Joi.string().required(),
  outstandingBalance: Joi.number().min(0).required(),
  monthlyRepayment: Joi.number().min(0).required(),
  interestRate: Joi.number().min(0).max(100).optional(),
});

const debtUpdateSchema = debtSchema.fork(
  [
    "lenderName",
    "debtType",
    "outstandingBalance",
    "monthlyRepayment",
    "interestRate",
  ],
  (schema) => schema.optional(),
);

// --- Recurring Expense Schema ---
const expenseSchema = Joi.object({
  name: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().trim().required(),
  frequency: Joi.string()
    .valid("WEEKLY", "BIWEEKLY", "MONTHLY", "ANNUALLY")
    .default("MONTHLY"),
});

const expenseUpdateSchema = expenseSchema.fork(
  ["name", "amount", "category"],
  (schema) => schema.optional(),
);

// --- Alert Feedback Schema ---
const alertFeedbackSchema = Joi.object({
  useful: Joi.boolean().required(),
  comments: Joi.string().trim().allow("").optional(),
});

// --- Loan Impact Simulation Schema (Phase 2) ---
const loanSimulationSchema = Joi.object({
  proposedLoanAmount: Joi.number().positive().required(),
  proposedMonthlyPayment: Joi.number().positive().required(),
});

// --- Intervention Schema (Phase 2) ---
const interventionSchema = Joi.object({
  type: Joi.string().trim().required(),
  status: Joi.string()
    .valid("PROPOSED", "IN_PROGRESS", "COMPLETED", "DISCARDED")
    .default("PROPOSED"),
  outcome: Joi.string().trim().allow("").optional(),
}); 

module.exports = {
  registerSchema,
  loginSchema,

  emailSchema,
  otpSchema,
  resetPasswordSchema,
  updatePasswordSchema,

  recordConsentSchema,
  financialProfileSchema,
  debtSchema,
  debtUpdateSchema,
  expenseSchema,
  expenseUpdateSchema,
  alertFeedbackSchema,
  loanSimulationSchema,
  interventionSchema,
};
