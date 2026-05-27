"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
      transition={{ duration: 0.5, type: "spring" }}
      className="relative w-full overflow-hidden rounded-2xl p-1"
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,#f59e0b_90deg,#fb923c_170deg,#f97316_240deg,#ef4444_310deg,transparent_360deg)] opacity-70 blur-xl" />

      <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-white/90 p-8 text-center backdrop-blur-3xl md:p-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/grain.webp')] opacity-20" />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-300/25 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-300/25 blur-[100px]" />

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 space-y-2"
        >
          <h2 className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-3xl font-black text-transparent md:text-5xl">
            YOUR SEARCH ENDS HERE
          </h2>
          <p className="text-lg font-medium text-stone-600 md:text-xl">
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
          className="group relative z-10 flex items-center gap-3 rounded-full bg-amber-50 px-8 py-4 text-lg font-bold text-stone-900 shadow-[0_0_40px_-10px_rgba(232,168,56,0.25)] ring-1 ring-inset ring-amber-200/60 transition-all hover:bg-white hover:shadow-[0_0_60px_-10px_rgba(232,168,56,0.35)]"
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
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-50" />
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
