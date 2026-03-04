import { motion } from "framer-motion";
import { FiCode, FiServer, FiDatabase, FiCpu, FiTerminal, FiLayers } from "react-icons/fi";
import GlitchText from "./GlitchText";

const skillCategories = [
  {
    id: "lang",
    icon: FiCode,
    label: "Languages",
    sublabel: "CORE_RUNTIME",
    color: "tealcyber",
    borderColor: "border-tealcyber/40",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C", "R"],
    signalStrength: 95,
    tag: null,
  },
  {
    id: "backend",
    icon: FiServer,
    label: "Backend & Web",
    sublabel: "SVC_LAYER",
    color: "lemon",
    borderColor: "border-lemon/40",
    skills: ["Node.js", "Express.js", "Next.js", "RESTful APIs"],
    signalStrength: 88,
    tag: null,
  },
  {
    id: "db",
    icon: FiDatabase,
    label: "Databases",
    sublabel: "PERSISTENCE_LAYER",
    color: "tealcyber",
    borderColor: "border-tealcyber/40",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
    signalStrength: 82,
    tag: null,
  },
  {
    id: "ml",
    icon: FiCpu,
    label: "ML & Data",
    sublabel: "NEURAL_OPS",
    color: "rust",
    borderColor: "border-rust/50",
    skills: [
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Feature Engineering",
      "Supervised Learning",
      "Anomaly Detection",
    ],
    signalStrength: 78,
    tag: "EXPERIMENTAL",
  },
  {
    id: "devops",
    icon: FiTerminal,
    label: "DevOps & Tools",
    sublabel: "ENV_CONTROL",
    color: "lemon",
    borderColor: "border-lemon/40",
    skills: ["Docker", "Git", "Linux", "n8n", "\u26A1 ChatGPT", "\u26A1 Cursor", "\u26A1 Gemini"],
    signalStrength: 90,
    tag: null,
  },
  {
    id: "cs",
    icon: FiLayers,
    label: "Core CS",
    sublabel: "FOUNDATION",
    color: "tealcyber",
    borderColor: "border-tealcyber/40",
    skills: ["DSA", "DBMS", "Operating Systems", "System Design"],
    signalStrength: 85,
    tag: null,
  },
] as const;

const colorClass = {
  tealcyber: {
    text: "text-tealcyber",
    scan: "via-tealcyber/30",
    bar: "bg-tealcyber/60",
    tagHover: "hover:text-tealcyber hover:border-tealcyber/50 hover:bg-tealcyber/[0.08]",
    glow: "hover:shadow-[0_0_0_1px_#3dd6c850,0_0_24px_#3dd6c825]",
  },
  lemon: {
    text: "text-lemon",
    scan: "via-lemon/30",
    bar: "bg-lemon/60",
    tagHover: "hover:text-lemon hover:border-lemon/50 hover:bg-lemon/[0.08]",
    glow: "hover:shadow-[0_0_0_1px_#e6d44a50,0_0_24px_#e6d44a25]",
  },
  rust: {
    text: "text-rust",
    scan: "via-rust/30",
    bar: "bg-rust/60",
    tagHover: "hover:text-rust hover:border-rust/50 hover:bg-rust/[0.08]",
    glow: "hover:shadow-[0_0_0_1px_#c9593a55,0_0_24px_#c9593a25]",
  },
} as const;

const panelOffsetClass = [
  "",
  "md:translate-y-2",
  "lg:-translate-y-1",
  "md:-translate-y-1",
  "lg:translate-y-3",
  "md:translate-y-1",
];

const dotColorHex = {
  tealcyber: "#3dd6c8",
  lemon: "#e6d44a",
  rust: "#c9593a",
} as const;

const Skills = () => {
  return (
    <section id="skills" className="section relative overflow-hidden max-w-6xl mx-auto px-6">
      <p className="mono-label">// EQUIPMENT_MANIFEST.sys</p>
      <GlitchText
        text="Skills"
        as="h2"
        className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
        scrambleOnHover={true}
        animDelay={0}
        scrambleDuration={600}
      />

      <div className="font-mono text-[10px] text-butter/25 flex gap-6 flex-wrap mt-3">
        <span>SYS: ONLINE |</span>
        <span>MODULES: 30 loaded |</span>
        <span>ERRORS: 0 |</span>
        <span>LAST_SCAN: NOW</span>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, cardIndex) => {
          const Icon = category.icon;
          const palette = colorClass[category.color];

          return (
            <motion.article
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: cardIndex * 0.08 }}
              className={`relative rounded-xl overflow-hidden bg-royal border ${category.borderColor} p-0 group transition-all duration-300 ${palette.glow} ${panelOffsetClass[cardIndex]}`}
            >
              <div className={`px-4 py-2.5 border-b ${category.borderColor} flex items-center justify-between`}>
                <div className="flex items-center">
                  <Icon className={`text-base ${palette.text}`} aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-widest text-butter/70 ml-2">
                    {category.label}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-butter/25 tracking-widest">
                  {category.sublabel}
                </span>
              </div>

              <div
                aria-hidden="true"
                className={`h-px w-full bg-gradient-to-r from-transparent ${palette.scan} to-transparent`}
              />

              <div className="px-4 pt-3 pb-1 flex items-center gap-2">
                <span className="font-mono text-[9px] text-butter/30 uppercase tracking-widest">SIG:</span>
                <div className="flex-1 h-1 rounded-full bg-sapphire overflow-hidden">
                  <motion.div
                    style={{ width: 0 }}
                    whileInView={{ width: `${category.signalStrength}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: cardIndex * 0.08 + 0.3 }}
                    className={`h-full rounded-full ${palette.bar}`}
                  />
                </div>
                <span className="font-mono text-[9px] text-butter/30">{category.signalStrength}%</span>
              </div>

              {category.tag === "EXPERIMENTAL" && (
                <div
                  className="w-full bg-rust/10 border-y border-rust/30 px-4 py-1 font-mono text-[9px] text-rust/70 tracking-widest uppercase"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(201,89,58,0.05) 4px, rgba(201,89,58,0.05) 8px)",
                  }}
                >
                  {"\u25B2 EXPERIMENTAL ZONE \u2014 HANDLE WITH CURIOSITY \u25B2"}
                </div>
              )}

              <div className="px-4 pb-4 pt-2 flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={`${category.id}-${skill}`}
                    className={`font-mono text-xs px-2.5 py-1 rounded-md cursor-default bg-sapphire/80 text-butter/60 border border-borderline/50 transition-all duration-150 ${palette.tagHover} hover:scale-105`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="px-4 pb-2 flex items-center justify-between">
                <span className="font-mono text-[9px] text-butter/15 tracking-widest">
                  ID: {category.id.toUpperCase()}
                </span>
                <span className="flex items-center gap-1" aria-hidden="true">
                  <span
                    className="w-1 h-1 rounded-full opacity-100"
                    style={{ backgroundColor: dotColorHex[category.color] }}
                  />
                  <span
                    className="w-1 h-1 rounded-full opacity-50"
                    style={{ backgroundColor: dotColorHex[category.color] }}
                  />
                  <span
                    className="w-1 h-1 rounded-full opacity-20"
                    style={{ backgroundColor: dotColorHex[category.color] }}
                  />
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
