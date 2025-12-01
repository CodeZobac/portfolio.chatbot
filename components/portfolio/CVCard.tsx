'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Experience, Education, Skill, Project, PersonalInfo } from '@/lib/types';
import CreativeSkillsGraph from './CreativeSkillsGraph';
import CreativeProjectCard from './CreativeProjectCard';
import ProjectDetailsModal from './ProjectDetailsModal';
import CreativeHeader from './CreativeHeader';

interface CVCardProps {
  data: {
    personal: PersonalInfo;
    experience: Experience[];
    education: Education;
    skills: Skill[];
    projects: Project[];
  };
  onModalOpen?: (isOpen: boolean) => void;
  onSendMessage?: (text: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CVCard({ data, onModalOpen, onSendMessage }: CVCardProps) {
  const { personal, experience, education, skills, projects } = data;
  const [showLabels, setShowLabels] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div variants={item}>
        <CreativeHeader personal={personal} />
      </motion.div>

      {/* Experience Section */}
      <motion.div variants={item} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-zinc-50">
          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="border-l-4 border-blue-600 pl-4"
            >
              <h3 className="text-lg font-semibold text-zinc-50">{exp.title}</h3>
              <p className="text-sm font-medium text-blue-400">{exp.company}</p>
              <p className="text-sm text-zinc-400">{exp.period} • {exp.location}</p>
              <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                {exp.achievements.slice(0, 3).map((achievement, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div variants={item} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-zinc-50">
          <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          Education
        </h2>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-zinc-50">{education.degree}</h3>
          <p className="text-sm font-medium text-purple-400">{education.institution}</p>
          <p className="text-sm text-zinc-400">{education.graduationYear} • {education.location}</p>
          {education.certifications && education.certifications.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-zinc-300">Certifications:</p>
              <ul className="mt-1 space-y-1 text-sm text-zinc-400">
                {education.certifications.map((cert, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>


      {/* Skills Section */}
      <motion.div variants={item} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-zinc-50">
            <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Top Skills
          </h2>
          <div className="flex gap-2">
            {onSendMessage && (
              <button
                onClick={() => onSendMessage('Tell me more about your skills')}
                className="rounded-full bg-pink-900/30 px-3 py-1 text-xs font-medium text-pink-400 transition-colors hover:bg-pink-900/50"
              >
                Ask AI
              </button>
            )}
            <button
              onClick={() => setShowLabels(!showLabels)}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-700"
            >
              {showLabels ? 'Hide Names' : 'Show Names'}
            </button>
          </div>
        </div>
        <CreativeSkillsGraph skills={skills} showAllLabels={showLabels} />
      </motion.div>

      {/* Featured Projects Section */}
      <motion.div variants={item} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-zinc-50">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Featured Projects
          </h2>
          {onSendMessage && (
            <button
              onClick={() => onSendMessage('Show me all your projects')}
              className="rounded-full bg-green-900/30 px-3 py-1 text-xs font-medium text-green-400 transition-colors hover:bg-green-900/50"
            >
              Show All
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.slice(0, 4).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + idx * 0.1 }}
              className="h-full"
            >
              <CreativeProjectCard project={project} onClick={setSelectedProject} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onModalOpen={onModalOpen}
      />
    </motion.div>
  );
}
