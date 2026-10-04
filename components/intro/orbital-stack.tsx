"use client";

import { useId } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { TECH_STACK, type TechIcon } from "@/components/intro/tech-icons";
import { cn } from "@/lib/utils";

interface OrbitingItems3DProps {
  /**
   * The radius of the ellipse on X-axis in percentage, relative to the container.
   */
  radiusX?: number;

  /**
   * The radius of the ellipse on Y-axis in percentage, relative to the container.
   */
  radiusY?: number;

  /**
   * The angle at which the ellipse is tilted relative to the x-axis, in degrees.
   */
  tiltAngle?: number;

  /**
   * Seconds per full revolution around the center element.
   */
  duration?: number;

  /**
   * The tech items to orbit around the center of the parent element.
   */
  items?: TechIcon[];

  /**
   * Class name for the background element.
   */
  backgroundClassName?: string;

  /**
   * Class name for the container element.
   */
  containerClassName?: string;

  /**
   * Additional classes for the item container.
   */
  className?: string;
}

/**
 * A single orbiting tile. All motion is derived from the shared `angle`
 * MotionValue via transforms, so the orbit runs on the animation frame
 * loop without triggering React re-renders.
 */
function OrbitingItem({
  index,
  totalItems,
  angle,
  radiusX,
  radiusY,
  tiltAngle,
  icon,
}: {
  index: number;
  totalItems: number;
  angle: MotionValue<number>;
  radiusX: number;
  radiusY: number;
  tiltAngle: number;
  icon: TechIcon;
}) {
  const angleStep = 360 / totalItems;
  const tiltRadians = (tiltAngle * Math.PI) / 180;
  const cosTilt = Math.cos(tiltRadians);
  const sinTilt = Math.sin(tiltRadians);

  // Position of this item on the (tilted) ellipse, in container %.
  const theta = useTransform(angle, (a) => {
    const deg = (((a + index * angleStep) % 360) + 360) % 360;
    return (deg * Math.PI) / 180;
  });

  const left = useTransform(theta, (rad) => {
    const x = radiusX * Math.cos(rad);
    const y = radiusY * Math.sin(rad);
    return `${50 + x * cosTilt - y * sinTilt}%`;
  });

  const top = useTransform(theta, (rad) => {
    const x = radiusX * Math.cos(rad);
    const y = radiusY * Math.sin(rad);
    return `${50 + x * sinTilt + y * cosTilt}%`;
  });

  // Continuous depth along the orbit: +1 at the closest point, -1 at the
  // farthest. Drives scale, opacity, blur and stacking for a true 3D feel.
  const depth = useTransform(theta, (rad) => Math.sin(rad));
  const depthNorm = useTransform(depth, (d) => (d + 1) / 2);

  const scale = useTransform(depthNorm, [0, 1], [0.72, 1.18]);
  const opacity = useTransform(depthNorm, [0, 1], [0.45, 1]);
  const filter = useTransform(
    depthNorm,
    (n) => `blur(${((1 - n) * 2.5).toFixed(2)}px)`,
  );
  const zIndex = useTransform(depth, (d) => Math.round(10 + d * 9));

  return (
    <motion.div
      className="absolute flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center gap-0.5 rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xl"
      style={{
        left,
        top,
        x: "-50%",
        y: "-50%",
        scale,
        opacity,
        filter,
        zIndex,
        boxShadow: `0 8px 24px -6px ${icon.hex}40, 0 2px 8px rgba(120, 72, 20, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)`,
      }}
    >
      <svg
        role="img"
        aria-label={icon.name}
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill={icon.hex}
      >
        <path d={icon.path} />
      </svg>
      <span className="text-[8px] font-semibold uppercase tracking-widest text-stone-500">
        {icon.name}
      </span>
    </motion.div>
  );
}

/**
 * The gradient ellipse the items travel along — gives the orbit a visible,
 * softly glowing track instead of icons floating in a void.
 */
