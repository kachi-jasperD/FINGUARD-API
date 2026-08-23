const express = require('express');
const router = express.Router();
const debtCtrl = require('../controllers/debtController');

router.get('/v1/debts', debtCtrl.listDebts);
router.post('/v1/debts', debtCtrl.createDebt);
router.get('/v1/debts/:debtId', debtCtrl.getDebt);
router.patch('/v1/debts/:debtId', debtCtrl.updateDebt);
router.delete('/v1/debts/:debtId', debtCtrl.deleteDebt);

module.exports = router;