"use client";

import React from "react";
import { Globe } from "lucide-react";
import { Skill } from "@/lib/types";
import { skillIconMap } from "../skillIconMap";
import { byPriority } from "../SkillsBento";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  index?: string;
  className?: string;
}

/**
 * 01 · Frontend — type-specimen sheet.
 * Core skills are set large in display type; the type scale itself carries
 * the hierarchy. Hover reveals the qualitative strengthTag as a margin note.
 */
export const FrontendCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  index,
  className,
}) => {
  const ordered = [...skills].sort(byPriority);

  return (
    <article
      className={`${className ?? ""} skill-panel overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-paper)] p-5 sm:p-6`}
    >
      {index && (
        <span aria-hidden="true" className="fm-index">
          {index}
        </span>
      )}

      <div className="flex items-center gap-3 border-b-2 border-[var(--color-ink)] pb-3">
        <Globe
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-[var(--color-accent-strong)]"
        />
        <span className="fm-kicker text-[var(--color-accent-strong)]">
          Section {index ?? "—"}
        </span>
        <h4 className="min-w-0 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-ink)]">
          {title}
        </h4>
      </div>

      <ul className="mt-2" aria-label={`${title} skills`}>
        {ordered.map((skill) => {
          const Icon = skillIconMap[skill.name] || Globe;
          const isCore = skill.priority === "core";
          const isEmerging = skill.priority === "emerging";

          return (
            <li
              key={skill.id}
              className="fm-row flex min-w-0 items-baseline gap-3 border-b border-[var(--color-rule)] py-2.5 last:border-b-0"
            >
              <Icon
                aria-hidden="true"
                className="h-4 w-4 shrink-0 self-center text-[var(--color-accent-strong)]"
              />
              <span
                className={`skill-name text-[var(--color-ink)] ${
                  isCore
                    ? "text-xl font-extrabold tracking-tight sm:text-2xl"
                    : "text-base font-semibold text-[var(--color-ink-soft)]"
                }`}
              >
                {skill.name}
              </span>
              {isEmerging && <span className="fm-stamp">Emerging</span>}
              <span aria-hidden="true" className="fm-leader" />
              {skill.strengthTag && (
                <span className="fm-note fm-reveal shrink-0 text-xs text-[var(--color-accent-strong)] sm:text-sm">
                  {skill.strengthTag}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
};
