import React from "react";
const QuestionBreakdownTable = ({
  responses = [],
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#05070D] shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <div className="border-b border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white">
          Question Breakdown
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-white/10 bg-[#0B0F19]">
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-400">
                Question
              </th>

              <th className="px-4 py-4 text-left text-sm font-medium text-gray-400">
                Answer
              </th>

              <th className="px-4 py-4 text-left text-sm font-medium text-gray-400">
                Feedback
              </th>

              <th className="px-4 py-4 text-center text-sm font-medium text-gray-400">
                Score
              </th>
            </tr>
          </thead>

          <tbody>
            {responses.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No responses available
                </td>
              </tr>
            ) : (
              responses.map((response) => (
                <tr
                  key={response._id}
                  className="border-b border-white/5"
                >
                  <td className="max-w-xs px-4 py-4 text-sm text-white">
                    {response.questionText}
                  </td>

                  <td className="max-w-sm px-4 py-4 text-sm text-gray-300">
                    {response.answer}
                  </td>

                  <td className="max-w-sm px-4 py-4 text-sm text-gray-400">
                    {response.feedback}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span className="rounded-full bg-[#19B8AA]/10 px-3 py-1 text-sm font-semibold text-[#19B8AA]">
                      {response.overallScore}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionBreakdownTable;

