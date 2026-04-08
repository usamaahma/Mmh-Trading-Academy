import mongoose from "mongoose";

const LandingSchema = new mongoose.Schema(
  {
    // Global PnL value
    pnl: { type: String, required: true },

    // Section 1: Multiple Charts/Analysis entries
    analysisSection: [
      {
        landingChart: { type: String }, // Image URL or Link
        pair: { type: String },         // e.g., "XAUUSD"
        profit: { type: String },       // e.g., "+$500"
        reason: { type: String },       // Trade logic
      },
    ],

    // Section 2: Watchlist & Trade Setups
    watchlist: [
      {
        pairName: { type: String },     // Watchlist pair
        entryPrice: { type: String },   // Entry point
        shortDesc: { type: String },    // Setup description
      },
    ],

    // Section 3: Economic News
    highImpactNews: [
      {
        newsTitle: { type: String },    // e.g., "CPI Data"
        newsTime: { type: String },     // e.g., "6:30 PM"
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Landing || mongoose.model("Landing", LandingSchema);