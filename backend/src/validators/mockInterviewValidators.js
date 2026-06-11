import { body, param } from "express-validator";

export const createInterviewValidation = [
  body("interviewType")
    .trim()
    .notEmpty()
    .withMessage("Interview type is required"),

  body("resumeId")
    .trim()
    .notEmpty()
    .withMessage("Resume ID is required"),

  body("jobDescription")
    .trim()
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 20 })
    .withMessage(
      "Job description must be at least 20 characters"
    ),
];

export const submitAnswerValidation = [
  param("interviewId")
    .notEmpty()
    .withMessage("Interview ID is required"),

  body("questionId")
    .notEmpty()
    .withMessage("Question ID is required"),

  body("answer")
    .trim()
    .notEmpty()
    .withMessage("Answer is required")
    .isLength({ min: 5 })
    .withMessage(
      "Answer must be at least 5 characters long"
    ),
];

export const interviewIdValidation = [
  param("interviewId")
    .notEmpty()
    .withMessage("Interview ID is required"),
];