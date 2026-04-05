import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["FOREX", "STOCKS", "CRYPTO"], 
    default: "FOREX" 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Analysis || mongoose.model("Analysis", AnalysisSchema);