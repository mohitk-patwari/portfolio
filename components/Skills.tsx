import { motion } from "framer-motion";
import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiServer,
  FiTerminal,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import GlitchText from "./GlitchText";

type CategoryColor = "tealcyber" | "lemon" | "rust";

type SkillCategory = {
  id: "lang" | "backend" | "db" | "ml" | "devops" | "cs";
  icon: "FiCode" | "FiServer" | "FiDatabase" | "FiCpu" | "FiTerminal" | "FiLayers";
  label: "Languages" | "Backend & Web" | "Databases" | "ML & Data" | "DevOps & Tools" | "Core CS";
  color: CategoryColor;
  skills: string[];
};

const iconMap: Record<SkillCategory["icon"], IconType> = {
  FiCode,
  FiServer,
  FiDatabase,
  FiCpu,
  FiTerminal,
  FiLayers,
};

const colorMap: Record<
  CategoryColor,
  {
    text: string;
    dotFill: string;
    tagHover: string;
  }
> = {
  tealcyber: {
    text: "text-tealcyber",
    dotFill: "fill-tealcyber/10",
    tagHover: "hover:bg-tealcyber/10 hover:border-tealcyber/50 hover:text-tealcyber",
  },
  lemon: {
    text: "text-lemon",
    dotFill: "fill-lemon/10",
    tagHover: "hover:bg-lemon/10 hover:border-lemon/50 hover:text-lemon",
  },
  rust: {
    text: "text-rust",
    dotFill: "fill-rust/10",
    tagHover: "hover:bg-rust/10 hover:border-rust/50 hover:text-rust",
  },
};

const skillsData: SkillCategory[] = [
  {
    id: "lang",
    icon: "FiCode",
    label: "Languages",
    color: "tealcyber",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C", "R"],
  },
  {
    id: "backend",
    icon: "FiServer",
    label: "Backend & Web",
    color: "lemon",
    skills: ["Node.js", "Express.js", "Next.js", "RESTful APIs"],
  },
  {
    id: "db",
    icon: "FiDatabase",
    label: "Databases",
    color: "tealcyber",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: "ml",
    icon: "FiCpu",
    label: "ML & Data",
    color: "rust",
    skills: [
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Feature Engineering",
      "Supervised Learning",
      "Anomaly Detection",
    ],
  },
  {
    id: "devops",
    icon: "FiTerminal",
    label: "DevOps & Tools",
    color: "lemon",
    skills: ["Docker", "Git", "Linux", "n8n", "ChatGPT", "Cursor", "Gemini"],
  },
  {
    id: "cs",
    icon: "FiLayers",
    label: "Core CS",
    color: "tealcyber",
    skills: ["DSA", "DBMS", "Operating Systems", "System Design"],
  },
];

const cardContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const skillListVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.14,
      staggerChildren: 0.03,
    },
  },
};

const skillTagVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
};

const aiToolSkills = new Set(["ChatGPT", "Cursor", "Gemini"]);

const Skills = () => {
  return (
    <section id="skills" className="section max-w-6xl mx-auto px-6">
      <p className="mono-label">// TECH_STACK.json</p>
      <GlitchText
        text="Skills"
        as="h2"
        className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
        scrambleOnHover={true}
      />

      <div className="font-mono text-[10px] text-butter/25 flex gap-6 mt-3 flex-wrap">
        <span>LOADING: TECH_STACK.json |</span>
        <span>MODULES: 30 loaded |</span>
        <span>ERRORS: 0 |</span>
        <span>v2.0.4</span>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={cardContainerVariants}
      >
        {skillsData.map((category) => {
          const Icon = iconMap[category.icon];
          const palette = colorMap[category.color];

          return (
            <motion.article
              key={category.id}
              className="bg-royal border border-borderline rounded-xl p-5 relative overflow-hidden hover:border-tealcyber transition-all duration-300 group"
              variants={cardVariants}
            >
              <div aria-hidden="true" className="absolute top-3 right-3">
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <circle cx="16" cy="16" r="12" className="fill-none stroke-borderline/30" />
                  <circle cx="16" cy="16" r="6" className={palette.dotFill} />
                </svg>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Icon className={`text-lg ${palette.text}`} aria-hidden="true" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-butter/60">
                  {category.label}
                </h3>
                <span className="bg-sapphire border border-borderline/50 text-butter/30 font-mono text-[10px] px-2 py-0.5 rounded-full ml-auto">
                  {"\u00D7"}
                  {category.skills.length}
                </span>
              </div>

              <div className="border-t border-borderline/30 mb-4" />

              <motion.div className="flex flex-wrap gap-2" variants={skillListVariants}>
                {category.skills.map((skill) => {
                  const mlPrefix = category.id === "ml" ? (
                    <span className="text-rust">{"\u00B7"}</span>
                  ) : null;
                  const aiPrefix =
                    category.id === "devops" && aiToolSkills.has(skill) ? (
                      <span className="text-lemon">{"\u26A1"}</span>
                    ) : null;

                  return (
                    <motion.span
                      key={`${category.id}-${skill}`}
                      variants={skillTagVariants}
                      className={`font-mono text-xs px-2.5 py-1 rounded-md bg-sapphire text-butter/60 border border-borderline/50 ${palette.tagHover} transition-all duration-150 cursor-default hover:scale-105`}
                    >
                      <span className="inline-flex items-center gap-1">
                        {mlPrefix}
                        {aiPrefix}
                        <span>{skill}</span>
                      </span>
                    </motion.span>
                  );
                })}
              </motion.div>

              <span className="absolute bottom-2 right-3 font-mono text-[9px] text-butter/10 tracking-widest">
                {category.id.toUpperCase()}
              </span>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Skills;
