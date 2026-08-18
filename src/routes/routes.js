const express = require('express');

const authCtrl = require('../controllers/authController.js');
const consentCtrl = require('../controllers/consentController.js');
const profileCtrl = require('../controllers/profileController.js');
const debtCtrl = require('../controllers/debtController.js');
const expenseCtrl = require('../controllers/expenseController.js');
const insightCtrl = require('../controllers/insightController.js');
const recCtrl = require('../controllers/recommendationController.js');
const alertCtrl = require('../controllers/alertController.js');
const dashboardCtrl = require('../controllers/dashboardController.js');
const simCtrl = require('../controllers/simulationController.js');
const interventionCtrl = require('../controllers/interventionController.js');
const progressCtrl = require('../controllers/progressController.js');

const router = express.Router();

// MVP Endpoints[cite: 1]
// Authentication[cite: 1]
router.post('/v1/auth/register', authCtrl.register);
router.post('/v1/auth/login', authCtrl.login);
router.post('/v1/auth/logout', authCtrl.logout);
router.get('/v1/me', authCtrl.getProfile);

// Consent & Privacy[cite: 1]
router.get('/v1/consent/current', consentCtrl.getCurrentConsent);
router.post('/v1/consent', consentCtrl.recordConsent);
router.post('/v1/consent/withdraw', consentCtrl.withdrawConsent);
router.get('/v1/me/data', consentCtrl.getStoredData);
router.get('/v1/me/data/export', consentCtrl.exportData);
router.delete('/v1/me/data', consentCtrl.deleteAccountData);

// Financial Profile[cite: 1]
router.get('/v1/financial-profile', profileCtrl.getProfile);
router.put('/v1/financial-profile', profileCtrl.upsertProfile);
router.post('/v1/financial-profile/assess', profileCtrl.assess);

// Debts[cite: 1]
router.get('/v1/debts', debtCtrl.listDebts);
router.post('/v1/debts', debtCtrl.createDebt);
router.get('/v1/debts/:debtId', debtCtrl.getDebt);
router.patch('/v1/debts/:debtId', debtCtrl.updateDebt);
router.delete('/v1/debts/:debtId', debtCtrl.deleteDebt);

// Recurring Expenses[cite: 1]
router.get('/v1/expenses', expenseCtrl.listExpenses);
router.post('/v1/expenses', expenseCtrl.createExpense);
router.get('/v1/expenses/:expenseId', expenseCtrl.getExpense);
router.patch('/v1/expenses/:expenseId', expenseCtrl.updateExpense);
router.delete('/v1/expenses/:expenseId', expenseCtrl.deleteExpense);

// Insights[cite: 1]
router.get('/v1/financial-position', insightCtrl.getPosition);
router.get('/v1/financial-forecast', insightCtrl.getForecast);
router.get('/v1/financial-risk', insightCtrl.getRisk);

// Recommendations[cite: 1]
router.get('/v1/recommendations', recCtrl.listRecommendations);
router.get('/v1/recommendations/:recommendationId', recCtrl.getRecommendation);
router.post('/v1/recommendations/:recommendationId/action', recCtrl.recordAction);

// Alerts[cite: 1]
router.get('/v1/alerts', alertCtrl.listAlerts);
router.get('/v1/alerts/:alertId', alertCtrl.getAlert);
router.post('/v1/alerts/:alertId/read', alertCtrl.markAsRead);
router.post('/v1/alerts/:alertId/feedback', alertCtrl.recordFeedback);

// Dashboard[cite: 1]
router.get('/v1/dashboard', dashboardCtrl.getDashboardData);

// Phase 2 Endpoints[cite: 1]
router.post('/v1/simulations/loan-impact', simCtrl.simulateLoanImpact);
router.get('/v1/interventions', interventionCtrl.listInterventions);
router.post('/v1/interventions', interventionCtrl.createIntervention);
router.get('/v1/interventions/:interventionId', interventionCtrl.getIntervention);
router.patch('/v1/interventions/:interventionId', interventionCtrl.updateIntervention);
router.get('/v1/financial-progress', progressCtrl.getProgressTrends);

module.exports = router;