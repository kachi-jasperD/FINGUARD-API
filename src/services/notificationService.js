const Notification = require("../models/notificationModel");

/**
 * Create a notification without allowing notification failures to
 * interrupt the primary business operation (for example, generating
 * and saving a financial analysis).
 */
const createNotification = async ({
  userId,
  type,
  title,
  description,
  amount,
  direction,
}) => {
  try {
    const notificationData = {
      userId,
      type,
      title,
      description,
    };

    if (amount !== undefined) {
      notificationData.amount = amount;
    }

    if (direction !== undefined) {
      notificationData.direction = direction;
    }

    return await Notification.create(notificationData);
  } catch (error) {
    console.error("Failed to create notification:", error.message);
    return null;
  }
};

module.exports = {
  createNotification,
};
