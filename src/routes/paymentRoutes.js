const express = require("express");

const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const validateTodo = require("../middlewares/validator");

const { paymentSchema } = require("../schemas/schema");

const {
  createPayment,
  getPayments,
} = require("../controllers/paymentController");

router.post("/", requireAuth, validateTodo(paymentSchema), createPayment);

router.get("/", requireAuth, getPayments);

module.exports = router;
    