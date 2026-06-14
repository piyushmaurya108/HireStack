
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "technical",
        "behavioral",
        "project",
        "hr",
        "communication",
      ],
      default: "technical",
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    sequenceNumber: {
    type: Number,
    default: 1,
    },
  },
  { _id: true }
);

const reportSchema = new mongoose.Schema(
  {
    overallScore: {
      type: Number,
      default: 0,
    },

    technicalScore: {
      type: Number,
      default: 0,
    },

    communicationScore: {
      type: Number,
      default: 0,
    },

    confidenceScore: {
      type: Number,
      default: 0,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    hiringRecommendation: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const mockInterviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    interviewType: {
      type: String,
      enum: [
        "software-engineer",
        "frontend",
        "backend",
        "fullstack",
        "data-structures",
        "hr",
        "custom",
      ],
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    resumeAnalysis: {
      type: String,
      default: "",
    },

    jdAnalysis: {
      type: String,
      default: "",
    },

    questions: {
  type: [questionSchema],
  default: [],
  validate: {
    validator: (v) => v.length > 0,
    message:
      "Interview must contain at least one question",
  },
},

   totalQuestions: {
  type: Number,
  default: 0,
  min: 1,
},

    currentQuestionIndex: {
      type: Number,
      default: 0,
    },

    completedQuestions: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "ready",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "ready",
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    report: {
      type: reportSchema,
      default: () => ({}),
    },

    startedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

mockInterviewSchema.index({ user: 1 });
mockInterviewSchema.index({ status: 1 });
mockInterviewSchema.index({ createdAt: -1 });

export default mongoose.model("MockInterview", mockInterviewSchema);