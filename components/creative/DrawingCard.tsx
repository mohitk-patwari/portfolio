import type { CSSProperties } from "react";
import Image from "next/image";
import { getBlurData, getOptimizedPath } from "../../lib/imagePaths";

interface DrawingCardProps {
  src: string;
  title: string;
  medium: string;
  note: string;
  rotate: number;
  onClick?: () => void;
}

const DrawingCard = ({ src, title, medium, note, rotate, onClick }: DrawingCardProps) => {
  const filename = src.split("/").pop() ?? "";
  const optimizedSrc = getOptimizedPath(src);
  const blurDataURL = getBlurData(filename);
  const blurProps = blurDataURL ? ({ placeholder: "blur", blurDataURL } as const) : {};

  return (
    <div
      onClick={onClick}
      className="group relative bg-white p-3 pb-14 rounded-sm shadow-[0_8px_30px_rgba(45,36,22,0.15)] transition-all duration-300 rotate-[var(--card-rotate)] hover:rotate-0 hover:scale-[1.03] hover:z-10 hover:shadow-[0_16px_50px_rgba(45,36,22,0.28)] cursor-pointer"
      style={{ "--card-rotate": `${rotate}deg` } as CSSProperties}
    >
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#d4c5a0]/50 rotate-[-2deg] rounded-sm"
        aria-hidden="true"
      />
      <div className="relative w-full">
        <Image
          src={optimizedSrc}
          alt={title}
          width={0}
          height={0}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="w-full h-auto object-contain rounded-[2px]"
          {...blurProps}
        />
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <p style={{ fontFamily: "Caveat, cursive" }} className="text-lg text-[#2d2416]">
          {title}
        </p>
        <p className="font-body text-[9px] text-[#8b6f47] mt-0.5 leading-tight">{medium}</p>
        <p className="font-mono text-[8px] text-[#c17f3a]/60 uppercase tracking-wider mt-0.5">
          {note}
        </p>
      </div>
    </div>
  );
};

export default DrawingCard;
