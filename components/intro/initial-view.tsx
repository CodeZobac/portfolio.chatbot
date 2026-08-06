"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

export interface CircleProps {
  height?: string;
  width?: string;
  bgColor?: string;
  borderRadius?: string;
}

interface CylinderProps {
  text?: string;
  height?: string;
  width?: string;
  bgColor?: string;
  /** Delay (s) before the per-character reveal starts. */
  textDelay?: number;
}

/** Silky ease used across the intro — fast start, long soft landing. */
const SILK = [0.22, 1, 0.36, 1] as const;

const lineSpring = {
  type: "spring",
  stiffness: 64,
  damping: 15,
  mass: 1,
} as const;

const makeLineVariants = (fromLeft: boolean): Variants => ({
  hidden: {
    x: fromLeft ? "-110%" : "110%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ...lineSpring, opacity: { duration: 0.5, ease: "easeOut" } },
  },
  exit: {
    x: fromLeft ? "-120%" : "120%",
    opacity: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.7, 0] },
  },
});

function Circle({
  height = "h-8 md:h-16",
  width = "w-8 md:w-16",
  bgColor = "bg-amber-400",
  borderRadius = "rounded-full",
}: CircleProps) {
  return <div className={cn(height, width, borderRadius, bgColor)} />;
}

/**
 * Per-character reveal: each glyph rises out of the pill with a
 * blur-to-sharp wave, overlapping stagger for a fluid ripple.
 */
function CharacterReveal({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <span
      className="flex items-center whitespace-pre px-4 text-xl font-bold leading-none text-stone-800 md:px-6 md:text-5xl"
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ y: "80%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            ease: SILK,
            delay: delay + i * 0.035,
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

function Cylinder({
  text,
  height = "h-8 md:h-16",
  width = "w-24 md:w-48",
  bgColor = "bg-slate-100",
  textDelay = 0,
}: CylinderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full",
        height,
        width,
        bgColor,
      )}
    >
      {text ? <CharacterReveal text={text} delay={textDelay} /> : null}
    </div>
  );
}

interface LineProps {
  className?: string;
  fromLeft: boolean;
  children: React.ReactNode;
}

function Line({ className, fromLeft, children }: LineProps) {
  return (
    <motion.div variants={makeLineVariants(fromLeft)} className={className}>
      {children}
    </motion.div>
  );
}

export default function SlackIntro({
  animateOut,
}: {
  /**
   * If true, the lines will animate out
   */
  animateOut?: boolean;
}) {
  const common = "flex";

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center gap-1 overflow-hidden bg-linear-to-b from-white via-amber-50/80 to-orange-50/80 py-4 md:gap-3",
      )}
      initial="hidden"
      animate={animateOut ? "exit" : "visible"}
      variants={{
        visible: { transition: { staggerChildren: 0.12 } },
        exit: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {/* Line one — abstract shapes, enters from the right */}
      <Line className={common} fromLeft={false}>
        <Circle
          bgColor="bg-emerald-400"
          borderRadius="rounded-t-full rounded-bl-full"
        />
        <Circle />
        <Cylinder bgColor="bg-amber-500" />
        <Cylinder bgColor="bg-amber-400" width="w-56 md:w-[300px]" />
        <Cylinder bgColor="bg-amber-400" />
      </Line>

      {/* Line two — the name, enters from the left */}
      <Line className={common} fromLeft>
        <Circle bgColor="bg-emerald-400" />
        <Cylinder text="CodeZobac" width="w-64 md:w-[400px]" textDelay={0.35} />
        <Circle
          bgColor="bg-emerald-400"
          borderRadius="rounded-t-full rounded-bl-full"
        />
        <Circle bgColor="bg-emerald-400" />
        <Cylinder bgColor="bg-amber-500" />
      </Line>

      {/* Line three — AI & Data, enters from the right */}
      <Line className={common} fromLeft={false}>
        <Cylinder bgColor="bg-sky-400" />
        <Circle
          bgColor="bg-amber-500"
          borderRadius="rounded-t-full rounded-br-full"
        />
        <Circle bgColor="bg-sky-400" />
        <Cylinder text="AI & Data" width="w-64 md:w-[600px]" textDelay={0.55} />
        <Circle bgColor="bg-amber-500" />
        <Cylinder bgColor="bg-sky-400" />
      </Line>

      {/* Line four — the title, enters from the left */}
      <Line className={common} fromLeft>
        <Circle bgColor="bg-rose-400" />
        <Cylinder
          text="Solutions Architect"
          width="w-96 md:w-[700px]"
          textDelay={0.75}
        />
        <Circle
          bgColor="bg-rose-400"
          borderRadius="rounded-t-full rounded-br-full"
        />
      </Line>

      {/* Line five — abstract shapes, enters from the right */}
      <Line className={common} fromLeft={false}>
        <Cylinder bgColor="bg-amber-500" />
        <Cylinder bgColor="bg-amber-400" width="w-32 md:w-[400px]" />
        <Circle bgColor="bg-amber-400" />
        <Cylinder bgColor="bg-amber-500" />
      </Line>
    </motion.div>
  );
}
