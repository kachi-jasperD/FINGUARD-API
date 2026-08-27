
const express = require('express');
const router = express.Router();
const {
  createFinancialProfile,
  getFinancialProfileById,
  updateFinancialProfile,
  deleteFinancialProfile,
} = require('../controllers/financialProfileController');
const validateTodo = require('../middlewares/validator');
const { financialProfileSchema } = require('../schemas/schema'); // destructure it
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, validateTodo(financialProfileSchema), createFinancialProfile);
router.get('/:id', requireAuth, getFinancialProfileById);
router.put('/:id', requireAuth, validateTodo(financialProfileSchema), updateFinancialProfile);
router.delete('/:id', requireAuth, deleteFinancialProfile);

module.exports = router;
