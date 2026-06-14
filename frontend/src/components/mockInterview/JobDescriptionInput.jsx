import React from "react";

const JobDescriptionInput = ({
  value,
  onChange,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Job Description
      </h3>

      <textarea
        value={value}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        rows={10}
        placeholder="Paste the job description here..."
        className="w-full rounded-2xl border border-white/10 bg-[#0B0F19] p-4 text-white outline-none transition focus:border-[#19B8AA]"
      />

      <div className="mt-3 text-right text-sm text-gray-400">
        {value?.length || 0} characters
      </div>
    </div>
  );
};

export default JobDescriptionInput;