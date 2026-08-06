"use client";

import React from "react";
import { Bot } from "lucide-react";
import { Skill } from "@/lib/types";
import { skillIconMap } from "../skillIconMap";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const AICard: React.FC<SkillCardProps> = ({
  skills,
  title,
  className,
}) => (
  <article
    className={`${className ?? ""} skill-panel relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-paper-2)] p-5 sm:p-6`}
  >
    <div className="flex items-center gap-3">
      <Bot
        aria-hidden="true"
        className="h-6 w-6 shrink-0 text-[var(--color-accent-strong)]"
      />
      <h4 className="min-w-0 text-lg font-bold text-[var(--color-ink)]">
        {title}
      </h4>
      <span className="h-px flex-1 bg-[var(--color-rule-strong)]" />
    </div>

    <ul
      className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3"
      aria-label={`${title} skills`}
    >
      {skills.map((skill, index) => {
        const Icon = skillIconMap[skill.name] || Bot;
        return (
          <li
            key={skill.id}
            className={`flex min-w-0 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-3 ${index % 5 === 0 ? "col-span-2 sm:col-span-2" : ""}`}
          >
            <Icon
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[var(--color-accent-strong)]"
            />
            <span className="skill-name text-xs font-bold text-[var(--color-ink-soft)] sm:text-sm">
              {skill.name}
            </span>
          </li>
        );
      })}
    </ul>
  </article>
);
