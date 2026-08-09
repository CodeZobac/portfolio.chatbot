"use client";

/* Hallmark · pre-emit critique: P4 H5 E4 S5 R5 V4 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Github,
  PlayCircle,
  X,
} from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/types";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onModalOpen?: (isOpen: boolean) => void;
}

export default function ProjectDetailsModal({
  project,
  onClose,
  onModalOpen,
}: ProjectDetailsModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const onCloseRef = useRef(onClose);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    onModalOpen?.(true);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      onModalOpen?.(false);
    };
  }, [project, onModalOpen]);

  if (!project || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.16 }}
        onClick={onClose}
        className="project-modal-backdrop fixed inset-0 z-50 grid place-items-center p-3 pt-20 sm:p-6 sm:pt-24"
      >
        <motion.article
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          transition={{
            duration: prefersReducedMotion ? 0.1 : 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="project-modal relative max-h-[calc(100dvh-6rem)] w-full max-w-5xl overflow-y-auto rounded-xl border bg-[var(--color-paper)] text-[var(--color-ink)] shadow-none sm:max-h-[calc(100dvh-7.5rem)]"
        >
          <button
            type="button"
            onClick={onClose}
            className="project-modal-close absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full text-[var(--color-neutral)] sm:right-5 sm:top-5"
            aria-label={`Close ${project.name} project details`}
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </button>

          <header className="border-b border-[var(--color-rule)] px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7 lg:px-10">
            <div className="min-w-0 pe-12">
              <p className="mb-2 text-sm font-semibold text-[var(--color-accent-strong)]">
                {project.tagline}
              </p>
              <h2
                id={titleId}
                className="min-w-0 [overflow-wrap:anywhere] text-xl font-bold tracking-[-0.025em] text-[var(--color-ink)] sm:text-2xl"
              >
                {project.name}
              </h2>
            </div>

            {project.youtubeId && (
              <div className="mt-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)]">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${project.youtubeId}`}
                    title={`${project.name} video`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <p
              id={descriptionId}
              className="project-modal-lead mt-6 max-w-[72ch] text-[clamp(1.0625rem,2vw,1.375rem)] leading-[1.58] tracking-[-0.012em] text-[var(--color-ink-soft)]"
            >
              {project.description}
            </p>
          </header>

          <div className="space-y-9 px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
            <section
              aria-label="Project challenge and response"
              className="grid gap-7 border-b border-[var(--color-rule)] pb-9 md:grid-cols-2 md:gap-10"
            >
              <div className="border-s-2 border-[var(--color-error)] ps-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--color-error)]">
                  <AlertTriangle aria-hidden="true" className="size-4" />
                  The problem
                </h3>
                <p className="text-base leading-7 text-[var(--color-muted)]">
                  {project.problem}
                </p>
              </div>

              <div className="border-s-2 border-[var(--color-accent)] ps-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--color-accent-strong)]">
                  <CheckCircle2 aria-hidden="true" className="size-4" />
                  The solution
                </h3>
                <p className="text-base leading-7 text-[var(--color-muted)]">
                  {project.solution}
                </p>
              </div>
            </section>

            {project.keyDecisions?.length > 0 && (
              <section>
                <h3 className="mb-4 text-sm font-bold text-[var(--color-accent-strong)]">
                  Key technical decisions
                </h3>
                <ul className="grid gap-x-10 gap-y-3 md:grid-cols-2">
                  {project.keyDecisions.map((decision) => (
                    <li
                      key={decision}
                      className="flex gap-3 text-base leading-7 text-[var(--color-muted)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                      />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h3 className="mb-4 text-sm font-bold text-[var(--color-accent-strong)]">
                Technology
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-3 py-1.5 text-sm text-[var(--color-ink-soft)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {project.links && (
              <div className="flex flex-wrap gap-3 border-t border-[var(--color-rule)] pt-6">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-link"
                  >
                    <Github aria-hidden="true" className="size-4" />
                    Source
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-link project-modal-link--primary"
                  >
                    <ExternalLink aria-hidden="true" className="size-4" />
                    Live project
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-link project-modal-link--primary"
                  >
                    <PlayCircle aria-hidden="true" className="size-4" />
                    Watch demo
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.article>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
