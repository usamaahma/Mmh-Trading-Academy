import mongoose from "mongoose";

const thcAlertEventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true },
    payloadHash: { type: String, required: true },
    alertType: { type: String, enum: ["NEW_THC", "FAILED_THC_REVERSED"] },
    symbol: { type: String },
    timeframe: { type: String, enum: ["M30", "H1", "H4", "D1"] },
    direction: { type: String, enum: ["LONG", "SHORT"] },
    entry: { type: Number },
    sl: { type: Number },
    tp: { type: Number },
  },
  { timestamps: true }
);

thcAlertEventSchema.index({ eventId: 1 }, { unique: true });
thcAlertEventSchema.index({ createdAt: -1 });

export default mongoose.models.ThcAlertEvent ||
  mongoose.model("ThcAlertEvent", thcAlertEventSchema);
