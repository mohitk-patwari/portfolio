import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { getBlurData, getOptimizedPath } from "../../lib/imagePaths";

type LightboxTheme = "drawing" | "wildlife";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  theme: LightboxTheme;
  onNext?: () => void;
  onPrev?: () => void;
}

const themeStyles: Record<
  LightboxTheme,
  {
    panelBg: string;
    title: string;
    subtitle: string;
    description: string;
    closeBg: string;
    closeText: string;
    divider: string;
    tagBorder: string;
    tagText: string;
  }
> = {
  drawing: {
    panelBg: "bg-[#faf6f1]",
    title: "text-[#2d2416]",
    subtitle: "text-[#8b6f47]",
    description: "text-[#2d2416]/70",
    closeBg: "bg-[#2d2416]/10 hover:bg-[#2d2416]/20",
    closeText: "text-[#2d2416]",
    divider: "bg-[#8b6f47]/20",
    tagBorder: "border-[#c17f3a]/40",
    tagText: "text-[#c17f3a]",
  },
  wildlife: {
    panelBg: "bg-[#0d1f0f]",
    title: "text-[#e8f5e3]",
    subtitle: "text-[#4a9e5c]",
    description: "text-[#e8f5e3]/70",
    closeBg: "bg-[#e8f5e3]/10 hover:bg-[#e8f5e3]/20",
    closeText: "text-[#e8f5e3]",
    divider: "bg-[#4a9e5c]/20",
    tagBorder: "border-[#4a9e5c]/40",
    tagText: "text-[#4a9e5c]",
  },
};

const Lightbox = ({
  isOpen,
  onClose,
  src,
  title,
  subtitle,
  description,
  tag,
  theme,
  onNext,
  onPrev,
}: LightboxProps) => {
  const styles = themeStyles[theme];
  const filename = src.split("/").pop() ?? "";
  const optimizedSrc = getOptimizedPath(src);
  const blurDataURL = getBlurData(filename);
  const blurProps = blurDataURL ? ({ placeholder: "blur", blurDataURL } as const) : {};

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Capture-phase + preventDefault so CreativeLayout's bubble-phase
        // ESC-to-home listener (which checks defaultPrevented) skips this.
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowRight") onNext?.();
      if (event.key === "ArrowLeft") onPrev?.();
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className={`relative max-w-5xl w-full max-h-[90vh] flex flex-col lg:flex-row gap-0 rounded-xl overflow-hidden ${styles.panelBg}`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${styles.closeBg} ${styles.closeText}`}
            >
              ✕
            </button>

            <div className="relative flex-1 flex items-center justify-center min-h-[300px] bg-black/5">
              {onPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous image"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors duration-200 ${styles.closeBg} ${styles.closeText}`}
                >
                  ‹
                </button>
              )}
              <Image
                src={optimizedSrc}
                alt={title}
                width={0}
                height={0}
                sizes="90vw"
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                {...blurProps}
              />
              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next image"
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors duration-200 ${styles.closeBg} ${styles.closeText}`}
                >
                  ›
                </button>
              )}
            </div>

            <div className="lg:w-80 shrink-0 p-6 overflow-y-auto">
              <p
                style={{ fontFamily: "Playfair Display, serif" }}
                className={`text-2xl ${styles.title}`}
              >
                {title}
              </p>
              {subtitle && (
                <p className={`font-body text-sm italic mt-1 ${styles.subtitle}`}>
                  {subtitle}
                </p>
              )}
              <div className={`h-px my-4 ${styles.divider}`} aria-hidden="true" />
              {description && (
                <p className={`font-body text-sm mt-3 leading-relaxed ${styles.description}`}>
                  {description}
                </p>
              )}
              {tag && (
                <span
                  className={`inline-block mt-4 font-mono text-[9px] uppercase tracking-wider rounded-full border px-2 py-0.5 ${styles.tagBorder} ${styles.tagText}`}
                >
                  {tag}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
