const express = require('express');
const router = express.Router();
const { createDebtProfile, updateDebtProfile, getDebtProfile } = require('../controllers/debtController');
const validateTodo = require('../middlewares/validator');
const  { debtSchema, debtUpdateSchema } = require('../schemas/schema');
//const authenticateUser = require('../middlewares/authenticateUser');


// Route to create a new debt profile
router.post('/', validateTodo(debtSchema), createDebtProfile);

// Route to update an existing debt profile
router.put('/:debtId', validateTodo(debtUpdateSchema), updateDebtProfile);

// Route to get all debt profiles for the authenticated user
router.get('/', getDebtProfile);

module.exports = router;