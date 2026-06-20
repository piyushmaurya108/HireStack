
import React from "react";
import { MessageSquareText } from "lucide-react";

const SpeechToTextPanel = ({
  transcript = "",
  onTranscriptChange,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <div className="mb-4 flex items-center gap-3">
        <MessageSquareText className="h-6 w-6 text-[#19B8AA]" />

        <h3 className="text-lg font-semibold text-white">
          Live Transcript / Answer Input
        </h3>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => onTranscriptChange?.(e.target.value)}
        placeholder="Your speech will appear here, or you can type/edit your answer manually..."
        className="w-full min-h-[220px] rounded-2xl border border-white/10 bg-[#0B0F19] p-4 text-gray-300 outline-none transition focus:border-[#19B8AA] resize-y placeholder:text-gray-500"
      />
    </div>
  );
};

export default SpeechToTextPanel;