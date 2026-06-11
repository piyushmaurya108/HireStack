import MockInterviewResponse from "../models/MockInterviewResponse.js";

export async function calculateInterviewScores(
  interviewId
) {
  const responses =
    await MockInterviewResponse.find({
      interview: interviewId,
    });

  if (!responses.length) {
    return {
      overallScore: 0,
      technicalScore: 0,
      communicationScore: 0,
      confidenceScore: 0,
    };
  }

  const technicalScore =
    responses.reduce(
      (sum, item) => sum + item.technicalScore,
      0
    ) / responses.length;

  const communicationScore =
    responses.reduce(
      (sum, item) =>
        sum + item.communicationScore,
      0
    ) / responses.length;

  const confidenceScore =
    responses.reduce(
      (sum, item) => sum + item.confidenceScore,
      0
    ) / responses.length;

  const overallScore =
    responses.reduce(
      (sum, item) => sum + item.overallScore,
      0
    ) / responses.length;

  return {
    technicalScore: Math.round(
      technicalScore
    ),
    communicationScore: Math.round(
      communicationScore
    ),
    confidenceScore: Math.round(
      confidenceScore
    ),
    overallScore: Math.round(
      overallScore
    ),
  };
}