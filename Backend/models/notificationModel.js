import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "recipientType",
    },
    recipientType: {
      type: String,
      enum: ["User", "Doctor"], // Define valid recipient types
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false, // Track if the notification has been read
    },
  },
  { timestamps: true } // Automatically manage `createdAt` and `updatedAt`
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
