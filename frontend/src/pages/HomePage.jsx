import React from "react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  Code2Icon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

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

          <img
            src="https://images.unsplash.com/photo-1669023414162-8b0573b9c6b2?q=80&w=1932&auto=format&fit=crop"
            alt="platform"
            className="relative rounded-xl border border-white/10 shadow-2xl"
          />
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