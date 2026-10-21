import mongoose from "mongoose";

const thcEmailDeliverySchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true },
    recipient: { type: String, required: true, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ["PENDING", "SENDING", "DELIVERED", "FAILED"],
      default: "PENDING",
      required: true,
    },
    attempts: { type: Number, default: 0 },
    claimedAt: { type: Date, default: null },
    deliveredAt: { type: Date, default: null },
    lastError: { type: String, default: null },
  },
  { timestamps: true }
);

thcEmailDeliverySchema.index({ eventId: 1, recipient: 1 }, { unique: true });
// Delivery records expire together with their alerts (30 days).
thcEmailDeliverySchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

export default mongoose.models.ThcEmailDelivery ||
  mongoose.model("ThcEmailDelivery", thcEmailDeliverySchema);
