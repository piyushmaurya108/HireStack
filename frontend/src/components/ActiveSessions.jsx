import {
  ArrowRightIcon,
  Code2Icon,
  CopyIcon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  const handleCopyLink = async (sessionId) => {
    try {
      const sessionLink = `${window.location.origin}/session/${sessionId}`;
      await navigator.clipboard.writeText(sessionLink);
      alert("Session link copied!");
    } catch (error) {
      console.error("Failed to copy session link:", error);
      alert("Failed to copy link");
    }
  };

  return (
    <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#19B8AA]/20">
            <ZapIcon className="size-5 text-[#19B8AA]" />
          </div>
          <h2 className="text-2xl font-bold">Live Sessions</h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/60">
          <div className="size-2 bg-[#19B8AA] rounded-full" />
          {sessions.length} active
        </div>
      </div>

      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoaderIcon className="size-8 animate-spin text-[#19B8AA]" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="flex items-center justify-between gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative w-12 h-12 rounded-lg bg-[#19B8AA]/20 flex items-center justify-center">
                  <Code2Icon className="size-6 text-[#19B8AA]" />
                  <div className="absolute -top-1 -right-1 size-3 bg-[#19B8AA] rounded-full border border-[#05070D]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">
                      {session.problem}
                    </h3>

                    <span
                      className={`text-xs px-2 py-0.5 rounded ${getDifficultyBadgeClass(
                        session.difficulty
                      )}`}
                    >
                      {session.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <div className="flex items-center gap-1">
                      <CrownIcon className="size-3" />
                      {session.host?.name}
                    </div>

                    <div className="flex items-center gap-1">
                      <UsersIcon className="size-3" />
                      {session.participant ? "2/2" : "1/2"}
                    </div>

                    {session.participant && !isUserInSession(session) ? (
                      <span className="text-red-400">FULL</span>
                    ) : (
                      <span className="text-[#19B8AA]">OPEN</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(session._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition"
                >
                  <CopyIcon className="size-4" />
                  Copy Link
                </button>

                {session.participant && !isUserInSession(session) ? (
                  <button className="px-4 py-2 rounded-lg bg-white/10 text-white/40 text-sm cursor-not-allowed">
                    Full
                  </button>
                ) : (
                  <Link
                    to={`/session/${session._id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#19B8AA] text-black text-sm font-medium hover:opacity-90 transition"
                  >
                    {isUserInSession(session) ? "Rejoin" : "Join"}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/[0.05] rounded-2xl flex items-center justify-center">
              <SparklesIcon className="w-8 h-8 text-white/40" />
            </div>

            <p className="text-lg font-medium text-white/70">
              No active sessions
            </p>
            <p className="text-sm text-white/40">
              Be the first to create one
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveSessions;
