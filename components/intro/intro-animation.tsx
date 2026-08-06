"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SlackIntro from "@/components/intro/initial-view";
import OrbitingItems3D from "@/components/intro/orbital-stack";
import { cn } from "@/lib/utils";

interface IntroAnimationProps {
  onComplete?: () => void;
}

type Phase = "lines" | "orbital" | "exit";

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<Phase>("lines");
  const [showOrbital, setShowOrbital] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  // Phase sequencing — total ~6 seconds, phases blend into each other
  useEffect(() => {
    // Phase 1 → 2: orbital rises in while the name lines are still settling
    const phase1Timer = setTimeout(() => {
      setPhase("orbital");
      setShowOrbital(true);
    }, 2000);

    // Phase 2 → 3: lines spring out, orbital lifts away
    const phase2Timer = setTimeout(() => {
      setPhase("exit");
      setAnimateOut(true);
    }, 4600);

    // Phase 3: overlay fades once the exit choreography lands
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 6000);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={cn(
          "fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden",
          "bg-linear-to-b from-white via-amber-50 to-orange-50",
        )}
      >
        {/* Phase 1 & 2: Slack-like lines */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={
            phase === "exit"
              ? { opacity: 0, scale: 0.96, filter: "blur(10px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <SlackIntro animateOut={animateOut} />
        </motion.div>

        {/* Phase 2 & 3: Orbital stack */}
        <motion.div
          initial={{ opacity: 0, y: 56, scale: 0.94, filter: "blur(6px)" }}
          animate={
            showOrbital
              ? phase === "exit"
                ? { opacity: 0, y: -32, scale: 0.96, filter: "blur(8px)" }
                : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, y: 56, scale: 0.94, filter: "blur(6px)" }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <OrbitingItems3D
            radiusX={100}
            radiusY={25}
            tiltAngle={330}
            duration={9}
            containerClassName="py-16"
          />
        </motion.div>

        {/* Progress indicator dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-8 flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-amber-400"
              animate={{
                scale:
                  phase === "lines" && i === 0
                    ? 1.2
                    : phase === "orbital" && i === 1
                      ? 1.2
                      : phase === "exit" && i === 2
                        ? 1.2
                        : 0.8,
                opacity:
                  phase === "lines" && i === 0
                    ? 1
                    : phase === "orbital" && i <= 1
                      ? 0.7
                      : phase === "exit"
                        ? 0.5
                        : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
