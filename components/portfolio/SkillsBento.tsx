"use client";

import React, { useMemo } from "react";
import { PresentedSkill } from "@/lib/types";
import { FrontendCard } from "./skills-cards/FrontendCard";
import { BackendCard } from "./skills-cards/BackendCard";
import { AICard } from "./skills-cards/AICard";
import { InfrastructureCard } from "./skills-cards/InfrastructureCard";
import { SoftSkillsCard } from "./skills-cards/SoftSkillsCard";

export interface SkillsBentoProps {
  skills: PresentedSkill[];
  category?: string;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

const PRIORITY_RANK: Record<string, number> = {
  core: 0,
  supporting: 1,
  emerging: 2,
};

export const byPriority = (a: PresentedSkill, b: PresentedSkill) =>
  (PRIORITY_RANK[a.priority ?? "supporting"] ?? 1) -
  (PRIORITY_RANK[b.priority ?? "supporting"] ?? 1);

const SkillsBento: React.FC<SkillsBentoProps> = ({ skills, category }) => {
  const groupedSkills = useMemo(() => {
    return skills.reduce(
      (acc, skill) => {
        if (category && category !== "all" && skill.category !== category) {
          return acc;
        }
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<string, PresentedSkill[]>,
    );
  }, [skills, category]);

  const isFiltered = Boolean(category && category !== "all");

  return (
    <section className="skills-bento w-full pb-4" aria-label="Skills by category">
      <style>
        {`
          /* Hallmark · component: skills field manual · genre: editorial dossier · theme: portfolio amber
           * states: hover reveals annotation (fine pointers); annotations always visible on coarse pointers
           * motion contract: transforms + opacity only — no filters, no blend modes (repo perf rule)
           * contrast: pass (46–50)
           */

          .skills-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: var(--space-md);
            width: 100%;
            min-width: 0;
          }

          .skill-panel {
            position: relative;
            min-width: 0;
            border: var(--rule-thin) solid var(--color-rule);
            box-shadow: 0 0.75rem 2rem -1.5rem var(--color-accent-strong);
            opacity: 0;
            transform: translateY(0.75rem);
            animation: fm-rise var(--dur-long) var(--ease-out) forwards;
            transition:
              transform var(--dur-short) var(--ease-out),
              box-shadow var(--dur-short) var(--ease-out);
          }

          .skill-panel:nth-child(1) { animation-delay: 40ms; }
          .skill-panel:nth-child(2) { animation-delay: 120ms; }
          .skill-panel:nth-child(3) { animation-delay: 200ms; }
          .skill-panel:nth-child(4) { animation-delay: 280ms; }
          .skill-panel:nth-child(5) { animation-delay: 360ms; }

          @keyframes fm-rise {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Section numeral — folio digit resting on the header rule.
           * Lives inside the (relative) header row; bottom: 0 plus a tight
           * line-height sets the glyph baseline on the title's rule line. */
          .fm-index {
            position: absolute;
            right: 0;
            bottom: 0.14em; /* digits rest just above the title rule, not crossed by it */
            font-size: clamp(2.5rem, 5.5vw, 3.75rem);
            font-weight: 800;
            line-height: 0.78;
            letter-spacing: -0.04em;
            color: var(--color-accent);
            opacity: 0.18;
            pointer-events: none;
            user-select: none;
          }

          /* Dashed dot-leader between a skill name and its margin note */
          .fm-leader {
            flex: 1 1 1.5rem;
            min-width: 1.5rem;
            border-bottom: var(--rule-thin) dashed var(--color-rule-strong);
            margin-bottom: 0.4em;
          }

          .skill-name {
            min-width: 0;
            overflow-wrap: anywhere;
          }

          /* strengthTag margin note — qualitative only, never numeric */
          .fm-note {
            font-style: italic;
          }

          /* Ticket stubs rest at a slight tilt (set per item via --tilt) */
          .fm-ticket {
            transform: rotate(var(--tilt, 0deg));
            transition: transform var(--dur-short) var(--ease-out);
          }

          @media (hover: hover) and (pointer: fine) {
            .skill-panel:hover {
              transform: translateY(-2px);
              box-shadow: 0 1rem 2.5rem -1.25rem var(--color-accent-strong);
            }

            .fm-reveal {
              opacity: 0;
              transform: translateX(0.375rem);
              transition:
                opacity var(--dur-short) var(--ease-out),
                transform var(--dur-short) var(--ease-out);
            }

            .fm-row:hover .fm-reveal,
            .fm-tile:hover .fm-reveal,
            .fm-node:hover .fm-reveal {
              opacity: 1;
              transform: translateX(0);
            }

            .fm-tile {
              transition:
                transform var(--dur-short) var(--ease-out),
                border-color var(--dur-short) var(--ease-out);
            }

            .fm-tile:hover {
              transform: translateY(-2px);
              border-color: var(--color-accent);
            }

            .fm-ticket:hover {
              transform: rotate(0deg) translateY(-4px);
            }
          }

          /* Emerging-skill stamp: qualitative status, not a number */
          .fm-stamp {
            display: inline-block;
            border: var(--rule-thin) solid var(--color-accent-strong);
            color: var(--color-accent-strong);
            font-size: 0.5625rem;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            padding: 0.1rem 0.4rem;
            border-radius: var(--radius-sm);
            transform: rotate(-3deg);
            white-space: nowrap;
          }

          @media (min-width: 40rem) {
            .skills-grid {
              grid-template-columns: repeat(6, minmax(0, 1fr));
            }

            .card-frontend { grid-column: span 4; }
            .card-backend { grid-column: span 2; grid-row: span 2; }
            .card-ai-data { grid-column: span 4; }
            .card-infrastructure { grid-column: span 6; }
            .card-soft-skills { grid-column: span 6; }

            .skills-grid--filtered > * {
              grid-column: 1 / -1;
              grid-row: auto;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .skill-panel {
              animation: none !important;
              opacity: 1 !important;
            }

            .skill-panel,
            .skill-panel * {
              transition-duration: var(--dur-micro) !important;
              transform: none !important;
            }
          }
        `}
      </style>

      <div className={`skills-grid ${isFiltered ? "skills-grid--filtered" : ""}`}>
        {groupedSkills["frontend"] && (
          <FrontendCard
            skills={groupedSkills["frontend"]}
            title="Frontend"
            index="01"
            className="card-frontend"
          />
        )}

        {groupedSkills["backend"] && (
          <BackendCard
            skills={groupedSkills["backend"]}
            title="Backend"
            index="02"
            className="card-backend"
          />
        )}

        {groupedSkills["ai-data"] && (
          <AICard
            skills={groupedSkills["ai-data"]}
            title="AI & Data"
            index="03"
            className="card-ai-data"
          />
        )}

        {groupedSkills["infrastructure"] && (
          <InfrastructureCard
            skills={groupedSkills["infrastructure"]}
            title="Infrastructure"
            index="04"
            className="card-infrastructure"
          />
        )}

        {groupedSkills["soft-skills"] && (
          <SoftSkillsCard
            skills={groupedSkills["soft-skills"]}
            title="Soft Skills"
            index="05"
            className="card-soft-skills"
          />
        )}
      </div>
    </section>
  );
};

export default SkillsBento;
