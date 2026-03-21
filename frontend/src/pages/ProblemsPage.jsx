import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Practice Problems
          </h1>
          <p className="text-white/60">
            Improve your coding skills with structured problems
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT - PROBLEMS LIST */}
          <div className="lg:col-span-2 space-y-5">

            {problems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="group block"
              >
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition duration-300 shadow-md hover:shadow-[#19B8AA]/20">

                  <div className="flex items-center justify-between gap-4">

                    {/* LEFT */}
                    <div className="flex gap-4 flex-1">

                      {/* ICON */}
                      <div className="size-12 rounded-lg bg-[#19B8AA]/10 flex items-center justify-center">
                        <Code2Icon className="size-6 text-[#19B8AA]" />
                      </div>

                      {/* TEXT */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-lg font-semibold group-hover:text-[#19B8AA] transition">
                            {problem.title}
                          </h2>

                          <span
                            className={`text-xs px-2 py-1 rounded-md font-medium ${
                              problem.difficulty === "Easy"
                                ? "bg-green-500/10 text-green-400"
                                : problem.difficulty === "Medium"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-white/50 mb-2">
                          {problem.category}
                        </p>

                        <p className="text-sm text-white/70 line-clamp-2">
                          {problem.description.text}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 text-[#19B8AA] font-medium">
                      <span className="hidden sm:block">Solve</span>
                      <ChevronRightIcon className="size-5 group-hover:translate-x-1 transition" />
                    </div>

                  </div>
                </div>
              </Link>
            ))}

          </div>

          {/* RIGHT - STATS PANEL */}
          <div className="h-fit sticky top-24">

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.04] shadow-md">

              <h3 className="text-xl font-semibold mb-6">
                Problem Stats
              </h3>

              <div className="space-y-6">

                <div className="flex justify-between items-center">
                  <span className="text-white/60">Total</span>
                  <span className="text-2xl font-bold text-[#19B8AA]">
                    {problems.length}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/60">Easy</span>
                  <span className="text-lg font-semibold text-green-400">
                    {easyProblemsCount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/60">Medium</span>
                  <span className="text-lg font-semibold text-yellow-400">
                    {mediumProblemsCount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/60">Hard</span>
                  <span className="text-lg font-semibold text-[#EF4444]">
                    {hardProblemsCount}
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;