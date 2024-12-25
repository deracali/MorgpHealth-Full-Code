import express from "express";
import {
  createNotification,
  fetchNotifications
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

// Create a notification
notificationRouter.post("/create/noti", createNotification);

// Get notifications for a recipient
notificationRouter.get("/:recipientId/:recipientType", fetchNotifications);

// Mark a notification as read
// notificationRoute.put("/read/:notificationId", markNotificationAsRead);

export default notificationRouter;
