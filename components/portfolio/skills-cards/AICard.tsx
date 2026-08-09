"use client";

import React from "react";
import { Bot } from "lucide-react";
import { PresentedSkill } from "@/lib/types";
import { skillIconMap } from "../skillIconMap";
import { byPriority } from "../SkillsBento";

interface SkillCardProps {
  skills: PresentedSkill[];
  title: string;
  index?: string;
  className?: string;
}

/**
 * 03 · AI & Data — punch-card grid.
 * The densest section: skills sit in tiles; core tiles carry an amber corner
 * notch and their strengthTag as a permanent caption. Emerging tiles are
 * dashed with a stamp. Purely qualitative.
 */
export const AICard: React.FC<SkillCardProps> = ({
  skills,
  title,
  index,
  className,
}) => {
  const ordered = [...skills].sort(byPriority);

  return (
    <article
      className={`${className ?? ""} skill-panel relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-paper-2)] p-5 sm:p-6`}
    >

      <div className="relative flex items-center gap-3 border-b-2 border-[var(--color-ink)] pb-3 pr-16 sm:pr-20">
        <Bot
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

      <ul
        className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3"
        aria-label={`${title} skills`}
      >
        {ordered.map((skill) => {
          const Icon = skillIconMap[skill.name] || Bot;
          const isCore = skill.priority === "core";
          const isEmerging = skill.priority === "emerging";

          return (
            <li
              key={skill.id}
              className={`fm-tile relative min-w-0 rounded-[var(--radius-sm)] border bg-[var(--color-paper)] px-3 py-2.5 ${
                isEmerging
                  ? "border-dashed border-[var(--color-rule-strong)]"
                  : "border-[var(--color-rule)]"
              }`}
            >
              {isCore && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-2.5 w-2.5 bg-[var(--color-accent)]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                />
              )}
              <div className="flex min-w-0 items-center gap-2">
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[var(--color-accent-strong)]"
                />
                <span className="skill-name text-xs font-bold text-[var(--color-ink)] sm:text-sm">
                  {skill.name}
                </span>
              </div>
              {isEmerging ? (
                <span className="fm-stamp mt-1.5">Emerging</span>
              ) : (
                skill.strengthTag && (
                  <p className="fm-note mt-1 truncate text-[0.6875rem] text-[var(--color-neutral)]">
                    {skill.strengthTag}
                  </p>
                )
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
};
