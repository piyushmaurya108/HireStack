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

  const generatedQuestions =
    await generateInterviewQuestions({
      resumeAnalysis,
      jobDescription,
      interviewType,
      questionCount: 10,
    });

  let questions = [];

  try {
    console.log(
      "Generated Questions Raw:",
      generatedQuestions
    );

    const cleaned = generatedQuestions
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(
      "Generated Questions Cleaned:",
      cleaned
    );

    const parsedQuestions =
      JSON.parse(cleaned);

    console.log(
      "Parsed Questions:",
      parsedQuestions
    );

    questions = parsedQuestions.map(
      (q, index) => ({
        questionText:
          q.questionText ||
          q.question ||
          "No question provided",

        category:
          mapCategory(q.category),

        difficulty:
          mapDifficulty(q.difficulty),

        sequenceNumber: index + 1,
      })
    );

    console.log(
      "Questions Before Save:",
      questions
    );
  } catch (error) {
    console.error(
      "Question parsing failed:"
    );

    console.error(
      "Raw Gemini Response:",
      generatedQuestions
    );

    console.error(error);

    throw new Error(
      "Failed to parse generated interview questions"
    );
  }

  if (
    !questions ||
    questions.length === 0
  ) {
    throw new Error(
      "No interview questions were generated"
    );
  }

  const payload = {
    user: userId,
    resume: resume._id,
    interviewType,
    jobDescription,
    resumeAnalysis,
    jdAnalysis,
    questions,
    totalQuestions:
      questions.length,
    status: "ready",
  };

  console.log(
    "MockInterview Payload:",
    JSON.stringify(
      payload,
      null,
      2
    )
  );

  const interview =
    await MockInterview.create(
      payload
    );

  return interview;
}
export async function getCurrentQuestion(
interviewId
) {
const interview =
await MockInterview.findById(
interviewId
);

if (!interview) {
throw new Error(
"Interview not found"
);
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

function mapCategory(category) {
  const value =
    category?.toLowerCase() || "";

  if (
    value.includes("behavioral") ||
    value.includes("problem solving")
  ) {
    return "behavioral";
  }

  if (
    value.includes("project")
  ) {
    return "project";
  }

  if (
    value.includes("hr")
  ) {
    return "hr";
  }

  if (
    value.includes("communication")
  ) {
    return "communication";
  }

  return "technical";
}

function mapDifficulty(
  difficulty
) {
  const value =
    difficulty?.toLowerCase() ||
    "";

  if (value === "easy")
    return "easy";

  if (value === "hard")
    return "hard";

  return "medium";
}