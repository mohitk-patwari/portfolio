import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import CreativeLayout from "../../components/creative/CreativeLayout";

type PanelId = "drawing" | "wildlife" | null;

const CreativeIndex = () => {
  const router = useRouter();
  const [hoveredPanel, setHoveredPanel] = useState<PanelId>(null);

  const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

  return (
    <CreativeLayout theme="index">
      <motion.div layout className="flex flex-col lg:flex-row min-h-screen relative">
        {/* Left panel — Drawing */}
        <motion.div
          layout
          transition={springTransition}
          onMouseEnter={() => setHoveredPanel("drawing")}
          onMouseLeave={() => setHoveredPanel(null)}
          onClick={() => router.push("/creative/drawing")}
          className={`flex-1 lg:flex-none relative overflow-hidden cursor-pointer bg-[#faf6f1] flex items-center justify-center ${
            hoveredPanel === "drawing"
              ? "lg:w-[60%]"
              : hoveredPanel === "wildlife"
              ? "lg:w-[40%]"
              : "lg:w-1/2"
          }`}
        >
          <div className="p-12 text-center lg:text-left">
            <h2
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-5xl lg:text-7xl font-bold text-[#2d2416] leading-none"
            >
              DRAWING
            </h2>
            <p className="font-body text-sm text-[#8b6f47] mt-4 max-w-xs">
              Pencil, ink, and sometimes colour. Characters from worlds I love.
            </p>
            <motion.span
              animate={{ x: hoveredPanel === "drawing" ? 8 : 0 }}
              className="inline-block text-2xl text-[#c17f3a] mt-8"
            >
              →
            </motion.span>
          </div>
        </motion.div>

        {/* Center divider */}
        <div
          className="hidden lg:block absolute top-0 h-full w-px bg-[#2d2416]/20 transition-all duration-300 ease-out"
          style={{
            left:
              hoveredPanel === "drawing" ? "60%" : hoveredPanel === "wildlife" ? "40%" : "50%",
          }}
          aria-hidden="true"
        />

        {/* Right panel — Wildlife */}
        <motion.div
          layout
          transition={springTransition}
          onMouseEnter={() => setHoveredPanel("wildlife")}
          onMouseLeave={() => setHoveredPanel(null)}
          onClick={() => router.push("/creative/wildlife")}
          className={`flex-1 lg:flex-none relative overflow-hidden cursor-pointer bg-[#0d1f0f] flex items-center justify-center ${
            hoveredPanel === "wildlife"
              ? "lg:w-[60%]"
              : hoveredPanel === "drawing"
              ? "lg:w-[40%]"
              : "lg:w-1/2"
          }`}
        >
          <div className="p-12 text-center lg:text-left">
            <h2
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-5xl lg:text-7xl font-bold text-[#e8f5e3] leading-none"
            >
              WILDLIFE
            </h2>
            <p className="font-body text-sm text-[#4a9e5c]/70 mt-4 max-w-xs">
              Butterflies, moths, fungi, and one very fluffy cat.
            </p>
            <motion.span
              animate={{ x: hoveredPanel === "wildlife" ? 8 : 0 }}
              className="inline-block text-2xl text-[#4a9e5c] mt-8"
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </CreativeLayout>
  );
};

export default CreativeIndex;
