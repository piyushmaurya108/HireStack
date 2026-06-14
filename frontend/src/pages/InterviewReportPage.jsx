import React from "react";
import { useParams } from "react-router" ;
import { Loader2 } from "lucide-react";

import { useInterviewReport } from "../hooks/mockInterview/useInterviewReport";

import InterviewScoreCard from "../components/mockInterview/InterviewScoreCard";
import SkillsBreakdown from "../components/mockInterview/SkillsBreakdown";
import StrengthsCard from "../components/mockInterview/StrengthsCard";
import WeaknessesCard from "../components/mockInterview/WeaknessesCard";
import RecommendationsCard from "../components/mockInterview/RecommendationsCard";
import QuestionBreakdownTable from "../components/mockInterview/QuestionBreakdownTable";

const InterviewReportPage = () => {
  const { interviewId } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useInterviewReport(interviewId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070D]">
        <Loader2 className="h-10 w-10 animate-spin text-[#19B8AA]" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
        Failed to load interview report.
      </div>
    );
  }

  const report = data.report || {};

  const responses = data.responses || [];

  const overallScore =
    data.overallScore ||
    report.overallScore ||
    0;

  const technicalScore =
    report.technical || 0;

  const communicationScore =
    report.communication || 0;

  const confidenceScore =
    report.confidence || 0;

  const strengths =
    report.strengths || [];

  const weaknesses =
    report.weaknesses || [];

  const recommendations =
    report.recommendations || [];

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Interview Report
          </h1>

          <p className="mt-3 text-gray-400">
            Detailed AI analysis of your
            mock interview performance.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <InterviewScoreCard
            overallScore={overallScore}
          />

          <div className="lg:col-span-2">
            <SkillsBreakdown
              technicalScore={
                technicalScore
              }
              communicationScore={
                communicationScore
              }
              confidenceScore={
                confidenceScore
              }
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <StrengthsCard
            strengths={strengths}
          />

          <WeaknessesCard
            weaknesses={weaknesses}
          />
        </div>

        <div className="mt-8">
          <RecommendationsCard
            recommendations={
              recommendations
            }
          />
        </div>

        <div className="mt-8">
          <QuestionBreakdownTable
            responses={responses}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewReportPage;