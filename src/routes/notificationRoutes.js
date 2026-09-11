const express = require("express");
const router = express.Router();

const Notification = require("../models/notificationModel");
const { getNotifications } = require("../controllers/notificationController");
const requireAuth = require("../middlewares/requireAuth");

router.get("/", requireAuth, getNotifications);

// router.post("/test", requireAuth, async (req, res) => {
//   try {
//     const notification = await Notification.create({
//       userId: req.user.id,
//       type: "system",
//       title: "Test notification",
//       description: "This is a test notification",
//     });

//     res.status(201).json({
//       success: true,
//       data: notification,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

module.exports = router;