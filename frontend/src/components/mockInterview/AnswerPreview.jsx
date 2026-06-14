import React from "react";
import { FileText } from "lucide-react";

const AnswerPreview = ({
  answer = "",
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <div className="mb-4 flex items-center gap-3">
        <FileText className="h-6 w-6 text-[#19B8AA]" />

        <h3 className="text-lg font-semibold text-white">
          Answer Preview
        </h3>
      </div>

      <div className="min-h-[220px] rounded-2xl border border-white/10 bg-[#0B0F19] p-4">
        {answer ? (
          <p className="whitespace-pre-wrap text-gray-300">
            {answer}
          </p>
        ) : (
          <p className="text-gray-500">
            Your answer preview will appear here...
          </p>
        )}
      </div>
    </div>
  );
};

export default AnswerPreview;