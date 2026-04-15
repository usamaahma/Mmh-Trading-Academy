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
    enum: ["ADMIN", "STUDENT"],
    default: "STUDENT"
  },
  // 👇 Yeh field add kiya gaya hai courses ki access control karne ke liye
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course" // Yeh "Course" aapke Course model ka naam hona chahiye
    }
  ],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);