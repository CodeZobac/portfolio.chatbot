"use client";

import { useId, useState } from "react";
import { Brain, ChevronDown, Code2, Database, Globe, Layers, Sprout, Sun } from "lucide-react";
import type { PresentedSkill } from "@/lib/types";
import styles from "./SkillsExplorer.module.css";

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

const CATEGORIES = [
  { id: "frontend", label: "Frontend", Icon: Globe },
  { id: "backend", label: "Backend", Icon: Code2 },
  { id: "ai-data", label: "AI & Data", Icon: Brain },
  { id: "infrastructure", label: "Infrastructure", Icon: Database },
  { id: "soft-skills", label: "Soft Skills", Icon: Layers },
] as const;

export default function SkillsBento({ skills, category }: SkillsBentoProps) {
  const instanceId = useId();
  const [selected, setSelected] = useState("all");
  const isScoped = Boolean(category && category !== "all");
  const available = isScoped
    ? skills.filter((skill) => skill.category === category)
    : skills;
  const categories = CATEGORIES.filter(({ id }) =>
    available.some((skill) => skill.category === id),
  );
  const active = categories.some(({ id }) => id === selected) ? selected : "all";
  const visible = available.filter((skill) => active === "all" || skill.category === active);

  return (
    <section className={styles.explorer} aria-labelledby={`${instanceId}-title`}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.sun} aria-hidden="true">
            <Sun size={44} strokeWidth={1.5} />
            <span className={styles.sunFace}>
              <span className={styles.sunEye} />
              <span className={styles.sunEye} />
              <span className={styles.sunSmile} />
            </span>
          </span>
          <h3 id={`${instanceId}-title`} className={styles.title}>Skills</h3>
        </div>
        <span className={styles.count} role="status" aria-live="polite" aria-atomic="true">
          {visible.length} {visible.length === 1 ? "skill" : "skills"}
        </span>
      </header>

      {!isScoped && categories.length > 1 && (
        <div className={styles.filters} role="group" aria-label="Filter skills by category">
          {[{ id: "all", label: "All" }, ...categories].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={active === id}
              aria-controls={`${instanceId}-results`}
              className={styles.filter}
              onClick={() => setSelected(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div id={`${instanceId}-results`} className={styles.results}>
        {visible.length === 0 && <p className={styles.empty}>No skills to show.</p>}
        {categories.filter(({ id }) => active === "all" || active === id).map(({ id, label, Icon }) => (
          <section key={id} className={styles.category} aria-labelledby={`${instanceId}-${id}`}>
            <h4 id={`${instanceId}-${id}`} className={styles.categoryTitle}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </h4>
            <ul className={styles.grid} aria-label={`${label} skills`}>
              {visible.filter((skill) => skill.category === id).sort(byPriority).map((skill) => (
                <li key={skill.id} className={styles.skill}>
                  <div className={styles.skillHeading}>
                    <span className={styles.skillName}>{skill.name}</span>
                    {skill.priority === "emerging" && (
                      <span className={styles.emerging}>
                        <Sprout size={14} aria-hidden="true" />
                        Emerging
                      </span>
                    )}
                  </div>
                  {Boolean(skill.appliedIn?.length) && (
                    <details className={styles.examples}>
                      <summary aria-label={`Used in: ${skill.name}`}>
                        Used in
                        <ChevronDown size={16} aria-hidden="true" />
                      </summary>
                      <ul aria-label={`${skill.name} application examples`}>
                        {skill.appliedIn!.map((example, index) => <li key={`${example}-${index}`}>{example}</li>)}
                      </ul>
                    </details>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
