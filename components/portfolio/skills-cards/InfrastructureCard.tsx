"use client";

import React from "react";
import { Skill } from "@/lib/types";
import { ParticleCard } from "../MagicBento";
import { skillIconMap } from "../skillIconMap";
import { Layers } from "lucide-react";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const InfrastructureCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  className,
}) => {
  return (
    <ParticleCard
      className={`${className} group relative flex flex-col p-6 rounded-[24px] border border-blue-200 bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/20`}
      particleCount={12}
      enableTilt={true}
      glowColor="59, 130, 246" // Blue
    >
      {/* Background Decorative Element - Isometric Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="isoGrid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="skewY(30)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="0"
              x2="10"
              y2="0"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#isoGrid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            {title}
          </span>
          <h3 className="text-2xl font-bold text-stone-800">
            Reliable Systems
          </h3>
        </div>

        <div className="flex flex-col gap-2 perspective-1000">
          {skills.map((skill, i) => {
            const Icon = skillIconMap[skill.name] || Layers;
            return (
              <div
                key={skill.name}
                className="group/skill relative flex items-center gap-4 px-4 py-3 rounded-xl bg-white border border-blue-100 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:-translate-y-2 hover:rotate-x-12"
                style={{
                  zIndex: skills.length - i,
                  transform: `translateY(-${i * 4}px) scale(${1 - i * 0.02})`,
                }}
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-blue-50 group-hover/skill:bg-blue-100 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-stone-700">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-blue-500 font-mono font-bold">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="mt-1 h-1 w-full bg-blue-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-1000 group-hover/skill:brightness-110"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>

                {/* Floating "Data" Particles on hover */}
                <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover/skill:opacity-100 group-hover/skill:animate-ping" />
              </div>
            );
          })}
        </div>
      </div>
    </ParticleCard>
  );
};
