"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import type { PortfolioContent } from "@/lib/types";
import { SECTIONS, type SectionDiff, type SectionKey } from "@/lib/admin/draft";

const ProjectsCard = dynamic(() => import("@/components/portfolio/ProjectsCard"));
const ExperienceCard = dynamic(() => import("@/components/portfolio/ExperienceCard"));
const SkillsCard = dynamic(() => import("@/components/portfolio/SkillsCard"));

/** Renders the draft with the same cards the chat shows; `content` must already be preview-ready. */
export function PreviewPane({ section, content }: { section: SectionKey; content: PortfolioContent }) {
  return (
    <div className="admin-preview-body">
      {section === "skills" && (
        <SkillsCard data={{ skills: content.skills.map((skill) => ({ ...skill, proficiency: undefined })) }} />
      )}
      {section === "projects" && <ProjectsCard data={{ projects: content.projects }} />}
      {section === "experiences" && <ExperienceCard data={{ roles: content.experiences }} />}
    </div>
  );
}

const titles: Record<SectionKey, string> = { skills: "Skills", projects: "Projects", experiences: "Experience" };

export function ReviewDialog({ diff, orderChanged, newImages, publishing, onConfirm, onClose }: {
  diff: Record<SectionKey, SectionDiff>; orderChanged: boolean; newImages: number; publishing: boolean;
  onConfirm: () => void; onClose: () => void;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape" && !publishing) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [onClose, publishing]);

  const rows = SECTIONS.flatMap((key) => [
    ...diff[key].added.map((name) => ({ key: `${key}+${name}`, tag: "Added", name, section: titles[key] })),
    ...diff[key].changed.map((name) => ({ key: `${key}~${name}`, tag: "Changed", name, section: titles[key] })),
    ...diff[key].removed.map((name) => ({ key: `${key}-${name}`, tag: "Removed", name, section: titles[key] })),
  ]);

  return createPortal(
    <div className="admin-review-backdrop" onClick={() => !publishing && onClose()}>
      <div className="admin-review" role="dialog" aria-modal="true" aria-labelledby="admin-review-title" onClick={(event) => event.stopPropagation()}>
        <header>
          <h2 id="admin-review-title">Review before publishing</h2>
          <button className="admin-icon-button" onClick={onClose} disabled={publishing} aria-label="Close review"><X size={18} /></button>
        </header>
        <ul>
          {rows.map((row) => (
            <li key={row.key}><b data-tag={row.tag}>{row.tag}</b><span>{row.name}</span><small>{row.section}</small></li>
          ))}
          {orderChanged && <li><b data-tag="Changed">Reordered</b><span>Record order changed</span></li>}
          {newImages > 0 && <li><b data-tag="Added">Images</b><span>{newImages} new image{newImages > 1 ? "s" : ""} uploaded</span></li>}
          {!rows.length && !orderChanged && !newImages && <li><span>No content changes.</span></li>}
        </ul>
        <footer>
          <button className="admin-button" onClick={onClose} disabled={publishing}>Keep editing</button>
          <button className="admin-button admin-button-primary" onClick={onConfirm} disabled={publishing} data-loading={publishing}>
            {publishing ? "Publishing…" : "Confirm & publish"}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
