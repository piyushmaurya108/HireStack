 import React from "react";

const QuestionProgress = ({
  currentQuestion,
  totalQuestions,
}) => {
  const percentage =
    totalQuestions > 0
      ? (currentQuestion / totalQuestions) *
        100
      : 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Progress
        </span>

        <span className="text-sm font-medium text-[#19B8AA]">
          {currentQuestion}/{totalQuestions}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#19B8AA] transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default QuestionProgress;