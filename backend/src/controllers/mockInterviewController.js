import fs from "fs";

import Resume from "../models/Resume.js";
import MockInterview from "../models/MockInterview.js";
import MockInterviewResponse from "../models/MockInterviewResponse.js";
 import { uploadResumeToCloudinary } from "../lib/cloudinary.js";

import { processResume } from "../services/resumeParserService.js";
import {
  createInterviewWorkflow,
  getCurrentQuestion as getCurrentQuestionService,
} from "../services/interviewService.js";

import { evaluateAnswer } from "../services/geminiService.js";
import { generateInterviewReport } from "../services/reportService.js";

/**
 * Upload resume
 * Uploads file to Cloudinary
 * Extracts text
 * Stores resume in MongoDB
 */
export async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const uploadResult = await uploadResumeToCloudinary(
      req.file.path
    );

    const processedResume = await processResume(
      req.file.path,
      req.file.originalname
    );

    const resume = await Resume.create({
      user: req.user._id,
      originalFileName: req.file.originalname,
      fileType: processedResume.fileType,
      fileSize: req.file.size,
      cloudinaryUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      extractedText: processedResume.extractedText,
      parsedSkills:
        processedResume.metadata?.detectedSkills || [],
      status: "processed",
    });

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("uploadResume error:", error);

    return res.status(500).json({
      message: "Failed to upload resume",
    });
  }
}

/**
 * Create interview
 * Generates resume analysis
 * Generates questions
 * Creates interview record
 */
export async function createInterview(req, res) {
  try {
    const {
      interviewType,
      resumeId,
      jobDescription,
    } = req.body;

    const interview =
      await createInterviewWorkflow({
        userId: req.user._id,
        resumeId,
        interviewType,
        jobDescription,
      });

    return res.status(201).json({
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error("createInterview error:", error);

    return res.status(500).json({
      message: error.message || "Failed to create interview",
    });
  }
}

/**
 * Returns current active question
 */
export async function getCurrentQuestion(req, res) {
  try {
    const { interviewId } = req.params;

    const data =
      await getCurrentQuestionService(interviewId);

    return res.status(200).json(data);
  } catch (error) {
    console.error("getCurrentQuestion error:", error);

    return res.status(500).json({
      message:
        error.message ||
        "Failed to fetch current question",
    });
  }
}

/**
 * Submit answer
 * Evaluate using Gemini
 * Store evaluation
 * Advance question pointer
 */
export async function submitAnswer(req, res) {
  try {
    const { interviewId } = req.params;

    const { questionId, answer } = req.body;

    const interview =
      await MockInterview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const question = interview.questions.find(
      (q) => q._id.toString() === questionId
    );

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const evaluationResult = await evaluateAnswer({
      question: question.questionText,
      answer,
    });

    let evaluation;

    try {
      evaluation = JSON.parse(evaluationResult);
    } catch {
      evaluation = {
        technicalScore: 0,
        communicationScore: 0,
        confidenceScore: 0,
        overallScore: 0,
        feedback: evaluationResult,
        strengths: [],
        improvements: [],
      };
    }

    const response =
      await MockInterviewResponse.create({
        interview: interview._id,
        questionId: question._id,
        questionText: question.questionText,
        answer,
        feedback: evaluation.feedback,
        technicalScore:
          evaluation.technicalScore || 0,
        communicationScore:
          evaluation.communicationScore || 0,
        confidenceScore:
          evaluation.confidenceScore || 0,
        overallScore:
          evaluation.overallScore || 0,
        strengths: evaluation.strengths || [],
        improvements:
          evaluation.improvements || [],
      });

    interview.completedQuestions += 1;

    if (
      interview.currentQuestionIndex <
      interview.totalQuestions - 1
    ) {
      interview.currentQuestionIndex += 1;
    }

    await interview.save();

    return res.status(201).json({
      message: "Answer submitted successfully",
      response,
      interviewCompleted:
        interview.completedQuestions >=
        interview.totalQuestions,
    });
  } catch (error) {
    console.error("submitAnswer error:", error);

    return res.status(500).json({
      message: "Failed to submit answer",
    });
  }
}

/**
 * Complete interview
 * Generate final report
 */
export async function completeInterview(req, res) {
  try {
    const { interviewId } = req.params;

    const report =
      await generateInterviewReport(interviewId);

    return res.status(200).json({
      message: "Interview completed successfully",
      report,
    });
  } catch (error) {
    console.error("completeInterview error:", error);

    return res.status(500).json({
      message: "Failed to complete interview",
    });
  }
}

/**
 * Fetch interview report
 */
export async function getInterviewReport(
  req,
  res
) {
  try {
    const { interviewId } = req.params;

    const interview =
      await MockInterview.findById(interviewId)
        .populate("resume")
        .populate("user");

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const responses =
      await MockInterviewResponse.find({
        interview: interviewId,
      });

    return res.status(200).json({
      report: interview.report,
      overallScore: interview.overallScore,
      interview,
      responses,
    });
  } catch (error) {
    console.error(
      "getInterviewReport error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch report",
    });
  }
}


export async function getInterviewHistory(
  req,
  res
) {
  try {
    const interviews =
      await MockInterview.find({
        user: req.user._id,
      })
        .select(
          "_id interviewType overallScore status createdAt report"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      interviews,
    });
  } catch (error) {
    console.error(
      "getInterviewHistory error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch interview history",
    });
  }
}

