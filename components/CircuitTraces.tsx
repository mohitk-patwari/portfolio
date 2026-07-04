import { useEffect, useRef } from "react";
import { animate, createDrawable, createScope, stagger } from "animejs";

type CircuitTracesProps = {
  className?: string;
};

const CircuitTraces = ({ className }: CircuitTracesProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const scope = createScope({ root: svgRef }).add(() => {
      const mainPaths = svgEl.querySelectorAll(".ct-main path");
      mainPaths.forEach((path, i) => {
        animate(createDrawable(path), {
          draw: ["0 0", "0 1"],
          duration: 1200,
          delay: i * 180,
          ease: "linear",
          autoplay: {
            type: "scroll",
            target: svgEl,
            enter: "bottom 90%",
            leave: "top 10%",
            sync: true,
          },
        });
      });

      const accentPaths = svgEl.querySelectorAll(".ct-accent path");
      accentPaths.forEach((path, i) => {
        animate(createDrawable(path), {
          draw: ["0 0", "0 1"],
          duration: 900,
          delay: i * 120 + 400,
          ease: "linear",
          autoplay: {
            type: "scroll",
            target: svgEl,
            enter: "bottom 90%",
            leave: "top 10%",
            sync: true,
          },
        });
      });

      animate(".ct-nodes circle", {
        opacity: [0, 1],
        scale: [0, 1],
        duration: 400,
        delay: stagger(80, { start: 600 }),
        ease: "outBack(2)",
        autoplay: {
          type: "scroll",
          target: svgEl,
          enter: "bottom 85%",
        },
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div
      className={`pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
      ref={containerRef}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 400"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="ct-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          className="ct-main"
          stroke="#1e4976"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 0 80 L 300 80 L 300 140 L 600 140 L 600 80 L 1200 80" />
          <path d="M 0 280 L 200 280 L 200 220 L 800 220 L 800 280 L 1200 280" />
          <path d="M 150 0 L 150 120 L 450 120 L 450 400" />
          <path d="M 900 0 L 900 160 L 700 160 L 700 400" />
        </g>

        <g
          className="ct-accent"
          stroke="#3dd6c830"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 300 80 L 300 20 L 700 20" />
          <path d="M 600 140 L 600 240 L 1000 240 L 1000 80" />
          <path d="M 200 280 L 200 360 L 500 360" />
          <path d="M 800 220 L 800 120 L 1050 120 L 1050 0" />
        </g>

        <g
          className="ct-nodes"
          stroke="#3dd6c850"
          fill="#3dd6c815"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="300" cy="80" r="3" />
          <circle cx="600" cy="80" r="3" />
          <circle cx="600" cy="140" r="3" />
          <circle cx="200" cy="280" r="3" />
          <circle cx="800" cy="280" r="3" />
          <circle cx="450" cy="120" r="3" />
          <circle cx="700" cy="160" r="3" />
          <circle cx="800" cy="220" r="3" />
        </g>

        <g
          className="ct-glow-layer"
          filter="url(#ct-glow)"
          opacity="0.25"
          stroke="#3dd6c8"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M 300 80 L 300 20 L 700 20" />
          <path d="M 600 140 L 600 240 L 1000 240 L 1000 80" />
          <path d="M 200 280 L 200 360 L 500 360" />
          <path d="M 800 220 L 800 120 L 1050 120 L 1050 0" />
        </g>
      </svg>
    </div>
  );
};

export default CircuitTraces;
