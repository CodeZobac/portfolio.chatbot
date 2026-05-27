import { Brain, Sparkles, CircuitBoard, Cpu, Bot, Network } from "lucide-react";
import { useEffect, useState } from "react";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export const CenterIcon = (
  <Icons.logo
    className="center z-1 h-32 w-32 animate-float rounded-full bg-linear-to-br from-amber-400 via-orange-400 to-rose-400 p-8 shadow-2xl text-white"
    style={{
      boxShadow:
        "0 0 40px 15px rgba(232, 168, 56, 0.4), 0 0 80px 30px rgba(249, 115, 22, 0.2)",
    }}
  />
);

const iconColors = [
  "text-amber-500",
  "text-orange-500",
  "text-rose-500",
  "text-emerald-500",
  "text-sky-500",
  "text-violet-500",
];

export const LucideIcons = [
  <Brain key="brain" className={cn("h-12 w-12", iconColors[0])} />,
  <Sparkles key="sparkles" className={cn("h-12 w-12", iconColors[1])} />,
  <CircuitBoard
    key="circuit-board"
    className={cn("h-12 w-12", iconColors[2])}
  />,
  <Cpu key="cpu" className={cn("h-12 w-12", iconColors[3])} />,
  <Bot key="bot" className={cn("h-12 w-12", iconColors[4])} />,
  <Network key="network" className={cn("h-12 w-12", iconColors[5])} />,
];

interface OrbitingItems3DProps {
  /**
   * The radius of the ellipse on X-axis in percentage, relative to the container.
   */
  radiusX: number;

  /**
   * The radius of the ellipse on Y-axis in percentage, relative to the container.
   */
  radiusY: number;

  /**
   * The angle at which ellipse is tilted to x-axis.
   */
  tiltAngle: number;

  /**
   * The time taken for the revolution around the center element.
   */
  duration: number;

  /**
   * The items to orbit around the center of the parent element.
   */
  items?: React.ReactNode[];

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

function OrbitingItem({
  index,
  radiusX,
  radiusY,
  totalItems,
  tiltAngle,
  duration,
  children,
}: {
  index: number;
  radiusX: number;
  radiusY: number;
  totalItems: number;
  tiltAngle: number;
  duration: number;
  children: React.ReactNode;
}) {
  const angleStep = 360 / totalItems;
  const [angle, setAngle] = useState(index * angleStep);

  useEffect(() => {
    const animation = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 1) % 360);
    }, duration);
    return () => clearInterval(animation);
  }, [duration]);

  const radians = (angle * Math.PI) / 180;
  const x = radiusX * Math.cos(radians);
  const y = radiusY * Math.sin(radians);

  const tiltRadians = (tiltAngle * Math.PI) / 180;
  const xTilted = x * Math.cos(tiltRadians) - y * Math.sin(tiltRadians);
  const yTilted = x * Math.sin(tiltRadians) + y * Math.cos(tiltRadians);
  const zIndex = angle > 180 ? 0 : 3;
  const scale = angle < 180 ? 1.2 : 0.9;

  return (
    <div
      className="absolute flex h-20 w-20 items-center justify-center rounded-full border border-amber-200/30 bg-white/80 shadow-2xl shadow-amber-500/20 backdrop-blur-xl transition-transform duration-500 ease-out"
      style={{
        left: `${50 + xTilted}%`,
        top: `${50 + yTilted}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex,
        transition: "transform 0.8s ease-in-out",
      }}
    >
      <div className="transition-transform ease-linear direction-reverse repeat-infinite">
        {children}
      </div>
    </div>
  );
}

export default function OrbitingItems3D({
  radiusX = 120,
  radiusY = 30,
  tiltAngle = 360 - 30,
  duration = 25,
  items = LucideIcons,
  backgroundClassName,
  containerClassName,
  className,
}: OrbitingItems3DProps) {
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
          "relative flex h-64 w-64 items-center justify-center ease-linear repeat-infinite",
          className,
        )}
      >
        {CenterIcon}
        {items.map((item, index) => (
          <OrbitingItem
            key={index}
            index={index}
            radiusX={radiusX}
            radiusY={radiusY}
            totalItems={items.length}
            tiltAngle={tiltAngle}
            duration={duration}
          >
            {item}
          </OrbitingItem>
        ))}
      </div>
    </div>
  );
}
