import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type AccentColor = "tealcyber" | "rust" | "lemon";

interface Stat {
  readonly label: string;
  readonly value: number;
  readonly color: AccentColor;
}

interface CharacterData {
  readonly id: string;
  readonly image: string;
  readonly class: string;
  readonly name: string;
  readonly description: string;
  readonly inventory: readonly string[];
  readonly stats: readonly Stat[];
  readonly power: string;
  readonly accent: AccentColor;
}

const CHARACTERS: readonly CharacterData[] = [
  {
    id: "engineer",
    image: "/characters/engineer.png",
    class: "FULL_STACK_ENG",
    name: "THE ENGINEER",
    description: "Builds systems that scale. Clean architecture, dirty problem-solving.",
    inventory: ["Node.js", "Docker", "Next.js"],
    stats: [
      { label: "SYSTEM_DESIGN", value: 75, color: "tealcyber" },
      { label: "BACKEND_OPS",   value: 82, color: "tealcyber" },
      { label: "DEVOPS",        value: 68, color: "lemon" },
    ],
    power: "BUILD SCALABLE SYSTEMS",
    accent: "tealcyber",
  },
  {
    id: "datamage",
    image: "/characters/datamage.png",
    class: "ML_SPECIALIST",
    name: "THE DATA MAGE",
    description: "Turns raw data into insight. Finds patterns where others see noise.",
    inventory: ["Python", "scikit-learn", "Pandas"],
    stats: [
      { label: "ML_CURIOSITY",  value: 70, color: "rust" },
      { label: "DATA_ANALYSIS", value: 76, color: "rust" },
      { label: "FEATURE_ENG",   value: 65, color: "lemon" },
    ],
    power: "EXTRACT SIGNAL FROM NOISE",
    accent: "rust",
  },
  {
    id: "operator",
    image: "/characters/operator.png",
    class: "PROBLEM_SOLVER",
    name: "THE OPERATOR",
    description: "Ships under pressure. Whatever it takes, whatever the stack.",
    inventory: ["TypeScript", "SQL", "Linux"],
    stats: [
      { label: "PROBLEM_SOLVING", value: 85, color: "lemon" },
      { label: "ADAPTABILITY",    value: 80, color: "lemon" },
      { label: "SHIPPING_SPEED",  value: 78, color: "tealcyber" },
    ],
    power: "WHATEVER IT TAKES",
    accent: "tealcyber",
  },
];

// All possible Tailwind class combinations must appear as full strings (no interpolation)
// so they survive the JIT purge step.
const ACCENT_MAP: Record<
  AccentColor,
  {
    activeBorder: string;
    activeGlow: string;
    powerText: string;
    dotBg: string;
    inventoryHover: string;
  }
> = {
  tealcyber: {
    activeBorder: "border-tealcyber",
    activeGlow: "glow-box-teal",
    powerText: "text-tealcyber glow-teal",
    dotBg: "bg-tealcyber",
    inventoryHover: "hover:border-tealcyber hover:text-tealcyber",
  },
  rust: {
    activeBorder: "border-rust",
    activeGlow: "",
    powerText: "text-rust",
    dotBg: "bg-rust",
    inventoryHover: "hover:border-rust hover:text-rust",
  },
  lemon: {
    activeBorder: "border-lemon",
    activeGlow: "glow-box-lemon",
    powerText: "text-lemon glow-lemon",
    dotBg: "bg-lemon",
    inventoryHover: "hover:border-lemon hover:text-lemon",
  },
};

const STAT_BAR_COLOR: Record<AccentColor, string> = {
  tealcyber: "bg-tealcyber",
  rust: "bg-rust",
  lemon: "bg-lemon",
};

