"use client";

import React from "react";
import { Globe } from "lucide-react";
import { Skill } from "@/lib/types";
import { ParticleCard } from "../MagicBento";
import { skillIconMap } from "../skillIconMap";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const FrontendCard: React.FC<SkillCardProps> = ({ skills, title, className }) => {
  return (
    <ParticleCard
      className={`${className} group relative flex flex-col p-6 rounded-[24px] border border-amber-200/50 bg-white/40 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-200/20`}
      particleCount={15}
      enableTilt={true}
      enableMagnetism={true}
      glowColor="232, 168, 56"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
            {title}
          </span>
          <h3 className="text-2xl font-bold text-stone-800">Visual Experiences</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => {
            const Icon = skillIconMap[skill.name] || Globe;
            return (
              <div
                key={skill.name}
                className="group/skill relative flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 border border-amber-100/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-amber-50 hover:border-amber-300/50 hover:shadow-md hover:shadow-amber-200/40"
              >
                <Icon className="w-4 h-4 text-amber-600 group-hover/skill:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-stone-700">{skill.name}</span>

                {/* Qualitative strength reveal */}
                {skill.strengthTag && (
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-200/60 bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700 shadow-lg shadow-amber-200/30 opacity-0 translate-y-1 transition-all duration-300 group-hover/skill:opacity-100 group-hover/skill:translate-y-0 z-20">
                    {skill.strengthTag}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
           <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
        </div>
      </div>
    </ParticleCard>
  );
};
