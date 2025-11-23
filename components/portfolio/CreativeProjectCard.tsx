'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '@/lib/types';

interface CreativeProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export default function CreativeProjectCard({ project, onClick }: CreativeProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
    const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

    const getGradient = (category: string) => {
        switch (category) {
            case 'ai':
                return 'from-purple-500/20 via-indigo-500/20 to-blue-500/20 border-purple-500/30 hover:border-purple-500/60';
            case 'mobile':
                return 'from-orange-500/20 via-amber-500/20 to-yellow-500/20 border-orange-500/30 hover:border-orange-500/60';
            case 'web':
            default:
                return 'from-blue-500/20 via-cyan-500/20 to-teal-500/20 border-blue-500/30 hover:border-blue-500/60';
        }
    };

    const getIcon = (category: string) => {
        switch (category) {
            case 'ai':
                return (
                    <svg className="h-12 w-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            case 'mobile':
                return (
                    <svg className="h-12 w-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                );
            case 'web':
            default:
                return (
                    <svg className="h-12 w-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                );
        }
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onClick={() => onClick(project)}
            className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors ${getGradient(project.category)}`}
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div style={{ transform: 'translateZ(20px)' }} className="mb-4 flex items-start justify-between">
                <div className="rounded-xl bg-zinc-800/50 p-3 shadow-inner">
                    {getIcon(project.category)}
                </div>
                {project.featured && (
                    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-500/20">
                        Featured
                    </span>
                )}
            </div>

            <div style={{ transform: 'translateZ(30px)' }} className="mb-2">
                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white">{project.name}</h3>
                <p className={`text-sm font-medium ${project.category === 'ai' ? 'text-purple-400' :
                        project.category === 'mobile' ? 'text-orange-400' : 'text-blue-400'
                    }`}>
                    {project.tagline}
                </p>
            </div>

            <p style={{ transform: 'translateZ(20px)' }} className="mb-4 line-clamp-2 text-sm text-zinc-400">
                {project.description}
            </p>

            <div style={{ transform: 'translateZ(25px)' }} className="mt-auto flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((tech) => (
                    <span
                        key={tech}
                        className="rounded-md bg-zinc-800/80 px-2 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-white/10"
                    >
                        {tech}
                    </span>
                ))}
                {project.techStack.length > 3 && (
                    <span className="rounded-md bg-zinc-800/80 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-white/10">
                        +{project.techStack.length - 3}
                    </span>
                )}
            </div>

            <div
                style={{ transform: 'translateZ(10px)' }}
                className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            >
                <span className="flex items-center gap-1 text-xs font-bold text-white">
                    View Details
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </div>
        </motion.div>
    );
}
