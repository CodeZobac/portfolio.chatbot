"use client";

import React from "react";
import { Layers } from "lucide-react";
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
 * 04 · Infrastructure — supply line.
 * Skills read as stations on a route: amber node, name, dashed connector to
 * the next station. Hover reveals the strengthTag beneath the node.
 */
export const InfrastructureCard: React.FC<SkillCardProps> = ({
  skills,
  title,
  index,
  className,
}) => {
  const ordered = [...skills].sort(byPriority);

  return (
    <article
      className={`${className ?? ""} skill-panel overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-paper)] p-5 sm:p-6`}
    >
      {index && (
        <span aria-hidden="true" className="fm-index">
          {index}
        </span>
      )}

      <div className="flex items-center gap-3 border-b-2 border-[var(--color-ink)] pb-3">
        <Layers
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
        className="mt-5 flex flex-wrap items-start gap-y-4"
        aria-label={`${title} skills`}
      >
        {ordered.map((skill, i) => {
          const Icon = skillIconMap[skill.name] || Layers;
          const isCore = skill.priority === "core";
          const isLast = i === ordered.length - 1;

          return (
            <li key={skill.id} className="fm-node flex min-w-0 items-start">
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                      isCore
                        ? "border-[var(--color-accent-strong)] bg-[var(--color-paper-3)]"
                        : "border-[var(--color-rule-strong)] bg-[var(--color-paper-2)]"
                    } text-[var(--color-accent-strong)]`}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span
                    className={`skill-name text-sm ${
                      isCore
                        ? "font-extrabold text-[var(--color-ink)]"
                        : "font-semibold text-[var(--color-ink-soft)]"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
                {skill.strengthTag && (
                  <p className="fm-note fm-reveal mt-1 pl-10 text-xs text-[var(--color-accent-strong)]">
                    {skill.strengthTag}
                  </p>
                )}
              </div>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="mx-3 mt-4 hidden w-8 border-t border-dashed border-[var(--color-rule-strong)] sm:block lg:w-12"
                />
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
};
