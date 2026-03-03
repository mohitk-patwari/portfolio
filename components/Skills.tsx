import { motion } from "framer-motion";
import { FiMonitor, FiServer, FiTool } from "react-icons/fi";
import type { IconType } from "react-icons";
import GlitchText from "./GlitchText";

type SkillCategory = {
  name: "Frontend" | "Backend" | "Tools";
  icon: IconType;
  skills: string[];
};

const skillsData: SkillCategory[] = [
  {
    name: "Frontend",
    icon: FiMonitor,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
    ],
  },
  {
    name: "Backend",
    icon: FiServer,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
  },
  {
    name: "Tools",
    icon: FiTool,
    skills: ["Git", "GitHub", "Docker", "Vercel", "VS Code", "Linux"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const pillContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="section mx-auto max-w-6xl px-6" aria-labelledby="skills-heading">
      <p className="mono-label">// TECH_STACK.json</p>
      <GlitchText
        text="Skills"
        as="h2"
        className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
        scrambleOnHover={true}
        animDelay={100}
        scrambleDuration={600}
      />

      <div className="mt-8 mb-6 flex flex-wrap gap-4 font-mono text-[10px] tracking-widest text-butter/25">
        <span>
          LOADING: <span className="text-tealcyber/50">TECH_STACK.json</span>
        </span>
        <span>
          MODULES: <span className="text-tealcyber/50">17 loaded</span>
        </span>
        <span>
          ERRORS: <span className="text-rust/50">0</span>
        </span>
        <span className="ml-auto">v2.0.4</span>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {skillsData.map((category) => {
          const Icon = category.icon;
          return (
            <motion.article
              key={category.name}
              variants={cardVariants}
              className="rounded-xl border border-borderline bg-royal p-6 transition-all duration-300 hover:glow-box-teal"
            >
              <div className="flex items-center">
                <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse-slow rounded-full bg-tealcyber" />
                <Icon className="mr-2 text-lg text-tealcyber" aria-hidden="true" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-tealcyber">
                  {category.name}
                </h3>
              </div>

              <div className="my-4 border-t border-borderline/50" />

              <motion.div
                className="mt-2 flex flex-wrap gap-2"
                variants={pillContainerVariants}
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={`${category.name}-${skill}`}
                    variants={pillVariants}
                    className="cursor-default rounded-lg border border-borderline bg-sapphire px-3 py-1.5 font-mono text-xs text-butter/70 transition-all duration-200 hover:scale-105 hover:border-tealcyber hover:bg-tealcyber/5 hover:text-tealcyber"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Skills;
