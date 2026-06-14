
import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import uploadMiddleware from "../middleware/uploadMiddleware.js";
import validateMockInterview from "../middleware/validateMockInterview.js";

import {
  createInterviewValidation,
  submitAnswerValidation,
  interviewIdValidation,
} from "../validators/mockInterviewValidators.js";

import {
  uploadResume,
  createInterview,
  getCurrentQuestion,
  submitAnswer,
  completeInterview,
  getInterviewReport,
  getInterviewHistory,
} from "../controllers/mockInterviewController.js";

const router = express.Router();

/**
 * GET /api/mock/history
 * Fetch user interview history
 */
router.get(
  "/history",
  protectRoute,
  getInterviewHistory
);

/**
 * POST /api/mock/upload-resume
 * Upload PDF/DOCX resume
 */
router.post(
  "/upload-resume",
  protectRoute,
  uploadMiddleware,
  uploadResume
);

/**
 * POST /api/mock/create
 * Create interview and generate questions
 */
router.post(
  "/create",
  protectRoute,
  createInterviewValidation,
  validateMockInterview,
  createInterview
);

/**
 * GET /api/mock/:interviewId/question
 * Get current active question
 */
router.get(
  "/:interviewId/question",
  protectRoute,
  interviewIdValidation,
  validateMockInterview,
  getCurrentQuestion
);

/**
 * POST /api/mock/:interviewId/answer
 * Submit answer and evaluate response
 */
router.post(
  "/:interviewId/answer",
  protectRoute,
  submitAnswerValidation,
  validateMockInterview,
  submitAnswer
);

/**
 * POST /api/mock/:interviewId/complete
 * Complete interview and generate report
 */
router.post(
  "/:interviewId/complete",
  protectRoute,
  interviewIdValidation,
  validateMockInterview,
  completeInterview
);

/**
 * GET /api/mock/report/:interviewId
 * Fetch final interview report
 */
router.get(
  "/report/:interviewId",
  protectRoute,
  interviewIdValidation,
  validateMockInterview,
  getInterviewReport
);

export default router;

