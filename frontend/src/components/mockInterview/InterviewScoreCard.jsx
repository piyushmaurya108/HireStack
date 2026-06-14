import React from "react";
import { Trophy } from "lucide-react";

const InterviewScoreCard = ({
  overallScore = 0,
}) => {
  const scoreColor =
    overallScore >= 80
      ? "text-green-400"
      : overallScore >= 60
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <div className="flex items-center gap-3">
        <Trophy className="h-6 w-6 text-[#19B8AA]" />

        <h3 className="text-lg font-semibold text-white">
          Overall Interview Score
        </h3>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">
        <div
          className={`text-6xl font-bold ${scoreColor}`}
        >
          {overallScore}
        </div>

        <div className="mt-2 text-gray-400">
          out of 100
        </div>
      </div>
    </div>
  );
};

export default InterviewScoreCard;