
import React from "react";
import { MessageSquareText } from "lucide-react";

const SpeechToTextPanel = ({
  transcript = "",
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <div className="mb-4 flex items-center gap-3">
        <MessageSquareText className="h-6 w-6 text-[#19B8AA]" />

        <h3 className="text-lg font-semibold text-white">
          Live Transcript
        </h3>
      </div>

      <div className="min-h-[200px] rounded-2xl border border-white/10 bg-[#0B0F19] p-4">
        {transcript ? (
          <p className="whitespace-pre-wrap text-gray-300">
            {transcript}
          </p>
        ) : (
          <p className="text-gray-500">
            Your speech will appear here...
          </p>
        )}
      </div>
    </div>
  );
};

export default SpeechToTextPanel;