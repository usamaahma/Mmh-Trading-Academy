import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    youtubeThumbnail: { type: String, default: "" },
    youtubeLink: { type: String, default: "" },
    megaLink: { type: String, default: "" },
});

const FaqSchema = new mongoose.Schema({
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
});

const CourseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    sections: [SectionSchema],
    faqs: [FaqSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update timestamp
CourseSchema.pre("save", function () {
    this.updatedAt = Date.now();
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);