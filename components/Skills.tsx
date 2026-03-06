import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";
import {
  FiCode, FiServer, FiDatabase, FiCpu, FiTool, FiLayers
} from "react-icons/fi";
import type { IconType } from "react-icons";
import GlitchText from "./GlitchText";

type Category = {
  id: string;
  label: string;
  sublabel: string;
  icon: IconType;
  color: "tealcyber" | "lemon" | "rust";
  signal: number;
  skills: string[];
  experimental?: boolean;
};

const categories: Category[] = [
  {
    id: "lang",
    label: "LANGUAGES",
    sublabel: "CORE_RUNTIME",
    icon: FiCode,
    color: "tealcyber",
    signal: 95,
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C", "R"],
  },
  {
    id: "backend",
    label: "BACKEND & WEB",
    sublabel: "SVC_LAYER",
    icon: FiServer,
    color: "lemon",
    signal: 88,
    skills: ["Node.js", "Express.js", "Next.js", "RESTful APIs"],
  },
  {
    id: "db",
    label: "DATABASES",
    sublabel: "PERSISTENCE_LAYER",
    icon: FiDatabase,
    color: "tealcyber",
    signal: 82,
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "ml",
    label: "ML & DATA",
    sublabel: "NEURAL_OPS",
    icon: FiCpu,
    color: "rust",
    signal: 78,
    skills: [
      "scikit-learn", "Pandas", "NumPy", "Matplotlib",
      "Feature Engineering", "Supervised Learning", "Anomaly Detection",
    ],
    experimental: true,
  },
  {
    id: "devops",
    label: "DEVOPS & TOOLS",
    sublabel: "ENV_CONTROL",
    icon: FiTool,
    color: "lemon",
    signal: 90,
    skills: ["Docker", "Git", "Linux", "n8n", "⚡ChatGPT", "⚡Cursor", "⚡Gemini"],
  },
  {
    id: "cs",
    label: "CORE CS",
    sublabel: "FOUNDATION",
    icon: FiLayers,
    color: "tealcyber",
    signal: 85,
    skills: ["DSA", "DBMS", "Operating Systems", "System Design"],
  },
];

const colorMap = {
  tealcyber: {
    text: "text-tealcyber",
    border: "border-tealcyber/40",
    bg: "bg-tealcyber/10",
    bar: "bg-tealcyber",
    dot: "bg-tealcyber",
    hoverBorder: "hover:border-tealcyber",
    hoverText: "hover:text-tealcyber",
    hoverBg: "hover:bg-tealcyber/5",
  },
  lemon: {
    text: "text-lemon",
    border: "border-lemon/40",
    bg: "bg-lemon/10",
    bar: "bg-lemon",
    dot: "bg-lemon",
    hoverBorder: "hover:border-lemon",
    hoverText: "hover:text-lemon",
    hoverBg: "hover:bg-lemon/5",
  },
  rust: {
    text: "text-rust",
    border: "border-rust/40",
    bg: "bg-rust/10",
    bar: "bg-rust",
    dot: "bg-rust",
    hoverBorder: "hover:border-rust",
    hoverText: "hover:text-rust",
    hoverBg: "hover:bg-rust/5",
  },
};

const SignalBar = ({ signal, color }: { signal: number; color: keyof typeof colorMap }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    animate(barRef.current, {
      width: [`0%`, `${signal}%`],
      duration: 1200,
      ease: "outExpo",
      delay: 300,
    });
  }, [signal]);

  return (
    <div className="h-[2px] w-full bg-borderline/50 overflow-hidden">
      <div
        ref={barRef}
        className={`h-full ${colorMap[color].bar}`}
        style={{ width: "0%" }}
      />
    </div>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Skills = () => {
  return (
    <section id="skills" className="section mx-auto max-w-6xl px-6" aria-labelledby="skills-heading">
      <p className="mono-label">// EQUIPMENT_MANIFEST.hud</p>
      <GlitchText
        text="Skills"
        as="h2"
        className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
        scrambleOnHover={true}
        animDelay={100}
        scrambleDuration={600}
      />

      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const c = colorMap[cat.color];
          return (
            <motion.article
              key={cat.id}
              variants={cardVariants}
              className="relative flex flex-col rounded-xl border border-borderline bg-royal overflow-hidden"
            >
              {cat.experimental && (
                <div
                  className="flex items-center gap-2 px-3 py-1.5 bg-rust/15 border-b border-rust/30"
                  aria-label="Experimental system"
                >
                  <span className="font-mono text-[9px] tracking-[0.25em] text-rust uppercase">
                    ⚠ WARNING — EXPERIMENTAL
                  </span>
                  <span className="ml-auto font-mono text-[9px] text-rust/50">unstable</span>
                </div>
              )}

              <div className={`flex items-center gap-2 px-4 py-3 border-b border-borderline bg-glow`}>
                <Icon className={`text-base ${c.text}`} aria-hidden="true" />
                <span className={`font-mono text-xs tracking-widest ${c.text}`}>{cat.label}</span>
                <span className="ml-auto font-mono text-[9px] text-butter/30 tracking-wider">{cat.sublabel}</span>
              </div>

              <SignalBar signal={cat.signal} color={cat.color} />

              <div className="flex-1 p-4">
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={`${cat.id}-${skill}`}
                      className={`cursor-default rounded border border-borderline bg-sapphire px-2.5 py-1 font-mono text-xs text-butter/70 transition-all duration-200 ${c.hoverBorder} ${c.hoverText} ${c.hoverBg}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-2 border-t border-borderline/50">
                <span className="font-mono text-[9px] text-butter/20 tracking-widest">
                  SYS:{cat.id.toUpperCase()}
                </span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full ${i < Math.ceil((cat.signal / 100) * 3) ? c.dot : "bg-borderline"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Skills;
