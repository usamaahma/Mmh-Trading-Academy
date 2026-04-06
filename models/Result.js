import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Result title is required"],
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    // 2 Images ke liye separate fields (Best if specific usage)
    imageOne: {
        type: String, // Cloudinary URL ya path
        default: ""
    },
    imageTwo: {
        type: String, 
        default: ""
    },
    // Ya phir images ka array (More flexible approach)
    /* images: {
        type: [String],
        validate: [val => val.length <= 2, 'Max 2 images allowed']
    }, 
    */
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Agar model pehle se bana hua hai toh wahi use kare, warna naya banaye
export default mongoose.models.Result || mongoose.model("Result", ResultSchema);