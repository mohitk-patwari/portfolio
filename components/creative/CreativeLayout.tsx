import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

type CreativeTheme = "drawing" | "wildlife" | "index";

interface CreativeLayoutProps {
  children: ReactNode;
  theme: CreativeTheme;
}

const backLinkClass: Record<CreativeTheme, string> = {
  drawing: "text-[#8b6f47] hover:text-[#c17f3a]",
  wildlife: "text-[#4a9e5c]/60 hover:text-[#4a9e5c]",
  index: "",
};

const hintClass: Record<CreativeTheme, string> = {
  drawing: "text-[#8b6f47]/50",
  wildlife: "text-[#4a9e5c]/40",
  index: "",
};

const CreativeLayout = ({ children, theme }: CreativeLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Lightbox handles its own ESC in the capture phase and calls
      // preventDefault, so this bubble-phase listener skips it there.
      if (event.key === "Escape" && !event.defaultPrevented) {
        router.push("/");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div className="w-full">
      {theme !== "index" && (
        <div className="fixed left-6 top-6 z-50 flex flex-col gap-1">
          <Link
            href="/"
            className={`font-display text-xs tracking-wider transition-colors duration-200 ${backLinkClass[theme]}`}
          >
            ← MOHIT.DEV
          </Link>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5, times: [0, 0.1, 0.85, 1], ease: "easeInOut" }}
            className={`pointer-events-none font-mono text-[9px] ${hintClass[theme]}`}
          >
            press ESC to return
          </motion.p>
        </div>
      )}
      {children}
    </div>
  );
};

export default CreativeLayout;
