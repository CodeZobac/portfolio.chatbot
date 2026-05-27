"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Skill } from "@/lib/types";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import {
  GlobalSpotlight,
  BentoCardGrid,
  useMobileDetection,
} from "./MagicBento";
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

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "232, 168, 56"; // Amber

const SkillsBento: React.FC<SkillsBentoProps> = ({
  skills,
  category,
  enableSpotlight = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();

  useEffect(() => {
    if (!gridRef.current || isMobile) return;

    const cards = gridRef.current.querySelectorAll(".skills-grid > *");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  // Group skills by category
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

  return (
    <div className="w-full py-8">
      <style>
        {`
          .bento-section {
            --glow-color: ${glowColor};
            --border-color: rgba(232, 168, 56, 0.1);
          }

          .skills-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: 1fr;
          }

          @media (min-width: 768px) {
            .skills-grid {
              grid-template-columns: repeat(6, 1fr);
            }

            .card-frontend { grid-column: span 4; grid-row: span 1; }
            .card-backend { grid-column: span 2; grid-row: span 2; }
            .card-ai-data { grid-column: span 2; grid-row: span 1; }
            .card-infrastructure { grid-column: span 2; grid-row: span 1; }
            .card-soft-skills { grid-column: span 6; grid-row: span 1; }
          }

          @keyframes slide-down {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          .animate-slide-down {
            animation: slide-down 2s linear infinite;
          }

          .perspective-1000 {
            perspective: 1000px;
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={isMobile}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="skills-grid w-full">
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
      </BentoCardGrid>
    </div>
  );
};

export default SkillsBento;
