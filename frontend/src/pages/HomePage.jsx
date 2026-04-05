import React from "react";
import { Link } from "react-router"; 
import { 
  ArrowRightIcon,
  BracesIcon,
  Code2Icon,
  DatabaseIcon,
  LaptopMinimalIcon,
  SparklesIcon,
  TerminalSquareIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const floatingBadges = [
  {
    label: "JavaScript",
    icon: "/javascript.png",
    className: "left-[-18px] top-[44px] md:left-[-28px]",
    animation: "float 6s ease-in-out infinite",
  },
  {
    label: "Python",
    icon: "/python.png",
    className: "right-[-16px] top-[96px] md:right-[-26px]",
    animation: "float 7s ease-in-out infinite 0.8s",
  },
  {
    label: "Java",
    icon: "/java.png",
    className: "left-[20px] bottom-[48px] md:left-[36px]",
    animation: "float 6.5s ease-in-out infinite 1.2s",
  },
];

const stackBadges = [
  {
    label: "React",
    icon: SparklesIcon,
    className: "right-[8%] top-[8%]",
    animation: "drift 8s ease-in-out infinite",
  },
  {
    label: "SQL",
    icon: DatabaseIcon,
    className: "right-[10%] bottom-[14%]",
    animation: "drift 7.5s ease-in-out infinite 1s",
  },
  {
    label: "DSA",
    icon: BracesIcon,
    className: "left-[8%] top-[14%]",
    animation: "drift 9s ease-in-out infinite 1.5s",
  },
];

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#05070D] text-white overflow-hidden">

      {/* BOTTOM GRADIENT GLOW */}
<div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#19B8AA]/5 via-[#05070D]/40 to-transparent pointer-events-none"></div>
      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-[#05070D]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#19B8AA] flex items-center justify-center font-bold text-black">
              H
            </div>
            <span className="text-xl font-bold tracking-wide">
              HireStack
            </span>
          </Link>

          <SignInButton mode="modal">
            <button className="px-5 py-2.5 rounded-lg bg-[#5796FC] text-black font-semibold hover:opacity-90 transition">
              Get Started
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-[1400px] mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-2 text-2xl text-white/65 mb-5">
            <ZapIcon size={16} className="text-[#EF4444]" />
            Real-time collaboration platform
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Smarter hiring with{" "}
            <span className="text-[#5796FC]">
              real-time coding
            </span>
          </h1>

          <p className="text-white/80 text-lg mb-8 max-w-xl">
            Conduct technical interviews with live coding, video calls,
            and seamless collaboration — all in one place.
          </p>

          <div className="flex gap-4">
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#19B8AA] text-black font-semibold hover:opacity-90 transition">
                Start Now
                <ArrowRightIcon size={18} />
              </button>
            </SignInButton>

            <button className="px-6 py-3 border border-white/20 rounded-lg text-white/80 hover:bg-white/5 transition">
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#19B8AA]/10 blur-3xl"></div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-[#5796FC]/25 via-transparent to-[#19B8AA]/20 blur-2xl"></div>

            {floatingBadges.map((badge) => (
              <div
                key={badge.label}
                className={`absolute z-20 hidden rounded-2xl border border-white/12 bg-[#0F1421]/90 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md md:flex items-center gap-3 ${badge.className}`}
                style={{ animation: badge.animation }}
              >
                <img src={badge.icon} alt={badge.label} className="h-8 w-8 rounded-md object-contain" />
                <div>
                  <p className="text-sm font-semibold text-white">{badge.label}</p>
                  <p className="text-xs text-white/45">Live interviews</p>
                </div>
              </div>
            ))}

            {stackBadges.map((badge) => {
              const Icon = badge.icon;

              return (
                <div
                  key={badge.label}
                  className={`absolute z-10 hidden rounded-full border border-white/10 bg-white/6 px-3 py-2 text-sm text-white/80 backdrop-blur md:flex items-center gap-2 ${badge.className}`}
                  style={{ animation: badge.animation }}
                >
                  <Icon size={16} className="text-[#19B8AA]" />
                  <span>{badge.label}</span>
                </div>
              );
            })}

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B101B] p-4 shadow-2xl">
              <div className="rounded-[26px] border border-white/8 bg-gradient-to-br from-[#10182A] via-[#0B101B] to-[#080B13] p-4">
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]"></span>
                    </div>
                    <span className="text-sm text-white/55">hirestack-session.tsx</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#5796FC]/20 bg-[#5796FC]/10 px-3 py-1 text-xs font-medium text-[#8FB7FF]">
                    <LaptopMinimalIcon size={14} />
                    Interview Live
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[24px] border border-white/8 bg-[#0A0F19] p-5">
                    <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#19B8AA]">
                      <TerminalSquareIcon size={15} />
                      Collaborative Editor
                    </div>

                    <div className="space-y-3 font-mono text-sm">
                      <div className="text-white/35">
                        <span className="mr-4">01</span>
                        <span className="text-[#7AA2F7]">const</span>{" "}
                        <span className="text-white">candidate</span>{" "}
                        <span className="text-white/45">=</span>{" "}
                        <span className="text-[#9ECE6A]">"ready"</span>
                      </div>
                      <div className="text-white/35">
                        <span className="mr-4">02</span>
                        <span className="text-[#7AA2F7]">function</span>{" "}
                        <span className="text-[#E0AF68]">solve</span>
                        <span className="text-white">(</span>
                        <span className="text-[#F7768E]">nums</span>
                        <span className="text-white">)</span>{" "}
                        <span className="text-white/45">{`{`}</span>
                      </div>
                      <div className="text-white/35">
                        <span className="mr-4">03</span>
                        <span className="ml-6 text-[#7DCFFF]">return</span>{" "}
                        <span className="text-white">nums</span>
                        <span className="text-white/45">.</span>
                        <span className="text-[#E0AF68]">filter</span>
                        <span className="text-white">(</span>
                        <span className="text-white">Boolean</span>
                        <span className="text-white">)</span>
                      </div>
                      <div className="text-white/35">
                        <span className="mr-4">04</span>
                        <span className="text-white/45">{`}`}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5">
                      <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/40">
                        Session Stats
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-[#5796FC]/10 p-4">
                          <p className="text-xs text-white/50">Latency</p>
                          <p className="mt-2 text-2xl font-semibold text-white">42ms</p>
                        </div>
                        <div className="rounded-2xl bg-[#19B8AA]/10 p-4">
                          <p className="text-xs text-white/50">Room Sync</p>
                          <p className="mt-2 text-2xl font-semibold text-white">99%</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                        Language Stack
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0D1320] px-3 py-2">
                          <img src="/javascript.png" alt="JavaScript" className="h-5 w-5" />
                          <span className="text-sm text-white/85">JavaScript</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0D1320] px-3 py-2">
                          <img src="/python.png" alt="Python" className="h-5 w-5" />
                          <span className="text-sm text-white/85">Python</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0D1320] px-3 py-2">
                          <img src="/java.png" alt="Java" className="h-5 w-5" />
                          <span className="text-sm text-white/85">Java</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto mt-5 h-3 w-[62%] rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1400px] mx-auto px-6 pb-32">
        
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-white/60 text-lg">
            Built for modern hiring teams and developers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* CARD 1 */}
          <div className="p-8 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] transition duration-300 shadow-lg hover:shadow-[#19B8AA]/20">
            <VideoIcon className="mb-5 text-[#19B8AA] size-8" />
            <h3 className="text-xl font-bold mb-3">
              Video Interviews
            </h3>
            
          </div>

          {/* CARD 2 */}
          <div className="p-8 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] transition duration-300 shadow-lg hover:shadow-[#19B8AA]/20">
            <Code2Icon className="mb-5 text-[#19B8AA] size-8" />
            <h3 className="text-xl font-semibold mb-3">
              Live Coding
            </h3>
             
          </div>

          {/* CARD 3 */}
          <div className="p-8 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] transition duration-300 shadow-lg hover:shadow-[#EF4444]/20">
            <UsersIcon className="mb-5 text-[#EF4444] size-8" />
            <h3 className="text-xl font- mb-3">
              Team Collaboration
            </h3>
             
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
