import React from "react";
import { Link } from "react-router" ;
import {
  Brain,
  Mic,
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description:
      "Upload your resume and let AI analyze your experience, skills, and projects.",
  },
  {
    icon: Brain,
    title: "AI Generated Questions",
    description:
      "Questions are personalized based on your resume and target job description.",
  },
  {
    icon: Mic,
    title: "Voice Interview",
    description:
      "Practice real interview conversations using voice responses and speech recognition.",
  },
  {
    icon: BarChart3,
    title: "Detailed Feedback",
    description:
      "Get technical, communication, and confidence scores with improvement suggestions.",
  },
];

const benefits = [
  "Resume-specific interview questions",
  "Job description matching",
  "Real-time answer evaluation",
  "Communication skill assessment",
  "Technical skill assessment",
  "Confidence scoring",
  "Detailed interview report",
  "Interview history tracking",
];

const MockInterviewPage = () => {
  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#19B8AA]/20 bg-[#19B8AA]/10 px-4 py-2 text-sm font-medium text-[#19B8AA]">
            <Brain className="h-4 w-4" />
            AI Voice Mock Interview
          </div>

          <h1 className="mt-8 text-4xl font-bold md:text-6xl">
            Practice Interviews
            <span className="block text-[#19B8AA]">
              With AI
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Upload your resume, provide a job
            description, and experience a realistic
            AI-powered mock interview with instant
            feedback and detailed performance
            analysis.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/mock-interview/create"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#19B8AA] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Start Interview
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/mock-interview/history"
              className="rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white transition hover:border-[#19B8AA]"
            >
              View History
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Everything You Need To Prepare
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#19B8AA]/10">
                    <Icon className="h-7 w-7 text-[#19B8AA]" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-[#0B0F19] p-8 md:p-12">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Interview Features
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3"
              >
                <CheckCircle className="h-5 w-5 text-[#19B8AA]" />

                <span className="text-gray-300">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold">
            Ready To Test Your Skills?
          </h2>

          <p className="mt-4 text-gray-400">
            Start your personalized AI interview
            experience today.
          </p>

          <Link
            to="/mock-interview/create"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#19B8AA] px-8 py-4 font-semibold text-black transition hover:opacity-90"
          >
            Start Mock Interview
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;