import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    signal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signal",
      required: true,
    },
    readAt: { type: Date, default: null },
  },
  { timestamps: true }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, signal: 1 }, { unique: true });

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);