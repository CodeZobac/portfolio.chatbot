"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { Icons } from "@/components/icons";
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

/** Container is a fixed 16rem (h-64 w-64) square. */
const CONTAINER_PX = 256;

/**
 * A single orbiting tile. All motion is derived from the shared `angle`
 * MotionValue via transforms only (x/y/scale/opacity) — no layout
 * properties and no per-frame filters, so the orbit stays entirely on the
 * GPU compositor and can't jank or stall the main thread.
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

  // Position of this item on the (tilted) ellipse, in radians.
  const theta = useTransform(angle, (a) => {
    const deg = (((a + index * angleStep) % 360) + 360) % 360;
    return (deg * Math.PI) / 180;
  });

  // Pixel offsets from center — animated via transform, never left/top.
  const x = useTransform(theta, (rad) => {
    const ex = radiusX * Math.cos(rad);
    const ey = radiusY * Math.sin(rad);
    return ((ex * cosTilt - ey * sinTilt) / 100) * CONTAINER_PX;
  });

  const y = useTransform(theta, (rad) => {
    const ex = radiusX * Math.cos(rad);
    const ey = radiusY * Math.sin(rad);
    return ((ex * sinTilt + ey * cosTilt) / 100) * CONTAINER_PX;
  });

  // Continuous depth along the orbit: +1 at the closest point, -1 at the
  // farthest. Drives scale, opacity and stacking for the 3D feel.
  const depth = useTransform(theta, (rad) => Math.sin(rad));
  const depthNorm = useTransform(depth, (d) => (d + 1) / 2);

  const scale = useTransform(depthNorm, [0, 1], [0.72, 1.18]);
  const opacity = useTransform(depthNorm, [0, 1], [0.4, 1]);
  // zIndex only flips between a few discrete layers (cheap style write).
  const zIndex = useTransform(depth, (d) => (d > 0.15 ? 12 : d < -0.15 ? 3 : 8));

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center gap-0.5 rounded-2xl border border-white/60 bg-white/95 will-change-transform"
      style={{
        x,
        y,
        marginLeft: "-2.25rem",
        marginTop: "-2.25rem",
        scale,
        opacity,
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
  return (
    <div className="relative z-10 flex items-center justify-center">
      {/* Slow-rotating conic halo */}
      <motion.div
        className="absolute h-44 w-44 rounded-full opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(251,191,36,0) 0%, rgba(251,146,60,0.35) 25%, rgba(244,63,94,0.25) 50%, rgba(251,191,36,0) 75%)",
          filter: "blur(18px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />
      {/* Breathing glow */}
      <motion.div
        className="absolute h-32 w-32 rounded-full bg-amber-400/30"
        style={{ filter: "blur(24px)" }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <Icons.logo
          className="h-28 w-28 rounded-full bg-linear-to-br from-amber-400 via-orange-400 to-rose-400 p-7 text-white"
          style={{
            boxShadow:
              "0 0 40px 12px rgba(232, 168, 56, 0.35), 0 0 90px 30px rgba(249, 115, 22, 0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        />
      </motion.div>
    </div>
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
