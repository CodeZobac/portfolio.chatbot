"use client";

import React from "react";
import { Server } from "lucide-react";
import { Skill } from "@/lib/types";
import { skillIconMap } from "../skillIconMap";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const BackendCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  className,
}) => (
  <article
    className={`${className ?? ""} skill-panel relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-ink)] p-5 text-[var(--color-paper)] sm:p-6`}
  >
    <div className="flex items-center justify-between gap-3">
      <h4 className="min-w-0 text-lg font-bold text-[var(--color-paper)]">
        {title}
      </h4>
      <Server
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-[var(--color-accent-strong)]"
      />
    </div>

    <ul
      className="mt-5 border-y border-[var(--color-rule-strong)]"
      aria-label={`${title} skills`}
    >
      {skills.map((skill) => {
        const Icon = skillIconMap[skill.name] || Server;
        return (
          <li
            key={skill.id}
            className="flex min-w-0 items-center gap-3 border-b border-[var(--color-rule-strong)] py-3 last:border-b-0"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-strong)]" />
            <Icon
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[var(--color-paper-3)]"
            />
            <span className="skill-name text-sm font-semibold text-[var(--color-paper)]">
              {skill.name}
            </span>
          </li>
        );
      })}
    </ul>
  </article>
);
