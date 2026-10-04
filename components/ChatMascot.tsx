"use client";

import { useEffect, useRef } from "react";
import styles from "./ChatMascot.module.css";

// Matching cubic segments let the wire uncoil without replacing the drawing.
const FOLDED_WIRE = "M49 34 C49 46 49 58 49 70 C49 79 43 85 35 85 C27 85 21 79 21 70 C21 56 21 43 21 29 C21 17 29 10 40 10 C51 10 59 17 59 29 C59 43 59 56 59 70 C59 85 49 93 35 93 C21 93 11 83 11 70 C11 58 11 46 11 34";
const LOOSENED_WIRE = "M76 10 C97 18 103 43 86 60 C72 77 53 83 39 78 C25 74 17 55 21 34 C25 12 41 -10 59 -21 C75 -32 92 -23 90 -7 C87 10 65 20 54 36 C43 52 63 69 56 81 C49 95 33 99 22 89 C13 81 11 65 11 53 C11 46 11 40 11 34";
const UNFOLDED_WIRE = "M112 -122 C128 -122 136 -104 131 -89 C126 -72 107 -64 90 -63 C72 -62 58 -72 59 -87 C60 -99 73 -103 81 -95 C91 -85 77 -66 62 -54 C45 -40 28 -33 24 -14 C20 2 33 12 43 25 C55 39 62 54 53 67 C45 80 26 79 18 87 C16 89 14 91 11 94";
const UNFOLD_VALUES = [FOLDED_WIRE, LOOSENED_WIRE, UNFOLDED_WIRE, UNFOLDED_WIRE, LOOSENED_WIRE, FOLDED_WIRE].join(";");

const REACTIONS = [
  { name: "hello", duration: 1500, frames: [
    { transform: "perspective(240px) rotateY(0deg) rotateX(0deg)" },
    { transform: "perspective(240px) rotateY(-16deg) rotateX(6deg) translateY(-3px)", offset: 0.25 },
    { transform: "perspective(240px) rotateY(10deg) rotateX(-4deg) translateY(-3px)", offset: 0.65 },
    { transform: "perspective(240px) rotateY(0deg) rotateX(0deg)" },
  ] },
  { name: "stretch", duration: 2600, frames: [
    { transform: "translateY(0)" },
    { transform: "translateY(0)" },
  ] },
  { name: "tongue", duration: 1400, frames: [
    { transform: "perspective(240px) rotateX(0deg) rotateY(0deg)" },
    { transform: "perspective(240px) rotateX(-12deg) rotateY(-12deg) scale(1.06)", offset: 0.3 },
    { transform: "perspective(240px) rotateX(-8deg) rotateY(10deg) scale(1.06)", offset: 0.7 },
    { transform: "perspective(240px) rotateX(0deg) rotateY(0deg)" },
  ] },
] satisfies Array<{ name: string; duration: number; frames: Keyframe[] }>;

