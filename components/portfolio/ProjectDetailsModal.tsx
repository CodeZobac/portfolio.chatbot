"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import { useEffect } from "react";
import { Backlight } from "@/components/ui/backlight";

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
  useEffect(() => {
    if (project && onModalOpen) {
      onModalOpen(true);
    }
    return () => {
      if (onModalOpen) {
        onModalOpen(false);
      }
    };
  }, [project, onModalOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 pt-20 backdrop-blur-sm"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {/* Header */}
              <div className="relative border-b border-amber-100 bg-white/95 p-6 backdrop-blur-md">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full p-2 text-stone-400 transition-colors hover:bg-amber-100/80 hover:text-amber-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold text-stone-900">
                  {project.name}
                </h2>
                <p
                  className={`mt-1 text-lg font-medium ${
                    project.category === "ai"
                      ? "text-amber-700"
                      : project.category === "web"
                        ? "text-orange-600"
                        : "text-red-500"
                  }`}
                >
                  {project.tagline}
                </p>
              </div>

              {/* Scrollable Content - Scrollbar Hidden */}
              <div className="max-h-[calc(90vh-100px)] overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div className="space-y-8">
                  {/* Video Section */}
                  {project.youtubeId && (
                    <div className="mb-8">
                      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#E37100]">
                        Project Showcase
                      </h3>
                      <Backlight blur={40} className="w-full">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-amber-200/50 shadow-lg">
                          <iframe
                            className="absolute inset-0 h-full w-full"
                            src={`https://www.youtube.com/embed/${project.youtubeId}`}
                            title={`${project.name} Video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </Backlight>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-[#E37100]">
                      Overview
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Problem & Solution Grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl bg-rose-50 p-5 border border-rose-200/70">
                      <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-rose-600">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        The Problem
                      </h3>
                      <p className="text-sm text-stone-600">
                        {project.problem}
                      </p>
                    </div>
                    <div className="rounded-xl bg-amber-50 p-5 border border-amber-200/70">
                      <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-700">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        The Solution
                      </h3>
                      <p className="text-sm text-stone-600">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Decisions */}
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#E37100]">
                      Key Technical Decisions
                    </h3>
                    <ul className="space-y-2">
                      {project.keyDecisions?.map((decision, idx) => (
                        <li key={idx} className="flex gap-3 text-stone-600">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                          {decision}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#E37100]">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-amber-50 px-3 py-1.5 text-sm text-stone-700 ring-1 ring-inset ring-amber-200/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {project.links && (
                    <div className="flex gap-4 pt-4 border-t border-amber-100">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-amber-100 hover:text-amber-800"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          View Source
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-400"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Live Demo
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-400"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Watch Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
