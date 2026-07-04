import Image from "next/image";
import { getBlurData, getOptimizedPath } from "../../lib/imagePaths";

interface WildlifeCardProps {
  src: string;
  name: string;
  scientific: string;
  fact: string;
  tag: string;
  index: number;
  location?: string;
  onClick?: () => void;
}

const WildlifeCard = ({
  src,
  name,
  scientific,
  fact,
  tag,
  index,
  location = "Bengaluru, IN",
  onClick,
}: WildlifeCardProps) => {
  const recId = `REC_${String(index).padStart(3, "0")}`;
  const filename = src.split("/").pop() ?? "";
  const optimizedSrc = getOptimizedPath(src);
  const blurDataURL = getBlurData(filename);
  const blurProps = blurDataURL ? ({ placeholder: "blur", blurDataURL } as const) : {};

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-lg cursor-pointer group border border-[#4a9e5c]/20"
    >
      {/* Viewfinder crosshair corners */}
      <div
        className="absolute top-2 left-2 z-10 h-3 w-3 border-l border-t border-[#4a9e5c]/40 transition-opacity group-hover:opacity-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-2 right-2 z-10 h-3 w-3 border-r border-t border-[#4a9e5c]/40 transition-opacity group-hover:opacity-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-2 left-2 z-10 h-3 w-3 border-b border-l border-[#4a9e5c]/40 transition-opacity group-hover:opacity-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-2 right-2 z-10 h-3 w-3 border-b border-r border-[#4a9e5c]/40 transition-opacity group-hover:opacity-0"
        aria-hidden="true"
      />

      {/* Permanent classification tag */}
      <span className="absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#0d1f0f]/60 px-2 py-0.5 font-mono text-[8px] tracking-widest text-[#e8f5e3]/70 backdrop-blur-sm transition-opacity group-hover:opacity-0">
        {tag}
      </span>

      <div className="relative aspect-[4/5] w-full">
        <Image
          src={optimizedSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          {...blurProps}
        />
      </div>

      {/* Field log overlay */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full overflow-hidden bg-gradient-to-t from-[#0d1f0f] via-[#0d1f0f]/95 to-transparent px-4 pb-4 pt-8 transition-transform duration-300 ease-out group-hover:translate-y-0">
        <div className="flex items-baseline justify-between">
          <p
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-base font-semibold text-[#e8f5e3]"
          >
            {name}
          </p>
          <span className="rounded-full border border-[#4a9e5c]/40 px-2 py-0.5 font-mono text-[8px] text-[#4a9e5c]">
            {tag}
          </span>
        </div>
        <p className="mt-0.5 font-body text-[11px] italic text-[#4a9e5c]">{scientific}</p>

        <div className="my-2 h-px bg-[#4a9e5c]/20" aria-hidden="true" />

        <p className="mb-1 font-mono text-[8px] tracking-widest text-[#4a9e5c]/50">
          // FIELD_NOTE
        </p>
        <p className="font-body text-[11px] leading-relaxed text-[#e8f5e3]/70">{fact}</p>

        <div className="mt-3 flex items-center gap-2 font-mono text-[8px] text-[#e8f5e3]/40">
          <span>📍 {location}</span>
          <span>·</span>
          <span>{recId}</span>
        </div>
      </div>
    </div>
  );
};

export default WildlifeCard;
