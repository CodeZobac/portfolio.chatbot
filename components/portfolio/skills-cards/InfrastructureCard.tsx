"use client";

import React from "react";
import { Layers } from "lucide-react";
import { Skill } from "@/lib/types";
import { skillIconMap } from "../skillIconMap";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const InfrastructureCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  className,
}) => (
  <article
    className={`${className ?? ""} skill-panel overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-paper)] p-5 sm:p-6`}
  >
    <div className="flex items-end justify-between gap-4">
      <h4 className="min-w-0 text-lg font-bold text-[var(--color-ink)]">
        {title}
      </h4>
      <span className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--color-rule-strong)] bg-[var(--color-paper-3)] text-[var(--color-accent-strong)]">
        <Layers aria-hidden="true" className="h-5 w-5" />
      </span>
    </div>

    <ul className="mt-5 space-y-2" aria-label={`${title} skills`}>
      {skills.map((skill, index) => {
        const Icon = skillIconMap[skill.name] || Layers;
        return (
          <li
            key={skill.id}
            className={`flex min-w-0 items-center gap-3 border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-3.5 py-3 ${index % 2 === 1 ? "sm:translate-x-2" : "sm:-translate-x-1"}`}
          >
            <Icon
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[var(--color-accent-strong)]"
            />
            <span className="skill-name text-sm font-semibold text-[var(--color-ink-soft)]">
              {skill.name}
            </span>
            <span className="ml-auto h-px w-6 shrink-0 bg-[var(--color-rule-strong)]" />
          </li>
        );
      })}
    </ul>
  </article>
);
