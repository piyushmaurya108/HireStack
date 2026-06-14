import React from "react";
import {
  Brain,
  MessageCircle,
  Mic,
} from "lucide-react";

const SkillsBreakdown = ({
  technicalScore = 0,
  communicationScore = 0,
  confidenceScore = 0,
}) => {
  const skills = [
    {
      title: "Technical",
      score: technicalScore,
      icon: Brain,
    },
    {
      title: "Communication",
      score: communicationScore,
      icon: MessageCircle,
    },
    {
      title: "Confidence",
      score: confidenceScore,
      icon: Mic,
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#05070D] p-6 shadow-[0_0_40px_rgba(25,184,170,0.08)]">
      <h3 className="mb-6 text-lg font-semibold text-white">
        Skills Breakdown
      </h3>

      <div className="space-y-5">
        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div key={skill.title}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#19B8AA]" />

                  <span className="text-white">
                    {skill.title}
                  </span>
                </div>

                <span className="text-[#19B8AA] font-semibold">
                  {skill.score}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#19B8AA] transition-all duration-700"
                  style={{
                    width: `${skill.score}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsBreakdown;