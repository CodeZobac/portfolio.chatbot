'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { Skill } from '@/lib/types';
import {
  ParticleCard,
  GlobalSpotlight,
  BentoCardGrid,
  useMobileDetection
} from './MagicBento';

export interface SkillsBentoProps {
  skills: Skill[];
  category?: string;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '79, 70, 229'; // Indigo 600

const SkillsBento: React.FC<SkillsBentoProps> = ({
  skills,
  category,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (category && category !== 'all' && skill.category !== category) {
      return acc;
    }
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryLabels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    infrastructure: 'Infrastructure',
    'ai-data': 'AI & Data',
    'soft-skills': 'Soft Skills',
  };

  // Define grid layout for categories
  // We want a nice bento layout. 
  // Frontend & Backend can be large cards.
  // Infrastructure & AI/Data can be medium.
  // Soft Skills can be wide.
  
  const categories = Object.keys(groupedSkills);

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: rgba(255, 255, 255, 0.1);
            --background-dark: rgba(2, 6, 23, 0.8);
            --white: #ffffff;
            --purple-primary: rgba(79, 70, 229, 1);
            --purple-glow: rgba(79, 70, 229, 0.2);
            --purple-border: rgba(79, 70, 229, 0.8);
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
            width: 100%;
            margin: 0 auto;
            padding: 0.5rem;
          }
          
          @media (min-width: 600px) {
            .skills-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .skills-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            
            /* Custom Bento Layout for Skills */
            /* Frontend - Large */
            .skills-grid .card-frontend {
              grid-column: span 2;
              grid-row: span 1;
            }
            
            /* Backend - Large */
            .skills-grid .card-backend {
              grid-column: span 1;
              grid-row: span 2;
            }

             /* Infrastructure - Medium */
            .skills-grid .card-infrastructure {
              grid-column: span 1;
              grid-row: span 1;
            }

            /* AI & Data - Medium */
            .skills-grid .card-ai-data {
              grid-column: span 1;
              grid-row: span 1;
            }
            
            /* Soft Skills - Wide */
            .skills-grid .card-soft-skills {
              grid-column: span 3;
              grid-row: span 1;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.1), 0 0 30px rgba(${glowColor}, 0.1);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.2), 0 0 30px rgba(${glowColor}, 0.2);
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="skills-grid grid gap-4">
          {categories.map((cat) => {
            const categorySkills = groupedSkills[cat];
            const baseClassName = `card card-${cat} flex flex-col relative min-h-[200px] w-full max-w-full p-6 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg bg-slate-950/80 backdrop-blur-md ${
              enableBorderGlow ? 'card--border-glow' : ''
            }`;

            const cardStyle = {
              backgroundColor: 'var(--background-dark)',
              borderColor: 'var(--border-color)',
              color: 'var(--white)',
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '200px'
            } as React.CSSProperties;

            if (enableStars) {
              return (
                <ParticleCard
                  key={cat}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  <div className="card__header flex justify-between gap-3 relative text-white z-10 mb-4">
                    <span className="card__label text-sm font-bold uppercase tracking-wider text-indigo-400">
                      {categoryLabels[cat] || cat}
                    </span>
                  </div>
                  <div className="card__content flex flex-wrap gap-2 relative text-white z-10">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/skill relative flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm transition-all hover:bg-white/10 border border-white/5 hover:border-indigo-500/30"
                        title={`${skill.proficiency}% Proficiency • ${skill.yearsOfExperience || 0}+ Years`}
                      >
                        <span className="font-medium text-zinc-200 group-hover/skill:text-white transition-colors">
                          {skill.name}
                        </span>
                        {/* Proficiency Bar */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden rounded-b-lg opacity-0 transition-opacity group-hover/skill:opacity-100">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </ParticleCard>
              );
            }

            return (
              <div
                key={cat}
                className={baseClassName}
                style={cardStyle}
                ref={el => {
                  if (!el) return;
                  // Basic animation logic if stars are disabled but tilt/magnetism enabled
                  // For brevity, reusing the logic from MagicBento would be ideal, 
                  // but since we are inside a map, we can just use ParticleCard which handles it all.
                  // If enableStars is false, ParticleCard still renders children but without particles if we adjust it.
                  // But ParticleCard implementation in MagicBento.tsx assumes particles.
                  // For now, we assume enableStars is true as per default.
                }}
              >
                 <div className="card__header flex justify-between gap-3 relative text-white z-10 mb-4">
                    <span className="card__label text-sm font-bold uppercase tracking-wider text-indigo-400">
                      {categoryLabels[cat] || cat}
                    </span>
                  </div>
                  <div className="card__content flex flex-wrap gap-2 relative text-white z-10">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/skill relative flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm transition-all hover:bg-white/10 border border-white/5 hover:border-indigo-500/30"
                      >
                        <span className="font-medium text-zinc-200 group-hover/skill:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default SkillsBento;
