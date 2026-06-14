import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../lib/env.js";

const genAI = new GoogleGenerativeAI(
  ENV.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function generateContent(prompt) {
  const result =
    await model.generateContent(prompt);

  return result.response.text();
}

export async function analyzeResume(
  resumeText
) {
  const prompt = `
Analyze the following resume.

Return:

1. Candidate Summary
2. Skills
3. Projects
4. Experience Level
5. Strengths
6. Weaknesses

Resume:

${resumeText}
`;

  return generateContent(prompt);
}

export async function analyzeJobDescription(
  jobDescription
) {
  const prompt = `
Analyze this Job Description.

Return:

1. Required Skills
2. Experience Required
3. Key Technologies
4. Interview Focus Areas

Job Description:

${jobDescription}
`;

  return generateContent(prompt);
}

export async function generateInterviewQuestions({
  resumeAnalysis,
  jobDescription,
  interviewType,
  questionCount = 10,
}) {
  const prompt = `
Generate ${questionCount} interview questions.

Interview Type:
${interviewType}

Resume Analysis:
${resumeAnalysis}

Job Description:
${jobDescription}

IMPORTANT:

Return ONLY valid JSON.

DO NOT use markdown.

DO NOT use \`\`\`json.

DO NOT use \`\`\`.

DO NOT add explanations.

DO NOT add headings.

DO NOT add notes.

Output MUST start with [

Output MUST end with ]

Every question MUST contain ALL fields below.

Allowed category values ONLY:

technical
behavioral
project
hr
communication

Allowed difficulty values ONLY:

easy
medium
hard

sequenceNumber MUST start from 1.

Example:

[
  {
    "questionText": "Explain React Virtual DOM.",
    "category": "technical",
    "difficulty": "medium",
    "sequenceNumber": 1
  },
  {
    "questionText": "Describe a challenging project.",
    "category": "project",
    "difficulty": "medium",
    "sequenceNumber": 2
  }
]

Generate exactly ${questionCount} questions.
`;

  return generateContent(prompt);
}

export async function evaluateAnswer({
  question,
  answer,
}) {
  const prompt = `
Evaluate this interview answer.

Question:
${question}

Answer:
${answer}

Return ONLY valid JSON.

{
  "technicalScore": 0,
  "communicationScore": 0,
  "confidenceScore": 0,
  "overallScore": 0,
  "feedback": "",
  "strengths": [],
  "improvements": []
}
`;

  return generateContent(prompt);
}

export async function generateFinalReport(
  data
) {
  const prompt = `
Generate final interview report.

Interview Data:

${JSON.stringify(data)}

Return ONLY valid JSON.

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "confidenceScore": 0,
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "hiringRecommendation": "",
  "summary": ""
}
`;

  return generateContent(prompt);
}