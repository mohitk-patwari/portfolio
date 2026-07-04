import { useEffect, useRef } from "react";
import { animate, createScope, createDrawable, stagger } from "animejs";

interface CornerBracketProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  animDelay?: number;
  className?: string;
}

const CornerBracket = ({
  size = 40,
  color = "#3dd6c8",
  strokeWidth = 2,
  animDelay = 0,
  className,
}: CornerBracketProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const scope = createScope({ root: svgRef }).add(() => {
      animate(createDrawable(".bracket-path"), {
        draw: ["0 0", "0 1"],
        duration: 600,
        delay: stagger(80, { start: animDelay }),
        ease: "outExpo",
      });
    });

    return () => scope.revert();
  }, [animDelay]);

  return (
    <span className={className} aria-hidden="true" style={{ display: "inline-block" }}>
      <svg ref={svgRef} viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <path
          d="M 12 2 L 2 2 L 2 12"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="bracket-path"
        />
        <path
          d={`M ${size - 12} 2 L ${size - 2} 2 L ${size - 2} 12`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="bracket-path"
        />
        <path
          d={`M 2 ${size - 12} L 2 ${size - 2} L 12 ${size - 2}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="bracket-path"
        />
        <path
          d={`M ${size - 12} ${size - 2} L ${size - 2} ${size - 2} L ${size - 2} ${size - 12}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="bracket-path"
        />
      </svg>
    </span>
  );
};

export default CornerBracket;
