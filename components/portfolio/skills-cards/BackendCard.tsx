"use client";

import React from "react";
import { Skill } from "@/lib/types";
import { ParticleCard } from "../MagicBento";
import { skillIconMap } from "../skillIconMap";
import { Server } from "lucide-react";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const BackendCard: React.FC<SkillCardProps> = ({ skills, title, className }) => {
  return (
    <ParticleCard
      className={`${className} group relative flex flex-col p-6 rounded-[24px] border border-stone-300 bg-stone-50 overflow-hidden transition-all duration-500`}
      particleCount={8}
      enableTilt={true}
      glowColor="120, 113, 108" // Stone color
    >
      {/* Background Circuit Pattern - Abstract */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10 10 H90 V90 H10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="2" fill="currentColor" />
            <circle cx="90" cy="10" r="2" fill="currentColor" />
            <circle cx="90" cy="90" r="2" fill="currentColor" />
            <circle cx="10" cy="90" r="2" fill="currentColor" />
            <path d="M50 10 V90 M10 50 H90" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider mb-2">
            {title}
          </span>
          <h3 className="text-2xl font-bold text-stone-800">Robust Architecture</h3>
        </div>

        <div className="flex flex-col gap-3">
          {skills.map((skill) => {
            const Icon = skillIconMap[skill.name] || Server;
            return (
              <div
                key={skill.name}
                className="group/skill relative flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-stone-200 shadow-sm transition-all duration-300 hover:border-amber-400 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-stone-100 group-hover/skill:bg-amber-50 transition-colors">
                    <Icon className="w-4 h-4 text-stone-600 group-hover/skill:text-amber-600" />
                  </div>
                  <span className="text-sm font-semibold text-stone-700">{skill.name}</span>
                </div>

                {/* Server Status Lights */}
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        skill.proficiency > (i * 30)
                          ? 'bg-amber-400 animate-pulse'
                          : 'bg-stone-200'
                      }`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>

                {/* Processing Data Packet Animation on Hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-0 group-hover/skill:opacity-100">
                    <div className="absolute top-0 left-0 h-full w-1 bg-amber-400/20 animate-slide-down" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ParticleCard>
  );
};
