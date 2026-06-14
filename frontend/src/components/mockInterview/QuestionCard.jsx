 

import React from "react";

const QuestionCard = ({
  questionText,
  currentQuestion,
  totalQuestions,
  category,
  difficulty,
}) => {
  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#05070D] p-6 md:p-8 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            Question {currentQuestion} of {totalQuestions}
          </h2>

          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <span className="rounded-full border border-[#19B8AA]/30 bg-[#19B8AA]/10 px-3 py-1 text-xs font-medium text-[#19B8AA] capitalize">
                {category}
              </span>
            )}

            {difficulty && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 capitalize">
                {difficulty}
              </span>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="py-4">
          <p className="text-lg md:text-2xl font-medium leading-relaxed text-white">
            {questionText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

