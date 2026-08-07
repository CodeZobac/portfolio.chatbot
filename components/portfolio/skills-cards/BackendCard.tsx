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
 * 02 · Backend — dark ink ledger.
 * The tall column keeps its ink surface; entries read like a typeset ledger
 * with amber ticks and a qualitative strengthTag sub-line. No numbers.
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
      className={`${className ?? ""} skill-panel relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-ink)] p-5 text-[var(--color-paper)] sm:p-6`}
    >
      {index && (
        <span
          aria-hidden="true"
          className="fm-index"
          style={{ color: "var(--color-accent)", opacity: 0.18 }}
        >
          {index}
        </span>
      )}

      <div className="flex items-center gap-3 border-b-2 border-[var(--color-accent)] pb-3">
        <Server
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-[var(--color-accent)]"
        />
        <span className="fm-kicker text-[var(--color-accent)]">
          Section {index ?? "—"}
        </span>
        <h4 className="min-w-0 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-paper)]">
          {title}
        </h4>
      </div>

      <ul className="mt-2" aria-label={`${title} skills`}>
        {ordered.map((skill) => {
          const Icon = skillIconMap[skill.name] || Server;
          const isCore = skill.priority === "core";
          const isEmerging = skill.priority === "emerging";

          return (
            <li
              key={skill.id}
              className="fm-row min-w-0 border-b border-dashed border-[var(--color-rule-strong)] py-3 last:border-b-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rotate-45 bg-[var(--color-accent)]"
                />
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[var(--color-paper-3)]"
                />
                <span
                  className={`skill-name text-[var(--color-paper)] ${
                    isCore ? "text-base font-extrabold" : "text-sm font-semibold"
                  }`}
                >
                  {skill.name}
                </span>
                {isEmerging && (
                  <span
                    className="fm-stamp"
                    style={{
                      borderColor: "var(--color-accent)",
                      color: "var(--color-accent)",
                    }}
                  >
                    Emerging
                  </span>
                )}
              </div>
              {skill.strengthTag && (
                <p className="fm-note mt-1 pl-9 text-xs text-[var(--color-paper-3)]">
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
