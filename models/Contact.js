import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Naam likhna zaroori hai bhai"] 
  },
  email: { 
    type: String, 
    required: [true, "Email ke bagair rabta kaise hoga?"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Valid email daalo"]
  },
  subject: { 
    type: String, 
    required: true,
    enum: ["SUPPORT", "BUSINESS", "FEEDBACK", "OTHER"],
    default: "SUPPORT"
  },
  message: { 
    type: String, 
    required: true,
  },
  status: {
    type: String,
    enum: ["READ", "UNREAD", "REPLIED"],
    default: "UNREAD"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
