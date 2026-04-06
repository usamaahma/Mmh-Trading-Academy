import mongoose from "mongoose";

const SubheadingSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
  },
  { _id: false },
);

const SectionSchema = new mongoose.Schema({
  heading: { type: String, default: "" },
  subheadings: [SubheadingSchema],
  description: { type: String, default: "" },
  youtubeThumbnail: { type: String, default: "" },
  youtubeLink: { type: String, default: "" },
  megaLink: { type: String, default: "" },
});

const FaqSchema = new mongoose.Schema({
  question: { type: String, default: "" },
  answer: { type: String, default: "" },
});

const CourseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    sections: [SectionSchema],
    faqs: [FaqSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { minimize: false },
);

// FIXED MIDDLEWARE: Remove 'next' parameter
CourseSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

// Purane models ko clear kar ke naya export karein
const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);
export default Course;
