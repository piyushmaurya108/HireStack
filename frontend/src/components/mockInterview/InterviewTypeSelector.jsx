import React from "react";

const INTERVIEW_TYPES = [
  "frontend",
  "backend",
  "fullstack",
  "software-engineer",
  "data-structures",
  "hr",
  "custom",
];

const InterviewTypeSelector = ({
  value,
  onChange,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Interview Type
      </h3>

      <div className="grid gap-3 md:grid-cols-3">
        {INTERVIEW_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange?.(type)}
            className={`rounded-2xl border p-3 capitalize transition ${
              value === type
                ? "border-[#19B8AA] bg-[#19B8AA]/10 text-[#19B8AA]"
                : "border-white/10 bg-[#0B0F19] text-white hover:border-[#19B8AA]/50"
            }`}
          >
            {type.replace("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InterviewTypeSelector;