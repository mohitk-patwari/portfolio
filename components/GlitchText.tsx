import { animate, createScope, stagger } from "animejs";
import { useEffect, useRef } from "react";
import useScrambleText from "../hooks/useScrambleText";

interface GlitchTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span";
  className?: string;
  scrambleOnHover?: boolean;
  animDelay?: number;
  scrambleDuration?: number;
}

const GLITCH_STYLE_ID = "glitch-text-keyframes";

const GlitchText = ({
  text,
  as = "h1",
  className = "",
  scrambleOnHover = false,
  animDelay = 0,
  scrambleDuration = 1200,
}: GlitchTextProps) => {
  const root = useRef<HTMLElement | null>(null);
  const scope = useRef<{ revert: () => void } | null>(null);

  const { displayText, triggerScramble } = useScrambleText(text, {
    trigger: "mount",
    delay: animDelay,
    duration: scrambleDuration,
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (!document.getElementById(GLITCH_STYLE_ID)) {
      const style = document.createElement("style");
      style.id = GLITCH_STYLE_ID;
      style.textContent = `
        @keyframes glitch-clip {
          0%, 90%, 100% { clip-path: inset(50% 0 50% 0); transform: translateX(0); }
          92% { clip-path: inset(10% 0 60% 0); transform: translateX(-4px); }
          94% { clip-path: inset(70% 0 10% 0); transform: translateX(4px); }
          96% { clip-path: inset(30% 0 40% 0); transform: translateX(-2px); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      if (!root.current) {
        return;
      }

      animate(root.current, {
        opacity: [0, 1],
        y: [12, 0],
        duration: 600,
        ease: "outExpo",
        delay: stagger(0, { start: animDelay }),
      });
    });

    return () => {
      scope.current?.revert();
    };
  }, []);

  const Tag = as;
  const shouldScrambleOnHover = scrambleOnHover
    ? { onMouseEnter: triggerScramble }
    : {};

  return (
    <Tag
      ref={root as never}
      data-text={text}
      className={`glitch-text relative ${className}`.trim()}
      style={{ opacity: 0 }}
      {...shouldScrambleOnHover}
    >
      {displayText}
      <style jsx>{`
        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #3dd6c8;
          overflow: hidden;
          animation: glitch-clip 4s infinite;
          pointer-events: none;
        }
      `}</style>
    </Tag>
  );
};

export default GlitchText;
