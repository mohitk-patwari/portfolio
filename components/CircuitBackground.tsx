import { useEffect, useRef } from "react";
import { animate, createDrawable, createScope, onScroll, stagger } from "animejs";

interface CircuitBackgroundProps {
  className?: string;
}

const CircuitBackground = ({ className }: CircuitBackgroundProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const scope = createScope({ root: svgRef }).add(() => {
      animate(createDrawable(".circuit-main path"), {
        draw: ["0 0", "0 1"],
        ease: "linear",
        duration: 1000,
        delay: stagger(200),
        autoplay: onScroll({
          target: svgRef.current,
          sync: 0.5,
          enter: "top bottom",
          leave: "bottom top",
        }),
      });

      animate(createDrawable(".circuit-accent path"), {
        draw: ["0 0", "0 1"],
        ease: "linear",
        duration: 800,
        delay: stagger(150, { start: 300 }),
        autoplay: onScroll({
          target: svgRef.current,
          sync: 0.4,
          enter: "top bottom",
          leave: "bottom top",
        }),
      });

      animate(".circuit-nodes circle", {
        opacity: [0, 1],
        scale: [0, 1],
        duration: 400,
        delay: stagger(80, { start: 600 }),
        ease: "outBack(2)",
        autoplay: onScroll({
          target: svgRef.current,
          enter: "top 80%",
        }),
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="circuit-blur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <g
          className="circuit-main"
          stroke="#1e4976"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 0 150 L 200 150 L 200 200 L 400 200 L 400 150 L 800 150" />
          <path d="M 0 400 L 150 400 L 150 350 L 600 350 L 600 400 L 800 400" />
          <path d="M 100 0 L 100 100 L 300 100 L 300 500 L 100 500 L 100 600" />
        </g>

        <g
          className="circuit-accent"
          stroke="#3dd6c840"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 200 150 L 200 50 L 500 50" />
          <path d="M 400 200 L 400 300 L 700 300 L 700 200" />
          <path d="M 600 350 L 600 250 L 750 250 L 750 600" />
        </g>

        <g
          className="circuit-nodes"
          stroke="#3dd6c860"
          fill="#3dd6c820"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="200" cy="150" r="3" />
          <circle cx="400" cy="150" r="3" />
          <circle cx="400" cy="200" r="3" />
          <circle cx="150" cy="400" r="3" />
          <circle cx="600" cy="400" r="3" />
          <circle cx="300" cy="100" r="3" />
          <circle cx="300" cy="500" r="3" />
          <circle cx="600" cy="350" r="3" />
        </g>

        <g
          className="circuit-glow"
          stroke="#3dd6c820"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#circuit-blur)"
        >
          <path d="M 200 150 L 200 50 L 500 50" />
          <path d="M 400 200 L 400 300 L 700 300 L 700 200" />
          <path d="M 600 350 L 600 250 L 750 250 L 750 600" />
        </g>
      </svg>
    </div>
  );
};

export default CircuitBackground;
