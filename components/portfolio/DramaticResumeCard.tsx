'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DramaticResumeCardProps {
    data: {
        url: string;
    };
}

export default function DramaticResumeCard({ data }: DramaticResumeCardProps) {
    const { url } = data;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="relative w-full overflow-hidden rounded-2xl p-1"
        >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,#ff0080_120deg,#7928ca_180deg,#4299e1_240deg,transparent_360deg)] opacity-70 blur-xl" />

            <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-zinc-900/90 p-8 text-center backdrop-blur-3xl md:p-12">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('/grain.webp')] opacity-20" />
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px]" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />

                {/* Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 space-y-2"
                >
                    <h2 className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-3xl font-black text-transparent md:text-5xl">
                        YOUR SEARCH ENDS HERE
                    </h2>
                    <p className="text-lg font-medium text-zinc-400 md:text-xl">
                        Ready to bring this expertise to your team?
                    </p>
                </motion.div>

                {/* Dramatic Button */}
                <motion.a
                    href={url}
                    download
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative z-10 flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]"
                >
                    <span className="relative z-10">DOWNLOAD CV</span>
                    <motion.svg
                        animate={{ x: isHovered ? 5 : 0 }}
                        className="relative z-10 h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                    </motion.svg>

                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-50" />
                </motion.a>

                {/* Floating Particles/Decorations */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-10 left-10 text-4xl opacity-20"
                >
                    ✨
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-10 right-10 text-4xl opacity-20"
                >
                    🚀
                </motion.div>
            </div>
        </motion.div>
    );
}
