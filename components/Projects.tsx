import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import GlitchText from "./GlitchText";

const projects = [
  {
    index: 0,
    title: "MicroOps Watchtower",
    description:
      "Microservice monitoring & automation. Real-time health tracking across distributed services with alerting.",
    techStack: ["Node.js", "Docker", "Express", "MongoDB"],
    repoUrl: "https://github.com/mohitk-patwari/microops-watchtower",
    imageSrc: "/projects/microops-watchtower.svg",
    imageAlt: "MicroOps Watchtower",
    startDate: "Jan 2024",
    endDate: "Mar 2024",
  },
  {
    index: 1,
    title: "DBS Lab Project",
    description:
      "Advanced database system implementation. Query optimization, relational design, and performance benchmarking.",
    techStack: ["PostgreSQL", "SQL", "Express", "Node.js"],
    repoUrl: "https://github.com/mohitk-patwari/DBS-Lab-Project",
    imageSrc: "/projects/dbs-lab-project.svg",
    imageAlt: "DBS Lab Project",
    startDate: "Aug 2023",
    endDate: "Nov 2023",
  },
  {
    index: 2,
    title: "Smart Expense Tracker",
    description:
      "Expense tracking with visual dashboards and category analytics. Built for clarity under financial chaos.",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB"],
    repoUrl: "https://github.com/mohitk-patwari/Smart-Expense-Tracker",
    imageSrc: "/projects/smart-expense-tracker.svg",
    imageAlt: "Smart Expense Tracker",
    startDate: "Mar 2023",
    endDate: "May 2023",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Projects = () => {
  return (
    <section id="projects" className="section mx-auto max-w-6xl px-6" aria-labelledby="projects-heading">
      <p className="mono-label">// SELECTED_WORK</p>
      <div id="projects-heading">
        <GlitchText
          text="Projects"
          as="h2"
          className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
          scrambleOnHover={true}
          animDelay={100}
          scrambleDuration={700}
        />
      </div>
      <p className="mt-2 font-mono text-xs text-butter/40">
        // A selection of things I&apos;ve built. Each one taught me something
        different.
      </p>
      <div className="mt-1 font-mono text-[10px] tracking-widest text-butter/20">
        SORTED_BY: impact • FILTER: all • RESULTS: 3
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={itemVariants}>
            <ProjectCard
              index={project.index}
              title={project.title}
              description={project.description}
              techStack={[...project.techStack]}
              repoUrl={project.repoUrl}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              startDate={project.startDate}
              endDate={project.endDate}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
