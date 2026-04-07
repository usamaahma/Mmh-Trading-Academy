import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false, // Optional
      trim: true,
    },
    email: {
      type: String,
      required: false, // Optional
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"], // Sirf ye lazmi (required) hai
      trim: true,
    },
    course: {
      type: String,
      required: false, // Optional
      trim: true,
    },
    message: {
      type: String,
      required: false, // Optional
      trim: true,
    },
    status: {
      type: String,
      default: "Pending", // Admin status tracking ke liye
    },
    isRead: {
      type: Boolean,
      default: false, // New lead hamesha Unread (false) hogi
    },
  },
  { 
    // Is se 'createdAt' aur 'updatedAt' khud ba khud ban jayenge
    timestamps: true 
  }
);

// Next.js singleton pattern: Agar model pehle se bana hai to wahi use karo, warna naya banao
const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export default Lead;