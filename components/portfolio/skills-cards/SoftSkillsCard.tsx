"use client";

import React from "react";
import { Brain } from "lucide-react";
import { Skill } from "@/lib/types";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  className?: string;
}

export const SoftSkillsCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  className,
}) => (
  <article
    className={`${className ?? ""} skill-panel overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-paper-3)] p-5 sm:p-6`}
  >
    <div className="grid min-w-0 gap-5 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] sm:items-center">
      <div className="flex min-w-0 items-center gap-3 sm:block">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--color-rule-strong)] bg-[var(--color-paper)] text-[var(--color-accent-strong)] sm:mb-4 sm:h-16 sm:w-16">
          <Brain aria-hidden="true" className="h-6 w-6 sm:h-8 sm:w-8" />
        </span>
        <h4 className="min-w-0 text-lg font-bold text-[var(--color-ink)]">
          {title}
        </h4>
      </div>

      <ul
        className="soft-skill-cloud grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2"
        aria-label={`${title} skills`}
      >
        {skills.map((skill, index) => (
          <li
            key={skill.id}
            className={`skill-name rounded-full border border-[var(--color-rule-strong)] bg-[var(--color-paper)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--color-ink-soft)] ${index === skills.length - 1 ? "sm:col-span-2 sm:mx-auto sm:w-[min(100%,20rem)]" : ""}`}
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  </article>
);
