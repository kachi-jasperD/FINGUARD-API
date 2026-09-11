const Notification = require("../models/notificationModel");


exports.getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type } = req.query;

    const query = {
      userId,
    };

    if (type) {
      query.type = type;
    }

    const notifications = await Notification.find(query).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};