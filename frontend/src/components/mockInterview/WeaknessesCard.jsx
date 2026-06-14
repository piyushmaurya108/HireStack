import React from "react";
import { AlertTriangle } from "lucide-react";

const WeaknessesCard = ({
  weaknesses = [],
}) => {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(239,68,68,0.08)]">
      <div className="mb-5 flex items-center gap-3">
        <AlertTriangle className="h-6 w-6 text-red-400" />

        <h3 className="text-lg font-semibold text-white">
          Areas For Improvement
        </h3>
      </div>

      {weaknesses.length === 0 ? (
        <p className="text-gray-400">
          No weaknesses available.
        </p>
      ) : (
        <ul className="space-y-3">
          {weaknesses.map(
            (weakness, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <div className="mt-2 h-2 w-2 rounded-full bg-red-400" />

                <span className="text-gray-300">
                  {weakness}
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default WeaknessesCard;