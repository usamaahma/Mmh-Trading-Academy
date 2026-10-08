import mongoose from "mongoose";

const thcAlertEventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true },
    payloadHash: { type: String, required: true },
  },
  { timestamps: true }
);

thcAlertEventSchema.index({ eventId: 1 }, { unique: true });

export default mongoose.models.ThcAlertEvent ||
  mongoose.model("ThcAlertEvent", thcAlertEventSchema);
