"use client";

import React from "react";
import { Server } from "lucide-react";
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
 * 02 · Backend — warm ledger column.
 * Same paper family as the rest of the manual (deepest warm tone), read as a
 * tall typeset ledger: amber diamond ticks, dashed rules, qualitative
 * strengthTag sub-lines. No numbers.
 */
export const BackendCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  index,
  className,
}) => {
  const ordered = [...skills].sort(byPriority);

  return (
    <article
      className={`${className ?? ""} skill-panel relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-paper-3)] p-5 sm:p-6`}
    >
      <div className="relative flex items-center gap-3 border-b-2 border-[var(--color-ink)] pb-3 pr-16 sm:pr-20">
        <Server
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-[var(--color-accent-strong)]"
        />
        <h4 className="min-w-0 text-sm font-extrabold uppercase tracking-[0.08em] text-[var(--color-ink)]">
          {title}
        </h4>
        {index && (
          <span aria-hidden="true" className="fm-index">
            {index}
          </span>
        )}
      </div>

      <ul className="mt-2" aria-label={`${title} skills`}>
        {ordered.map((skill) => {
          const Icon = skillIconMap[skill.name] || Server;
          const isEmerging = skill.priority === "emerging";

          return (
            <li
              key={skill.id}
              className="fm-row min-w-0 border-b border-dashed border-[var(--color-rule-strong)] py-3 last:border-b-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rotate-45 bg-[var(--color-accent-strong)]"
                />
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[var(--color-ink-soft)]"
                />
                <span className="skill-name text-sm font-bold text-[var(--color-ink)]">
                  {skill.name}
                </span>
                {isEmerging && <span className="fm-stamp">Emerging</span>}
              </div>
              {skill.strengthTag && (
                <p className="fm-note mt-1 pl-9 text-xs text-[var(--color-neutral)]">
                  {skill.strengthTag}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
};
