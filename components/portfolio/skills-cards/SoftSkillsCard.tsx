"use client";

import React from "react";
import { Brain } from "lucide-react";
import { Skill } from "@/lib/types";

interface SkillCardProps {
  skills: Skill[];
  title: string;
  index?: string;
  className?: string;
}

/**
 * 05 · Soft Skills — ticket-stub strip.
 * Five tilted paper stubs pinned in a row, each with an amber pin and its
 * strengthTag set as a caption. Hover straightens the stub.
 */
export const SoftSkillsCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  index,
  className,
}) => (
  <article
    className={`${className ?? ""} skill-panel overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-paper-3)] p-5 sm:p-6`}
  >
    {index && (
      <span aria-hidden="true" className="fm-index">
        {index}
      </span>
    )}

    <div className="flex items-center gap-3 border-b-2 border-[var(--color-ink)] pb-3">
      <Brain
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

    <ul
      className="mt-6 flex flex-wrap justify-center gap-4"
      aria-label={`${title} skills`}
    >
      {skills.map((skill, i) => (
        <li
          key={skill.id}
          className="fm-ticket relative w-[min(100%,13rem)] rounded-[var(--radius-sm)] border border-[var(--color-rule-strong)] border-l-4 border-l-[var(--color-accent)] bg-[var(--color-paper)] px-4 pb-3 pt-4 text-center shadow-[0_0.5rem_1.25rem_-1rem_var(--color-accent-strong)]"
          style={{ "--tilt": `${i % 2 === 0 ? -1.6 : 1.4}deg` } as React.CSSProperties}
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-accent)]"
          />
          <span className="skill-name block text-sm font-extrabold text-[var(--color-ink)]">
            {skill.name}
          </span>
          {skill.strengthTag && (
            <span className="fm-note mt-1 block text-xs text-[var(--color-neutral)]">
              {skill.strengthTag}
            </span>
          )}
        </li>
      ))}
    </ul>
  </article>
);