// Mounts fresh on each character switch (via key prop), resetting the
// CSS transition so bars animate from 0 → value every time.
const StatBars = ({ stats }: { stats: readonly Stat[] }) => {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setTriggered(true), 50);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-butter/50">
              {stat.label}
            </span>
            <span className="font-mono text-[10px] text-butter/25">{stat.value}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-sapphire">
            <div
              className={`h-1.5 rounded-full ${STAT_BAR_COLOR[stat.color]} transition-[width] duration-[1000ms] ease-out`}
              style={{ width: triggered ? `${stat.value}%` : "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const CharacterSelect = () => {
  const [activeId, setActiveId] = useState<string>("engineer");

  const activeChar: CharacterData =
    CHARACTERS.find((c) => c.id === activeId) ?? (CHARACTERS[0] as CharacterData);

  const accentCls = ACCENT_MAP[activeChar.accent];

  const avgStat = Math.round(
    activeChar.stats.reduce((sum, s) => sum + s.value, 0) / activeChar.stats.length
  );
  const filledDots = Math.ceil((avgStat / 100) * 3);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Portrait cards — horizontal row on mobile, vertical column on sm+ */}
      <div className="mx-auto flex flex-row gap-2 sm:mx-0 sm:w-[140px] sm:flex-shrink-0 sm:flex-col">
        {CHARACTERS.map((char, idx) => {
          const isActive = char.id === activeId;
          const cls = ACCENT_MAP[char.accent];
          return (
            <motion.div
              key={char.id}
              onClick={() => setActiveId(char.id)}
              animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.95,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={[
                "cursor-pointer overflow-hidden rounded-xl border bg-royal",
                "flex-1 sm:flex-none",
                idx > 0 ? "sm:-mt-2" : "",
                isActive
                  ? `${cls.activeBorder} ${cls.activeGlow}`
                  : "border-borderline",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="relative h-[100px] w-full sm:h-[130px]">
                <Image
                  src={char.image}
                  alt={char.name}
                  fill
                  sizes="140px"
                  className="object-contain"
                />
              </div>
              <div className="border-t border-borderline px-2 py-1.5 text-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-butter/60">
                  {char.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stat panel */}
      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChar.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden rounded-xl border border-borderline bg-royal"
          >
            {/* 1. Header bar */}
            <div className="flex items-center justify-between border-b border-borderline bg-glow px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter/40">
                {activeChar.class}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-tealcyber" />
                <span className="font-mono text-[10px] text-tealcyber/70">ONLINE</span>
              </span>
            </div>

            {/* 2. Name area */}
            <div className="border-b border-borderline px-4 py-3">
              <p className="font-display text-xl text-lemon glow-lemon">
                {activeChar.name}
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-butter/60">
                {activeChar.description}
              </p>
            </div>

            {/* 3. Inventory */}
            <div className="border-b border-borderline px-4 py-3">
              <p className="mono-label">INVENTORY</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeChar.inventory.map((item) => (
                  <span
                    key={item}
                    className={[
                      "cursor-default rounded border border-borderline bg-sapphire",
                      "px-3 py-1.5 font-mono text-xs text-butter/70",
                      "transition-colors duration-200",
                      accentCls.inventoryHover,
                    ].join(" ")}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Stats */}
            <div className="border-b border-borderline px-4 py-3">
              <p className="mono-label">STATS</p>
              <div className="mt-2">
                <StatBars key={activeChar.id} stats={activeChar.stats} />
              </div>
            </div>

            {/* 5. Power bar */}
            <div className="bg-glow px-4 py-3">
              <p className="mono-label">POWER</p>
              <p className={`mt-1 font-display text-sm ${accentCls.powerText}`}>
                {activeChar.power}
              </p>
            </div>

            {/* 6. Bottom bar */}
            <div className="flex items-center justify-between border-t border-borderline/50 px-4 py-2">
              <span className="font-mono text-[9px] uppercase text-butter/20">
                ID:{activeChar.id.toUpperCase()}
              </span>
              <span className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i < filledDots ? accentCls.dotBg : "bg-borderline"
                    }`}
                  />
                ))}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CharacterSelect;
