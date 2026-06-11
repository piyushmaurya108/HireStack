import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../lib/env.js";

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);

  return result.response.text();
}

export async function analyzeResume(resumeText) {
  const prompt = `
Analyze the following resume.

Return:
1. Candidate summary
2. Skills
3. Projects
4. Experience level
5. Strengths
6. Weaknesses

Resume:

${resumeText}
`;

  return generateContent(prompt);
}

export async function analyzeJobDescription(jobDescription) {
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

Return ONLY JSON array:

[
 {
   "questionText":"",
   "category":"",
   "difficulty":""
 }
]
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

Return JSON:

{
 "technicalScore":0-100,
 "communicationScore":0-100,
 "confidenceScore":0-100,
 "overallScore":0-100,
 "feedback":"",
 "strengths":[],
 "improvements":[]
}
`;

  return generateContent(prompt);
}

export async function generateFinalReport(data) {
  const prompt = `
Generate final interview report.

Interview Data:

${JSON.stringify(data)}

Return JSON:

{
 "overallScore":0,
 "technicalScore":0,
 "communicationScore":0,
 "confidenceScore":0,
 "strengths":[],
 "weaknesses":[],
 "recommendations":[],
 "hiringRecommendation":"",
 "summary":""
}
`;

  return generateContent(prompt);
}