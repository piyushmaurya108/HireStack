import mongoose from "mongoose";

const mockInterviewResponseSchema = new mongoose.Schema(
  {
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MockInterview",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    feedback: {
      type: String,
      default: "",
    },

    technicalScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    communicationScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    confidenceScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    strengths: {
      type: [String],
      default: [],
    },

    improvements: {
      type: [String],
      default: [],
    },

    responseDuration: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

mockInterviewResponseSchema.index({ interview: 1 });
mockInterviewResponseSchema.index({ questionId: 1 });

export default mongoose.model(
  "MockInterviewResponse",
  mockInterviewResponseSchema
);
