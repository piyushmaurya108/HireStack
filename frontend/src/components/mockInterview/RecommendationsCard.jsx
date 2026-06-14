import React from "react";
import { Lightbulb } from "lucide-react";
const RecommendationsCard = ({
  recommendations = [],
}) => {
  return (
    <div className="rounded-3xl border border-[#19B8AA]/20 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <div className="mb-5 flex items-center gap-3">
        <Lightbulb className="h-6 w-6 text-[#19B8AA]" />

        <h3 className="text-lg font-semibold text-white">
          Recommendations
        </h3>
      </div>

      {recommendations.length === 0 ? (
        <p className="text-gray-400">
          No recommendations available.
        </p>
      ) : (
        <ul className="space-y-3">
          {recommendations.map(
            (recommendation, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <div className="mt-2 h-2 w-2 rounded-full bg-[#19B8AA]" />

                <span className="text-gray-300">
                  {recommendation}
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default RecommendationsCard;

