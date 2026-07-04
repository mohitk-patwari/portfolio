import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type PortalTheme = "drawing" | "wildlife";
type Phase = "glitch" | "tear" | "flood";

interface PortalTransitionProps {
  isActive: boolean;
  destination: string;
  theme: PortalTheme;
  onComplete: () => void;
}

const THEME_CONFIG: Record<PortalTheme, { flood: string; accent: string; label: string }> = {
  drawing: { flood: "#faf6f1", accent: "#c17f3a", label: "DRAWING" },
  wildlife: { flood: "#0d1f0f", accent: "#4a9e5c", label: "WILDLIFE" },
};

const PortalTransition = ({ isActive, destination, theme, onComplete }: PortalTransitionProps) => {
  const [phase, setPhase] = useState<Phase>("glitch");
  const [floodText, setFloodText] = useState("ACCESS GRANTED");
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const config = THEME_CONFIG[theme];

  useEffect(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    if (!isActive) {
      setPhase("glitch");
      setFloodText("ACCESS GRANTED");
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    setPhase("glitch");
    setFloodText("ACCESS GRANTED");

    timeouts.current.push(setTimeout(() => setPhase("tear"), 400));
    timeouts.current.push(setTimeout(() => setPhase("flood"), 900));
    timeouts.current.push(
      setTimeout(() => setFloodText(`ENTERING ${config.label}`), 1150)
    );
    timeouts.current.push(setTimeout(() => onComplete(), 1400));

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, destination, theme]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] overflow-hidden"
          aria-hidden="true"
        >
          {/* Dark base — cracks apart along the center seam */}
          <motion.div
            className="absolute inset-x-0 top-0 z-10 h-1/2 bg-sapphire"
            animate={{ y: phase === "glitch" ? 0 : -14 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-sapphire"
            animate={{ y: phase === "glitch" ? 0 : 14 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Warm light tearing through the seam */}
          <motion.div
            className="absolute inset-x-0 top-1/2 z-[5] -translate-y-1/2"
            style={{
              backgroundImage: "linear-gradient(90deg, #e6d44a, #c9593a, transparent)",
            }}
            animate={{
              height: phase === "glitch" ? 0 : phase === "tear" ? 48 : "100%",
              opacity: phase === "glitch" ? 0 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Phase 1 — RGB-split glitch text */}
          {phase === "glitch" && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="relative font-display text-2xl tracking-[0.3em] text-butter">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 text-[#ff2b4d] mix-blend-screen"
                  style={{ animation: "portal-rgb-jitter 0.12s steps(2, end) infinite" }}
                >
                  ACCESSING...
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 text-tealcyber mix-blend-screen"
                  style={{
                    animation: "portal-rgb-jitter 0.12s steps(2, end) infinite reverse",
                  }}
                >
                  ACCESSING...
                </span>
                <span className="relative">ACCESSING...</span>
              </div>
            </div>
          )}

          {/* Intensified scanlines during the glitch phase */}
          <div
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              opacity: phase === "glitch" ? 1 : 0,
              transition: "opacity 0.2s ease-out",
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
            }}
          />

          {/* Phase 3 — flood */}
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: config.flood }}
            animate={{ opacity: phase === "flood" ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span
              className="font-display text-sm tracking-[0.35em]"
              style={{ color: config.accent }}
            >
              {floodText}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortalTransition;