function OrbitTrack({
  radiusX,
  radiusY,
  tiltAngle,
}: {
  radiusX: number;
  radiusY: number;
  tiltAngle: number;
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="orbit-track" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(251, 191, 36, 0)" />
          <stop offset="35%" stopColor="rgba(251, 146, 60, 0.55)" />
          <stop offset="65%" stopColor="rgba(244, 63, 94, 0.35)" />
          <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
        </linearGradient>
      </defs>
      <ellipse
        cx="50"
        cy="50"
        rx={radiusX}
        ry={radiusY}
        transform={`rotate(${tiltAngle} 50 50)`}
        fill="none"
        stroke="url(#orbit-track)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function CenterEmblem() {
  const id = useId();
  const reducedMotion = useReducedMotion();
  const surfaceId = `${id}-surface`;
  const textureId = `${id}-texture`;
  const rimId = `${id}-rim`;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none relative z-10 flex h-28 w-28 shrink-0 items-center justify-center"
      animate={reducedMotion ? { y: 0 } : { y: [-4, 4, -4] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
    >
      {/* A broad corona stays behind the sharply defined spherical surface. */}
      <motion.div
        className="absolute h-44 w-44 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--color-sun-surface) 15%, color-mix(in oklch, var(--color-sun-surface) 45%, transparent) 40%, transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={reducedMotion ? { scale: 1, opacity: 0.65 } : { scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
      />
      <svg
        viewBox="0 0 112 112"
        focusable="false"
        className="relative h-28 w-28 overflow-visible"
        style={{ filter: "drop-shadow(0 0 8px color-mix(in oklch, var(--color-sun-surface) 65%, transparent))" }}
      >
        <defs>
          <radialGradient id={surfaceId} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="var(--color-paper)" />
            <stop offset="23%" stopColor="color-mix(in oklch, var(--color-paper) 65%, var(--color-sun-surface))" />
            <stop offset="58%" stopColor="var(--color-sun-surface)" />
            <stop offset="88%" stopColor="var(--color-accent-strong)" />
            <stop offset="100%" stopColor="color-mix(in oklch, var(--color-accent-strong) 80%, var(--color-accent-ink))" />
          </radialGradient>
          <radialGradient id={rimId}>
            <stop offset="87%" stopColor="var(--color-paper)" stopOpacity="0" />
            <stop offset="98%" stopColor="var(--color-paper)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-paper)" stopOpacity="0.65" />
          </radialGradient>
          {/* Static, deterministic granulation, clipped to the sphere's alpha. */}
          <filter id={textureId} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.17" numOctaves="3" seed="8" />
            <feColorMatrix type="saturate" values="0" />
            <feComposite in2="SourceGraphic" operator="in" />
            <feBlend in2="SourceGraphic" mode="soft-light" />
          </filter>
        </defs>
        <circle cx="56" cy="56" r="55" fill={`url(#${surfaceId})`} />
        <circle cx="56" cy="56" r="55" fill={`url(#${surfaceId})`} filter={`url(#${textureId})`} opacity="0.32" />
        <circle cx="56" cy="56" r="55" fill={`url(#${rimId})`} />
      </svg>
    </motion.div>
  );
}

export default function OrbitingItems3D({
  radiusX = 120,
  radiusY = 30,
  tiltAngle = 330,
  duration = 9,
  items = TECH_STACK,
  backgroundClassName,
  containerClassName,
  className,
}: OrbitingItems3DProps) {
  const angle = useMotionValue(0);

  // Frame-driven rotation — buttery smooth, no interval stepping.
  useAnimationFrame((time) => {
    angle.set((time / 1000) * (360 / duration));
  });

  return (
    <div
      className={cn(
        "full-content group flex items-center justify-center py-32",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 h-full w-full items-center bg-linear-to-br from-white via-amber-50 to-orange-50",
          backgroundClassName,
        )}
      />
      <div
        className={cn(
          "relative flex h-64 w-64 items-center justify-center",
          className,
        )}
      >
        <OrbitTrack radiusX={radiusX} radiusY={radiusY} tiltAngle={tiltAngle} />
        <CenterEmblem />
        {items.map((icon, index) => (
          <OrbitingItem
            key={icon.name}
            index={index}
            totalItems={items.length}
            angle={angle}
            radiusX={radiusX}
            radiusY={radiusY}
            tiltAngle={tiltAngle}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
}
