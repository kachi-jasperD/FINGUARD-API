const Payment = require("../models/paymentModel");
const { createNotification } = require("../services/notificationService");

const createPayment = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const payment = await Payment.create({
      userId,
      ...req.validatedBody,
    });

    let title;
    let notificationType = "payment";
    let direction;

    switch (payment.type) {
      case "income":
        title = "Money Received";
        direction = "credit";
        break;

      case "expense":
        title = "Payment Made";
        direction = "debit";
        break;

      case "debt_payment":
        title = "Paid Debt";
        direction = "debit";
        break;

      case "bill_payment":
        title = "Bill Payment";
        direction = "debit";
        break;

      default:
        title = "Payment";
        direction = "debit";
    }

    await createNotification({
      userId,
      type: notificationType,
      title,
      description: payment.description,
      amount: payment.amount,
      direction,
    });

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

const getPayments = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const payments = await Payment.find({ userId }).sort({
      paymentDate: -1,
    });

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  getPayments,
};
