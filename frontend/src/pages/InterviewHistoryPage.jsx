import React from "react";
import { Link } from "react-router";
import {
  History,
  Trophy,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { useInterviewHistory } from "../hooks/mockInterview/useInterviewHistory";

const InterviewHistoryPage = () => {
  const {
    data,
    isLoading,
    isError,
  } = useInterviewHistory();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070D]">
        <Loader2 className="h-10 w-10 animate-spin text-[#19B8AA]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070D] text-white">
        Failed to load interview history.
      </div>
    );
  }

  const interviews =
    data?.interviews || [];

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 flex items-center gap-3">
          <History className="h-8 w-8 text-[#19B8AA]" />

          <div>
            <h1 className="text-4xl font-bold">
              Interview History
            </h1>

            <p className="mt-2 text-gray-400">
              Review all your previous AI
              mock interviews and reports.
            </p>
          </div>
        </div>

        {interviews.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-12 text-center">
            <h2 className="text-2xl font-semibold">
              No Interviews Found
            </h2>

            <p className="mt-3 text-gray-400">
              Complete your first mock
              interview to see history here.
            </p>

            <Link
              to="/mock-interview/create"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#19B8AA] px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Start Interview
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {interviews.map(
              (interview) => (
                <div
                  key={interview._id}
                  className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-[#19B8AA]/20 bg-[#19B8AA]/10 px-3 py-1 text-sm font-medium text-[#19B8AA] capitalize">
                          {
                            interview.interviewType
                          }
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
                            interview.status ===
                            "completed"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {
                            interview.status
                          }
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-gray-400">
                        <Calendar className="h-4 w-4" />

                        <span>
                          {new Date(
                            interview.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Trophy className="h-5 w-5 text-[#19B8AA]" />

                          <span className="text-2xl font-bold text-[#19B8AA]">
                            {
                              interview.overallScore
                            }
                          </span>
                        </div>

                        <p className="text-xs text-gray-400">
                          Overall Score
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="font-semibold text-white">
                            {interview
                              ?.report
                              ?.technical ??
                              "-"}
                          </div>

                          <p className="text-xs text-gray-400">
                            Technical
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="font-semibold text-white">
                            {interview
                              ?.report
                              ?.communication ??
                              "-"}
                          </div>

                          <p className="text-xs text-gray-400">
                            Communication
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="font-semibold text-white">
                            {interview
                              ?.report
                              ?.confidence ??
                              "-"}
                          </div>

                          <p className="text-xs text-gray-400">
                            Confidence
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/mock-interview/report/${interview._id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-[#19B8AA]/30 px-5 py-3 font-medium text-[#19B8AA] transition hover:bg-[#19B8AA]/10"
                      >
                        View Report
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default InterviewHistoryPage;