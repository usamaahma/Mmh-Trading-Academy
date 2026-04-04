import mongoose from "mongoose";

// SEO Schema (Wahi rahega)

const signalSchema = new mongoose.Schema(
  {
    pair: { type: String, required: true, uppercase: true }, // e.g., XAUUSD, BTC/USDT
    heading: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String }, // Chart screenshot URL

    // 🔹 CATEGORIES (Flexible)
    category: {
      type: String,
      required: true,
      uppercase: true,
      // Enum hata diya taake kal ko koi nai category aye to masla na ho
    },

    // 🔹 STRATEGY (Scalping, Spot, Future, Intra Day etc.)
    strategy: {
      type: String,
      required: true,
      uppercase: true,
      // Yahan se Enum hata diya hai taake tumhari saari unique sub-categories (Spot, Future, Analysis) save ho saken
    },

    // 🔹 TRADE DATA
    type: {
      type: String,
      required: true,
      uppercase: true,
      enum: ["BUY", "SELL"] // Ye fix hi rehta hai trading mein
    },

    // Entry, SL, TP ko String mein rakha hai kyunke Forex/Crypto mein decimal points ka masla hota hai (e.g. 0.0000123)
    entryPrice: { type: String, required: true },
    stopLoss: { type: String, required: true },
    takeProfits: [{ type: String }], // Array of TPs as Strings for precision

    // 🔹 STATUS
    status: {
      type: String,
      default: "ACTIVE",
      uppercase: true,
      // Mazeed status options add kar diye hain
      enum: ["ACTIVE", "HIT_TP", "HIT_SL", "CLOSED", "PENDING"]
    },

  },
  { timestamps: true }
);

export default mongoose.models.Signal || mongoose.model("Signal", signalSchema);