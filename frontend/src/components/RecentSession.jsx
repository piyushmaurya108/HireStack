import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function getDifficultyStyles(difficulty) {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-green-500/10 text-green-400 border border-green-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    case "hard":
      return "bg-red-500/10 text-red-400 border border-red-500/20";
    default:
      return "bg-white/10 text-white/60 border border-white/10";
  }
}

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-[#19B8AA]/20">
          <Clock className="w-5 h-5 text-[#19B8AA]" />
        </div>
        <h2 className="text-2xl font-bold">Your Past Sessions</h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader className="w-8 h-8 animate-spin text-[#19B8AA]" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="relative rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition p-5"
            >

              {/* ACTIVE BADGE */}
              {session.status === "active" && (
                <div className="absolute top-3 right-3 text-xs text-[#19B8AA] flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#19B8AA] rounded-full animate-pulse" />
                  ACTIVE
                </div>
              )}

              {/* TOP */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-lg bg-[#19B8AA]/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-[#19B8AA]" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate mb-1">
                    {session.problem}
                  </h3>

                  {/* 🔥 PREMIUM DIFFICULTY BADGE */}
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-medium ${getDifficultyStyles(
                      session.difficulty
                    )}`}
                  >
                    {session.difficulty}
                  </span>
                </div>
              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-xs text-white/60 mb-4">

                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(session.createdAt), {
                    addSuffix: true,
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  {session.participant ? "2 participants" : "1 participant"}
                </div>

              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs text-white/50">
                <span>Completed</span>
                <span>
                  {new Date(session.updatedAt).toLocaleDateString()}
                </span>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">

            <div className="w-16 h-16 mx-auto mb-4 bg-white/[0.05] rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white/40" />
            </div>

            <p className="text-lg text-white/70 mb-1">
              No sessions yet
            </p>
            <p className="text-sm text-white/40">
              Start your coding journey today
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default RecentSessions;