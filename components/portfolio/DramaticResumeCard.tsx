"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, FileText } from "lucide-react";

interface DramaticResumeCardProps {
  data: {
    url: string;
  };
}

/**
 * CV Dossier — file-cover card in the portfolio's Field Manual language.
 * Reads like the front sheet of a stamped personnel file: ruled header,
 * dot-leader file plate, and a single confident download action.
 * Motion contract: transforms + opacity only (repo perf rule).
 */
export default function DramaticResumeCard({ data }: DramaticResumeCardProps) {
  const { url } = data;
  const filename = url.split("/").pop() || "CV.pdf";

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Download curriculum vitae"
      className="cv-dossier relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[var(--color-paper)] shadow-[0_0.75rem_2rem_-1.5rem_var(--color-accent-strong)]"
    >
      <style>
        {`
          /* Hallmark · component: cv dossier · genre: editorial dossier · theme: portfolio amber */
          .cv-dossier .cvd-folio {
            position: absolute;
            right: 0;
            bottom: 0.1em;
            font-size: clamp(2.25rem, 5vw, 3.25rem);
            font-weight: 800;
            line-height: 0.78;
            letter-spacing: -0.04em;
            color: var(--color-accent);
            opacity: 0.18;
            pointer-events: none;
            user-select: none;
          }
          .cv-dossier .cvd-leader {
            flex: 1 1 auto;
            min-width: 1.5rem;
            border-bottom: 1px dashed var(--color-rule-strong);
            opacity: 0.6;
            transform: translateY(-0.3em);
          }
          .cv-dossier .cvd-stamp {
            position: absolute;
            top: 1.1rem;
            right: 1.1rem;
            transform: rotate(6deg);
            border: 2px solid var(--color-accent-strong);
            border-radius: var(--radius-sm);
            padding: 0.2rem 0.55rem;
            font-size: 0.625rem;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--color-accent-strong);
            opacity: 0.55;
            pointer-events: none;
            user-select: none;
          }
        `}
      </style>

      {/* Accent spine — the file's edge binding */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1.5 bg-[var(--color-accent)]"
      />

      <div className="relative p-6 pl-8 sm:p-8 sm:pl-10">
        <span aria-hidden="true" className="cvd-stamp">
          Hire-ready
        </span>

        {/* Ruled header */}
        <div className="relative border-b-2 border-[var(--color-ink)] pb-3 pr-16 sm:pr-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
            Dossier &middot; Curriculum Vitae
          </p>
          <h2 className="mt-2 text-2xl font-extrabold uppercase leading-[1.05] tracking-[0.02em] text-[var(--color-ink)] md:text-4xl">
            Your search
            <br />
            ends here
          </h2>
          <span aria-hidden="true" className="cvd-folio">
            CV
          </span>
        </div>

        <p className="mt-4 max-w-prose text-base font-medium text-[var(--color-muted)] md:text-lg">
          Ready to bring this expertise to your team?
        </p>

        {/* File plate — dot-leader row, like a manifest entry */}
        <div className="mt-6 flex items-baseline gap-3 border-b border-[var(--color-rule)] pb-3">
          <FileText
            aria-hidden="true"
            className="h-4 w-4 shrink-0 translate-y-0.5 text-[var(--color-accent-strong)]"
          />
          <span className="min-w-0 truncate font-mono text-sm text-[var(--color-ink-soft)]">
            {filename}
          </span>
          <span aria-hidden="true" className="cvd-leader" />
          <span className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-neutral)]">
            PDF &middot; 1 file
          </span>
        </div>

        {/* Download action */}
        <motion.a
          href={url}
          download
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="group mt-6 inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-7 py-3.5 text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--color-paper)] transition-colors duration-200 hover:bg-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        >
          Download CV
          <ArrowDownToLine
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
          />
        </motion.a>
      </div>
    </motion.article>
  );
}
