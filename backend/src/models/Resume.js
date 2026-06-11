import mongoose from "mongoose";
const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    cloudinaryUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    parsedSkills: {
      type: [String],
      default: [],
    },

    parsedProjects: {
      type: [String],
      default: [],
    },

    parsedExperience: {
      type: String,
      default: "",
    },

    parsedEducation: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["uploaded", "processed", "failed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

resumeSchema.index({ user: 1 });
resumeSchema.index({ createdAt: -1 });

export default mongoose.model("Resume", resumeSchema);