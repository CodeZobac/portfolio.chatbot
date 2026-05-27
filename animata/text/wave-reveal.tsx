"use client";

import { cn } from "@/lib/utils";

interface WaveRevealProps {
  text: string;
  className?: string;
  blur?: boolean;
  direction?: "up" | "down";
  delay?: number;
  duration?: string;
}

export default function WaveReveal({
  text,
  className,
  blur = false,
  direction = "up",
  delay = 0,
  duration = "1000ms",
}: WaveRevealProps) {
  const chars = text.split("");

  return (
    <span
      className={cn("inline-flex", className)}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className={cn(
            "inline-block",
            blur && "animate-pulse",
          )}
          style={{
            animation: `waveReveal ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            animationDelay: `${i * 50 + delay}ms`,
            opacity: 0,
            transform:
              direction === "up"
                ? "translateY(20px)"
                : "translateY(-20px)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      <style jsx>{`
        @keyframes waveReveal {
          0% {
            opacity: 0;
            transform: translateY(${direction === "up" ? "20px" : "-20px"});
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </span>
  );
}
