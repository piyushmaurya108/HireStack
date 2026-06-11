import MockInterview from "../models/MockInterview.js";
import Resume from "../models/Resume.js";

import {
  analyzeResume,
  analyzeJobDescription,
  generateInterviewQuestions,
} from "./geminiService.js";

export async function createInterviewWorkflow({
  userId,
  resumeId,
  interviewType,
  jobDescription,
}) {
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new Error("Resume not found");
  }

  const resumeAnalysis = await analyzeResume(
    resume.extractedText
  );

  const jdAnalysis = await analyzeJobDescription(
    jobDescription
  );

  const generatedQuestions = await generateInterviewQuestions({
    resumeAnalysis,
    jobDescription,
    interviewType,
    questionCount: 10,
  });

  let questions = [];

  try {
    questions = JSON.parse(generatedQuestions);
  } catch {
    questions = [];
  }

  const interview = await MockInterview.create({
    user: userId,
    resume: resume._id,
    interviewType,
    jobDescription,
    resumeAnalysis,
    jdAnalysis,
    questions,
    totalQuestions: questions.length,
    status: "ready",
  });

  return interview;
}

export async function getCurrentQuestion(interviewId) {
  const interview = await MockInterview.findById(
    interviewId
  );

  if (!interview) {
    throw new Error("Interview not found");
  }

  const currentQuestion =
    interview.questions[
      interview.currentQuestionIndex
    ];

  return {
    currentQuestion,
    currentQuestionIndex:
      interview.currentQuestionIndex,
    remainingQuestions:
      interview.totalQuestions -
      interview.currentQuestionIndex -
      1,
  };
}