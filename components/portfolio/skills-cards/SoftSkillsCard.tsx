"use client";

import React from "react";
import { Skill } from "@/lib/types";
import { ParticleCard } from "../MagicBento";
import { Brain, Sparkle } from "lucide-react";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const SoftSkillsCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  className,
}) => {
  return (
    <ParticleCard
      className={`${className} group relative flex flex-col p-6 rounded-[24px] border border-stone-200 bg-white overflow-hidden transition-all duration-500`}
      particleCount={10}
      enableTilt={true}
      glowColor="232, 168, 56"
    >
      {/* Soft radial ambience */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 75% 50%, rgba(251, 191, 36, 0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-shrink-0 mb-8 lg:mb-0 lg:max-w-[260px]">
          <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider mb-2">
            {title}
          </span>
          <h3 className="text-2xl font-bold text-stone-800">Human Capital</h3>
          <p className="mt-2 text-sm text-stone-500">
            The essential capabilities that drive project success beyond
            technical implementation.
          </p>
          <div className="mt-6 flex items-center gap-2 text-stone-300">
            <Brain className="h-5 w-5 transition-colors duration-500 group-hover:text-amber-400" />
            <div className="h-px flex-1 bg-gradient-to-r from-stone-200 to-transparent" />
          </div>
        </div>

        {/* Constellation of capabilities */}
        <div className="flex flex-1 flex-wrap items-center justify-center gap-3 lg:justify-start">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="group/skill relative flex flex-col gap-1 rounded-2xl border border-amber-100/60 bg-gradient-to-br from-white to-amber-50/40 px-5 py-3.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-200/30"
              style={{
                transform: `translateY(${(i % 3) * 6 - 6}px)`,
              }}
            >
              <div className="flex items-center gap-2">
                <Sparkle className="h-3.5 w-3.5 text-amber-500 transition-transform duration-300 group-hover/skill:rotate-45 group-hover/skill:scale-110" />
                <span className="text-sm font-bold text-stone-700">
                  {skill.name}
                </span>
              </div>
              {skill.strengthTag && (
                <span className="pl-[22px] text-[11px] font-medium text-stone-400 transition-colors duration-300 group-hover/skill:text-amber-600">
                  {skill.strengthTag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </ParticleCard>
  );
};
