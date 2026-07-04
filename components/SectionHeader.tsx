import CornerBracket from "./CornerBracket";
import GlitchText from "./GlitchText";

interface SectionHeaderProps {
  label: string;
  heading: string;
  as?: "h2" | "h3";
  className?: string;
  animDelay?: number;
}

const SectionHeader = ({
  label,
  heading,
  as = "h2",
  className,
  animDelay = 0,
}: SectionHeaderProps) => {
  return (
    <div className={`relative inline-block ${className ?? ""}`.trim()}>
      <div className="relative inline-flex items-start gap-3">
        <div className="flex flex-col justify-center">
          <CornerBracket
            size={48}
            color="#3dd6c8"
            strokeWidth={1.5}
            animDelay={animDelay}
            className="opacity-60"
          />
        </div>

        <div className="flex flex-col">
          <p className="mono-label mb-1">{label}</p>
          <GlitchText
            text={heading}
            as={as}
            className="font-display text-3xl md:text-4xl text-lemon glow-lemon"
            scrambleOnHover={true}
            animDelay={animDelay + 200}
            scrambleDuration={800}
          />
        </div>

        <div className="flex flex-col justify-center self-end">
          <CornerBracket
            size={48}
            color="#3dd6c8"
            strokeWidth={1.5}
            animDelay={animDelay + 100}
            className="opacity-60 rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
