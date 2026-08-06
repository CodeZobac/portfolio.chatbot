"use client";

import React from "react";
import { Skill } from "@/lib/types";
import { ParticleCard } from "../MagicBento";
import { Brain } from "lucide-react";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const SoftSkillsCard: React.FC<SkillCardProps> = ({ skills, title, className }) => {
  const size = 200;
  const center = size / 2;
  const radius = center * 0.7;

  // Calculate points for the radar chart
  const points = skills.map((skill, i) => {
    const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
    const value = (skill.proficiency / 100) * radius;
    return {
      x: center + value * Math.cos(angle),
      y: center + value * Math.sin(angle),
      label: skill.name,
      angle,
    };
  });

  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <ParticleCard
      className={`${className} group relative flex flex-col p-6 rounded-[24px] border border-stone-200 bg-white overflow-hidden transition-all duration-500`}
      particleCount={10}
      enableTilt={true}
      glowColor="168, 162, 158" // Stone-400
    >
      <div className="relative z-10 flex flex-col h-full lg:flex-row lg:items-center lg:gap-8">
        <div className="flex-1 mb-6 lg:mb-0">
          <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider mb-2">
            {title}
          </span>
          <h3 className="text-2xl font-bold text-stone-800">Human Capital</h3>
          <p className="mt-2 text-sm text-stone-500 max-w-[200px]">
            The essential capabilities that drive project success beyond technical implementation.
          </p>

          <div className="mt-6 flex flex-col gap-2">
            {skills.map((skill) => (
               <div key={skill.name} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold text-stone-600">{skill.name}</span>
               </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <svg width={size} height={size} className="overflow-visible drop-shadow-sm">
            {/* Background Hexagons/Polygons */}
            {[0.5, 0.75, 1].map((scale) => (
              <polygon
                key={scale}
                points={skills.map((_, i) => {
                  const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
                  const x = center + radius * scale * Math.cos(angle);
                  const y = center + radius * scale * Math.sin(angle);
                  return `${x},${y}`;
                }).join(" ")}
                fill="none"
                stroke="rgba(120, 113, 108, 0.1)"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            {points.map((p, i) => (
               <line
                key={i}
                x1={center}
                y1={center}
                x2={center + radius * Math.cos(p.angle)}
                y2={center + radius * Math.sin(p.angle)}
                stroke="rgba(120, 113, 108, 0.1)"
                strokeWidth="1"
               />
            ))}

            {/* Data Polygon */}
            <polygon
              points={polygonPath}
              fill="rgba(232, 168, 56, 0.15)"
              stroke="rgba(232, 168, 56, 0.8)"
              strokeWidth="2"
              className="transition-all duration-1000 group-hover:fill-amber-400/30"
            />

            {/* Points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3"
                className="fill-amber-600 shadow-sm"
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity">
            <Brain className="w-12 h-12 text-stone-400" />
          </div>
        </div>
      </div>
    </ParticleCard>
  );
};
