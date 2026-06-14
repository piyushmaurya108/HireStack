import React from "react";
import { Mic, Square } from "lucide-react";

const VoiceRecorder = ({
  isRecording,
  onStartRecording,
  onStopRecording,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 text-center shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <h3 className="mb-6 text-lg font-semibold text-white">
        Voice Recorder
      </h3>

      {!isRecording ? (
        <button
          onClick={onStartRecording}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#19B8AA] px-6 py-3 font-medium text-black transition hover:opacity-90"
        >
          <Mic size={18} />
          Start Recording
        </button>
      ) : (
        <button
          onClick={onStopRecording}
          className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          <Square size={18} />
          Stop Recording
        </button>
      )}

      <p className="mt-4 text-sm text-gray-400">
        {isRecording
          ? "Recording in progress..."
          : "Press start to answer using voice"}
      </p>
    </div>
  );
};

export default VoiceRecorder;