"use client";

import React from "react";
import { Globe } from "lucide-react";
import { Skill } from "@/lib/types";
import { skillIconMap } from "../skillIconMap";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const FrontendCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  className,
}) => (
  <article
    className={`${className ?? ""} skill-panel overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-paper)] p-5 sm:p-6`}
  >
    <div className="flex items-center gap-3 border-b border-[var(--color-rule)] pb-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-paper-3)] text-[var(--color-accent-strong)]">
        <Globe aria-hidden="true" className="h-5 w-5" />
      </span>
      <h4 className="min-w-0 text-lg font-bold text-[var(--color-ink)]">
        {title}
      </h4>
    </div>

    <ul className="mt-5 flex flex-wrap gap-2.5" aria-label={`${title} skills`}>
      {skills.map((skill) => {
        const Icon = skillIconMap[skill.name] || Globe;
        return (
          <li
            key={skill.id}
            className="frontend-chip flex min-w-0 items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-3.5 py-2 text-[var(--color-ink-soft)] odd:-rotate-1 even:rotate-1"
          >
            <Icon
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[var(--color-accent-strong)]"
            />
            <span className="skill-name text-sm font-semibold">{skill.name}</span>
          </li>
        );
      })}
    </ul>
  </article>
);
