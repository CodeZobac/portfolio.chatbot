'use client';

import { motion } from 'framer-motion';
import { PersonalInfo } from '@/lib/types';

interface CreativeHeaderProps {
    personal: PersonalInfo;
}

export default function CreativeHeader({ personal }: CreativeHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-zinc-900 p-8 shadow-2xl"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute -left-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-purple-500/30 blur-3xl" />
                <div className="absolute -right-20 -bottom-20 h-64 w-64 animate-pulse rounded-full bg-blue-500/30 blur-3xl delay-1000" />
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-500/20 blur-3xl delay-500" />
            </div>

            {/* Grain Effect */}
            <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-20 mix-blend-overlay" />

            <div className="relative z-10">
                {/* Name with Gradient & Glow */}
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent drop-shadow-lg sm:text-6xl"
                >
                    {personal.name}
                </motion.h1>

                {/* Title with Slide Effect */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 flex items-center gap-3"
                >
                    <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
                    <p className="text-xl font-medium text-zinc-200">
                        {personal.title}
                    </p>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 max-w-2xl text-base text-zinc-400"
                >
                    {personal.tagline}
                </motion.p>

                {/* Interactive Info Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex flex-wrap gap-3"
                >
                    <div className="group flex cursor-default items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-300 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-blue-500/50">
                        <div className="rounded-full bg-blue-500/20 p-1 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        {personal.location}
                    </div>

                    <a
                        href={`mailto:${personal.email}`}
                        className="group flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-300 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-purple-500/50"
                    >
                        <div className="rounded-full bg-purple-500/20 p-1 text-purple-400 transition-colors group-hover:bg-purple-500 group-hover:text-white">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        {personal.email}
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
}
