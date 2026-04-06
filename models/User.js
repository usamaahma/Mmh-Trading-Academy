// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["ADMIN", "STUDENT"], // Public ko login ki zaroorat nahi hogi
    default: "STUDENT" 
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);