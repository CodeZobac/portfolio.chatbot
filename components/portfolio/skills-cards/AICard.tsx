"use client";

import React from "react";
import { Skill } from "@/lib/types";
import { ParticleCard } from "../MagicBento";
import { skillIconMap } from "../skillIconMap";
import { Bot } from "lucide-react";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const AICard: React.FC<SkillCardProps> = ({
  skills,
  title,
  className,
}) => {
  return (
    <ParticleCard
      className={`${className} group relative flex flex-col p-6 rounded-[24px] border border-orange-200 bg-gradient-to-br from-orange-50/50 to-amber-50/50 overflow-hidden transition-all duration-500`}
      particleCount={20}
      enableTilt={true}
      glowColor="249, 115, 22" // Orange
    >
      {/* Neural Network SVG Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/neuron-mesh.svg')" }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
            {title}
          </span>
          <h3 className="text-2xl font-bold text-stone-800">
            Intelligence Layers
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {skills.map((skill) => {
            const Icon = skillIconMap[skill.name] || Bot;
            return (
              <div
                key={skill.name}
                className="group/skill relative flex flex-col gap-2 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-100 shadow-sm transition-all duration-300 hover:bg-white hover:border-orange-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-orange-600" />
                  <span className="text-[11px] font-bold text-stone-700 uppercase tracking-tight">
                    {skill.name}
                  </span>
                </div>

                {/* Micro Proficiency Bar */}
                <div className="h-1 w-full bg-orange-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-1000 group-hover/skill:w-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ParticleCard>
  );
};
