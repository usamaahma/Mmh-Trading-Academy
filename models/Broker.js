import mongoose from "mongoose";

const BrokerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Broker name is required"],
        trim: true 
    },
    link: { 
        type: String, 
        required: [true, "Affiliate or Website link is required"],
        trim: true 
    },
    // Category selection with fixed options
    category: {
        type: String,
        required: true,
        enum: [
            "Low Spread Brokers",
            "Best For News Trading Brokers",
            "Best For Crypto Trading Brokers",
            "Deposit Bonus Brokers"
        ],
        default: "Low Spread Brokers"
    },
    logo: {
        type: String, // Public folder path ya Cloudinary URL ke liye
        default: ""
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Agar model pehle se bana hua hai toh wahi use kare, warna naya banaye
export default mongoose.models.Broker || mongoose.model("Broker", BrokerSchema);