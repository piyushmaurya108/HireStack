 import { Code2Icon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      {/* MODAL BOX */}
      <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#0B0F19] p-6 shadow-2xl relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition"
        >
          <XIcon size={18} />
        </button>

        {/* TITLE */}
        <h3 className="text-2xl font-bold mb-6">
          Create New Session
        </h3>

        <div className="space-y-6">

          {/* SELECT */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Select Problem <span className="text-red-400">*</span>
            </label>

            <select
              className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/10 text-white outline-none focus:border-[#19B8AA] transition"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find(
                  (p) => p.title === e.target.value
                );

                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled className="bg-black">
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title} className="bg-black">
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* SUMMARY */}
          {roomConfig.problem && (
            <div className="flex gap-3 p-4 rounded-lg bg-[#19B8AA]/10 border border-[#19B8AA]/30">
              <Code2Icon className="size-5 text-[#19B8AA]" />

              <div className="text-sm">
                <p className="font-semibold text-white mb-1">
                  Room Summary
                </p>

                <p className="text-white/70">
                  Problem: <span className="text-white">{roomConfig.problem}</span>
                </p>

                <p className="text-white/70">
                  Max Participants:{" "}
                  <span className="text-white">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 transition"
          >
            Cancel
          </button>

          <button
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#19B8AA] text-black font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {isCreating ? (
              <LoaderIcon className="size-4 animate-spin" />
            ) : (
              <PlusIcon className="size-4" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default CreateSessionModal;