/** Playful paperclip companion; chat state remains owned by PortfolioChat. */
export default function ChatMascot({ busy }: { busy: boolean }) {
  const mascotRef = useRef<HTMLButtonElement>(null);
  const reactionRef = useRef<SVGGElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const nextReactionRef = useRef(0);
  const morphRefs = useRef<Array<SVGAnimateElement | null>>([]);

  const playReaction = () => {
    const target = reactionRef.current;
    if (!target) return;
    const reaction = REACTIONS[nextReactionRef.current];
    nextReactionRef.current = (nextReactionRef.current + 1) % REACTIONS.length;
    animationRef.current?.cancel();
    morphRefs.current.forEach((morph) => morph?.endElement());
    mascotRef.current?.removeAttribute("data-reaction");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) mascotRef.current?.setAttribute("data-reaction", reaction.name);
    const animation = target.animate(
      reducedMotion ? [{ opacity: 1 }, { opacity: 0.65 }, { opacity: 1 }] : reaction.frames,
      { duration: reducedMotion ? 140 : reaction.duration, easing: "ease-in-out" },
    );
    animation.id = `mascot-${reaction.name}`;
    animationRef.current = animation;
    if (!reducedMotion && reaction.name === "stretch") {
      morphRefs.current.forEach((morph) => morph?.beginElement());
    }
    animation.onfinish = () => {
      if (animationRef.current === animation) {
        animationRef.current = null;
        mascotRef.current?.removeAttribute("data-reaction");
        morphRefs.current.forEach((morph) => morph?.endElement());
      }
      animation.cancel();
    };
  };

  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const morphs = morphRefs.current;
    let frame: number | null = null;

    const resetEyes = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      mascot.style.setProperty("--eye-x", "0px");
      mascot.style.setProperty("--eye-y", "0px");
    };

    const followPointer = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      if (frame !== null) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const bounds = mascot.getBoundingClientRect();
        const centerX = bounds.left + bounds.width * 0.48;
        const centerY = bounds.top + bounds.height * 0.32;
        const x = Math.max(-1, Math.min(1, (event.clientX - centerX) / 160));
        const y = Math.max(-1, Math.min(1, (event.clientY - centerY) / 120));

        mascot.style.setProperty("--eye-x", `${(x * 3.2).toFixed(2)}px`);
        mascot.style.setProperty("--eye-y", `${(y * 2.4).toFixed(2)}px`);
        frame = null;
      });
    };

    const handleMotionPreference = () => {
      resetEyes();
      animationRef.current?.cancel();
      animationRef.current = null;
      mascot.removeAttribute("data-reaction");
      morphs.forEach((morph) => morph?.endElement());
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    window.addEventListener("blur", resetEyes);
    document.documentElement.addEventListener("pointerleave", resetEyes);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      resetEyes();
      animationRef.current?.cancel();
      morphs.forEach((morph) => morph?.endElement());
      window.removeEventListener("pointermove", followPointer);
      window.removeEventListener("blur", resetEyes);
      document.documentElement.removeEventListener("pointerleave", resetEyes);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <button
      ref={mascotRef}
      type="button"
      className={styles.mascot}
      data-busy={busy}
      aria-label="Play with paperclip mascot"
      onClick={playReaction}
    >
      <svg className={styles.figure} viewBox="0 0 80 100" fill="none" focusable="false" aria-hidden="true">
        <ellipse className={styles.shadow} cx="40" cy="94" rx="23" ry="3" />
        <g ref={reactionRef} className={styles.reaction}>
        <g className={styles.character}>
          <g className={styles.clip}>
            <path
              className={styles.wireOutline}
              d={FOLDED_WIRE}
            >
              <animate ref={(element) => { morphRefs.current[0] = element as SVGAnimateElement | null; }} attributeName="d" values={UNFOLD_VALUES} keyTimes="0;0.18;0.43;0.57;0.82;1" dur="2.6s" begin="indefinite" fill="remove" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1" />
            </path>
            <path
              className={styles.wire}
              d={FOLDED_WIRE}
            >
              <animate ref={(element) => { morphRefs.current[1] = element as SVGAnimateElement | null; }} attributeName="d" values={UNFOLD_VALUES} keyTimes="0;0.18;0.43;0.57;0.82;1" dur="2.6s" begin="indefinite" fill="remove" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1" />
            </path>
            <path className={styles.highlight} d="M24 29C24 19 30 13 40 13M56 54V70C56 82 47 90 35 90" />
            <g className={styles.unfoldFace}>
            <g className={styles.brows}>
              <path d="M18 27Q25 20 33 25M40 24Q48 19 55 26" />
            </g>
            <g className={styles.eyes}>
              <ellipse className={styles.eye} cx="27" cy="36" rx="10" ry="12" transform="rotate(-8 27 36)" />
              <ellipse className={styles.eye} cx="47" cy="35" rx="10" ry="12" transform="rotate(8 47 35)" />
              <g className={styles.eyeTrack}>
                <g className={styles.pupils}>
                  <ellipse className={styles.pupil} cx="30" cy="38" rx="3.5" ry="5" />
                  <ellipse className={styles.pupil} cx="50" cy="37" rx="3.5" ry="5" />
                  <circle className={styles.eyeGlint} cx="31" cy="36" r="1.2" />
                  <circle className={styles.eyeGlint} cx="51" cy="35" r="1.2" />
                </g>
              </g>
            </g>
            <path className={styles.smile} d="M32 54Q38 59 44 53" />
            <g className={styles.cheekyFace}>
              <g className={styles.puffedCheeks}>
                <ellipse cx="28" cy="51" rx="4.5" ry="3.5" />
                <ellipse cx="48" cy="51" rx="4.5" ry="3.5" />
              </g>
              <ellipse className={styles.openMouth} cx="38" cy="54" rx="5.5" ry="2.7" />
              <g className={styles.tongue}>
                <g className={styles.tongueTip}>
                  <path className={styles.tongueShape} d="M33 54Q38 52 43 54L46 65C48 75 32 76 31 67Q31 61 33 54Z" />
                  <path className={styles.tongueCrease} d="M38 56Q40 62 39 67" />
                </g>
              </g>
              <g transform="translate(39 68)">
                {[0, 1, 2, 3].map((drop) => (
                  <ellipse key={drop} className={styles.droplet} rx="1.6" ry="0.9" />
                ))}
              </g>
            </g>
            </g>
            <g className={styles.greeting}>
              <g className={styles.wavingArm}>
                <path className={styles.armOutline} d="M55 59Q72 57 68 35" />
                <path className={styles.armWire} d="M55 59Q72 57 68 35" />
                <path className={styles.wavePalm} d="M65 37L61 30Q60 28 62 28L65 31L64 23Q64 21 66 22L68 29L69 21Q71 19 72 22L72 29L75 24Q77 23 77 26L74 34Q73 40 68 40Z" />
              </g>
              <text className={styles.helloLabel} x="56" y="13">Hi!</text>
            </g>
          </g>
        </g>
        {busy && (
          <g className={styles.typewriter}>
            <g className={styles.carriage}>
              <path className={styles.paper} d="M28 67V48Q43 44 58 48V67Z" />
              <g className={styles.ink}>
                <path className={styles.inkLine} d="M33 52H51" />
                <path className={styles.inkLine} d="M33 56H49" />
                <path className={styles.inkLine} d="M33 60H52" />
              </g>
              <rect className={styles.roller} x="15" y="64" width="51" height="7" rx="3" />
              <path className={styles.metal} d="M15 67H7V60M66 67H72" />
              <circle className={styles.knob} cx="70" cy="67" r="3" />
            </g>
            <path className={styles.machineBody} d="M17 70Q40 65 63 70L72 88Q73 94 67 95H13Q7 94 8 88Z" />
            <path className={styles.machineInset} d="M20 76H60L65 87H15Z" />
            <path className={styles.machineTrim} d="M18 72Q40 68 62 72M13 93H67" />
            <g className={styles.keys}>
              {[0, 1, 2].map((row) => (
                <g key={row}>
                  {[0, 1, 2, 3, 4, 5, 6].map((column) => (
                    <circle
                      key={column}
                      className={styles.key}
                      cx={21 + column * 6.3 - row}
                      cy={78 + row * 4.5}
                      r="1.7"
                      style={{ animationDelay: `${((column * 3 + row * 2) % 7) * -0.1}s` }}
                    />
                  ))}
                </g>
              ))}
            </g>
            <rect className={styles.spacebar} x="27" y="90" width="26" height="2" rx="1" />
            <g className={styles.typingHands}>
              <g className={styles.leftHand}>
                <path className={styles.armOutline} d="M20 55Q9 63 19 74L28 80" />
                <path className={styles.armWire} d="M20 55Q9 63 19 74L28 80" />
                <ellipse className={styles.hand} cx="28" cy="80" rx="4" ry="2.5" />
              </g>
              <g className={styles.rightHand}>
                <path className={styles.armOutline} d="M55 54Q69 62 62 73L52 81" />
                <path className={styles.armWire} d="M55 54Q69 62 62 73L52 81" />
                <ellipse className={styles.hand} cx="52" cy="81" rx="4" ry="2.5" />
              </g>
            </g>
          </g>
        )}
        </g>
      </svg>
    </button>
  );
}
