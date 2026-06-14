import React from "react";
import { CheckCircle2 } from "lucide-react";

const StrengthsCard = ({
  strengths = [],
}) => {
  return (
    <div className="rounded-3xl border border-green-500/20 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(34,197,94,0.08)]">
      <div className="mb-5 flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-green-400" />

        <h3 className="text-lg font-semibold text-white">
          Strengths
        </h3>
      </div>

      {strengths.length === 0 ? (
        <p className="text-gray-400">
          No strengths available.
        </p>
      ) : (
        <ul className="space-y-3">
          {strengths.map(
            (strength, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <div className="mt-2 h-2 w-2 rounded-full bg-green-400" />

                <span className="text-gray-300">
                  {strength}
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default StrengthsCard;