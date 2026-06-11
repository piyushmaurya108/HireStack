import MockInterview from "../models/MockInterview.js";
import MockInterviewResponse from "../models/MockInterviewResponse.js";

import { calculateInterviewScores } from "./scoringService.js";
import { generateFinalReport } from "./geminiService.js";

export async function generateInterviewReport(
  interviewId
) {
  const interview =
    await MockInterview.findById(interviewId);

  if (!interview) {
    throw new Error("Interview not found");
  }

  const responses =
    await MockInterviewResponse.find({
      interview: interviewId,
    });

  const scoreSummary =
    await calculateInterviewScores(
      interviewId
    );

  const reportResponse =
    await generateFinalReport({
      interview,
      responses,
      scoreSummary,
    });

  let report = {};

  try {
    report = JSON.parse(reportResponse);
  } catch {
    report = {
      ...scoreSummary,
      strengths: [],
      weaknesses: [],
      recommendations: [],
      hiringRecommendation: "",
      summary: reportResponse,
    };
  }

  interview.report = report;
  interview.overallScore =
    report.overallScore || 0;
  interview.status = "completed";
  interview.completedAt = new Date();

  await interview.save();

  return report;
}