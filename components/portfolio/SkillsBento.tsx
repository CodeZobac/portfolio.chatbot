"use client";

import React, { useMemo } from "react";
import { Skill } from "@/lib/types";
import { FrontendCard } from "./skills-cards/FrontendCard";
import { BackendCard } from "./skills-cards/BackendCard";
import { AICard } from "./skills-cards/AICard";
import { InfrastructureCard } from "./skills-cards/InfrastructureCard";
import { SoftSkillsCard } from "./skills-cards/SoftSkillsCard";

export interface SkillsBentoProps {
  skills: Skill[];
  category?: string;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

const SkillsBento: React.FC<SkillsBentoProps> = ({
  skills,
  category,
}) => {
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
      {} as Record<string, Skill[]>,
    );
  }, [skills, category]);

  const isFiltered = Boolean(category && category !== "all");

  return (
    <section className="skills-bento w-full pb-4" aria-label="Skills by category">
      <style>
        {`
          /* Hallmark · component: skills collection · genre: playful · theme: portfolio amber
           * states: presentational component — no interactive state contract
           * contrast: pass (46–50)
           */
          /* Hallmark · pre-emit critique: P5 H5 E4 S5 R4 V5 */

          .skills-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: var(--space-md);
            width: 100%;
            min-width: 0;
          }

          .skill-panel {
            min-width: 0;
            border: var(--rule-thin) solid var(--color-rule);
            color: var(--color-ink);
            box-shadow: 0 0.75rem 2rem -1.5rem var(--color-accent-strong);
            transition:
              transform var(--dur-short) var(--ease-out),
              box-shadow var(--dur-short) var(--ease-out);
          }

          .skill-name {
            min-width: 0;
            overflow-wrap: anywhere;
          }

          @media (hover: hover) and (pointer: fine) {
            .skill-panel:hover {
              transform: translateY(-2px);
              box-shadow: 0 1rem 2.25rem -1.35rem var(--color-accent-strong);
            }
          }

          @media (min-width: 40rem) {
            .skills-grid {
              grid-template-columns: repeat(6, minmax(0, 1fr));
            }

            .card-frontend { grid-column: span 4; grid-row: span 1; }
            .card-backend { grid-column: span 2; grid-row: span 2; }
            .card-ai-data { grid-column: span 3; grid-row: span 1; }
            .card-infrastructure { grid-column: span 3; grid-row: span 1; }
            .card-soft-skills { grid-column: span 6; grid-row: span 1; }

            .skills-grid--filtered > * {
              grid-column: 1 / -1;
              grid-row: auto;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .skill-panel,
            .skill-panel * {
              animation: none !important;
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
              className="card-frontend"
            />
          )}

          {groupedSkills["backend"] && (
            <BackendCard
              skills={groupedSkills["backend"]}
              title="Backend"
              className="card-backend"
            />
          )}

          {groupedSkills["ai-data"] && (
            <AICard
              skills={groupedSkills["ai-data"]}
              title="AI & Data"
              className="card-ai-data"
            />
          )}

          {groupedSkills["infrastructure"] && (
            <InfrastructureCard
              skills={groupedSkills["infrastructure"]}
              title="Infrastructure"
              className="card-infrastructure"
            />
          )}

          {groupedSkills["soft-skills"] && (
            <SoftSkillsCard
              skills={groupedSkills["soft-skills"]}
              title="Soft Skills"
              className="card-soft-skills"
            />
          )}
      </div>
    </section>
  );
};

export default SkillsBento;
