
const express = require('express');
const router = express.Router();
const { createFinancialProfile, getFinancialProfileById, updateFinancialProfile, deleteFinancialProfile } = require('../controllers/financialprofilecontroller');
const validateTodo = require('../middlewares/validateTodo');
const financialProfileSchema = require('../schemas/schema');
const authenticateUser = require('../middlewares/authenticateUser');


router.post('/', authenticateUser, validateTodo, createFinancialProfile);
router.get('/:id', authenticateUser, getFinancialProfileById);
router.put('/:id', authenticateUser, validateTodo, updateFinancialProfile);
router.delete('/:id', authenticateUser, deleteFinancialProfile);

module.exports = router;