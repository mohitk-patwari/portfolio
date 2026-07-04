import { motion } from "framer-motion";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import GlitchText from "./GlitchText";

type ProjectEntry = Omit<ProjectCardProps, "terminalLines"> & {
  terminalLines: { text: string; type: "cmd" | "out" }[];
};

const projects: ProjectEntry[] = [
  {
    index: 0,
    title: "MicroOps Watchtower",
    description:
      "Microservice monitoring & automation. Real-time health tracking across distributed services with alerting.",
    techStack: ["Node.js", "Docker", "Express", "MongoDB"],
    repoUrl: "https://github.com/mohitk-patwari/microops-watchtower",
    startDate: "Jan 2024",
    endDate: "Mar 2024",
    terminalLines: [
      { text: '$ docker ps --format "table {{.Names}}\\t{{.Status}}"', type: "cmd" },
      { text: "NAMES              STATUS", type: "out" },
      { text: "api-gateway        Up 2h (healthy)", type: "out" },
      { text: "auth-svc           Up 2h (healthy)", type: "out" },
      { text: "monitor-daemon     Up 47m (healthy)", type: "out" },
      { text: "$ curl localhost:3000/health", type: "cmd" },
      { text: '{"status":"OK","uptime":7234}', type: "out" },
    ],
  },
  {
    index: 1,
    title: "DBS Lab Project",
    description:
      "Advanced database system implementation. Query optimization, relational design, and performance benchmarking.",
    techStack: ["PostgreSQL", "SQL", "Express", "Node.js"],
    repoUrl: "https://github.com/mohitk-patwari/DBS-Lab-Project",
    startDate: "Aug 2023",
    endDate: "Nov 2023",
    terminalLines: [
      { text: "$ psql -U admin dbslab", type: "cmd" },
      { text: "psql (15.2) — Type \\help for help.", type: "out" },
      { text: "dbslab=# SELECT COUNT(*) FROM transactions;", type: "cmd" },
      { text: " count: 84291", type: "out" },
      { text: "dbslab=# EXPLAIN ANALYZE SELECT * FROM orders", type: "cmd" },
      { text: "  Seq Scan (cost=0.00..1842.91)", type: "out" },
      { text: "  Planning: 0.4ms  Exec: 12.8ms", type: "out" },
    ],
  },
  {
    index: 2,
    title: "Smart Expense Tracker",
    description:
      "Expense tracking with visual dashboards and category analytics. Built for clarity under financial chaos.",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB"],
    repoUrl: "https://github.com/mohitk-patwari/Smart-Expense-Tracker",
    startDate: "Mar 2023",
    endDate: "May 2023",
    terminalLines: [
      { text: "$ npm run dev", type: "cmd" },
      { text: "> smart-expense@1.0.0 dev", type: "out" },
      { text: "✓ compiled in 847ms", type: "out" },
      { text: "✓ ready on http://localhost:3000", type: "out" },
      { text: "[db] MongoDB connected", type: "out" },
      { text: "[app] 3 budgets loaded", type: "out" },
      { text: "[ws] live updates active", type: "out" },
    ],
  },
  {
    index: 3,
    title: "NetGuard",
    description:
      "IaC security analyzer that scans Terraform & Kubernetes in PRs. Builds network topology graphs, scores blast-radius risk with deterministic rules + LLM enrichment, and posts autofixes back to GitHub.",
    techStack: ["Python", "FastAPI", "Docker", "PostgreSQL", "React", "Gemini"],
    repoUrl: "https://github.com/mohitk-patwari/security_scanner",
    startDate: "Feb 2026",
    endDate: "May 2026",
    terminalLines: [
      { text: "$ python graph_engine.py build", type: "cmd" },
      { text: "[graph] parsing 3 .tf files", type: "out" },
      { text: "[graph] 12 nodes · 8 edges built", type: "out" },
      { text: "[risk] chain: EC2 → RDS (public)", type: "out" },
      { text: "[rule] port 22 exposed → HIGH", type: "out" },
      { text: "[llm] Gemini enrichment → CRITICAL", type: "out" },
      { text: "findings: CRITICAL 2 | HIGH 4", type: "out" },
    ],
  },
  {
    index: 4,
    title: "Silent Social Debt Manager",
    description:
      "Autonomous AI agent that monitors WhatsApp, Telegram & Gmail for unanswered follow-ups. Uses NLP classification, persistent relationship memory, and Claude 3.5 to draft replies in your tone.",
    techStack: ["TypeScript", "Node.js", "React", "Claude 3.5", "WebSocket"],
    repoUrl: "https://github.com/mohitk-patwari/SilentSocialDebtManager",
    startDate: "May 2026",
    endDate: "May 2026",
    terminalLines: [
      { text: "$ yarn dev", type: "cmd" },
      { text: "[heartbeat] scanning 47 convos", type: "out" },
      { text: "[nlp] unanswered_query × 3", type: "out" },
      { text: "[nlp] commitment_made × 1", type: "out" },
      { text: "[soul] alice.soul.md updated", type: "out" },
      { text: "[agent] DRAFT via Claude 3.5", type: "out" },
      { text: "[ws] pushed to dashboard", type: "out" },
    ],
  },
  {
    index: 5,
    title: "Chart Validation System",
    description:
      "Production-grade DevSecOps API that validates charts against their stated objectives. 4-dimension scoring engine catches misleading visuals — wrong chart types, truncated axes, unreadable slices.",
    techStack: ["Python", "FastAPI", "Docker", "SQLAlchemy", "GitHub Actions"],
    repoUrl: "https://github.com/mohitk-patwari/chart-validation-system",
    startDate: "May 2026",
    endDate: "May 2026",
    terminalLines: [
      { text: "$ pytest tests/ --cov=app", type: "cmd" },
      { text: "36 passed · 86% coverage", type: "out" },
      { text: "$ docker compose up -d", type: "cmd" },
      { text: "✓ api      healthy :8000", type: "out" },
      { text: "✓ parser   healthy :8001", type: "out" },
      { text: "POST /validate-chart", type: "cmd" },
      { text: '→ score: 100 | status: "valid"', type: "out" },
    ],
  },
];

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
    <section id="projects" className="section mx-auto max-w-6xl px-6" aria-label="Projects">
      <p className="mono-label">// SELECTED_WORK</p>
      <GlitchText
        text="Projects"
        as="h2"
        className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
        scrambleOnHover={true}
        animDelay={100}
        scrambleDuration={600}
      />
      <p className="mt-2 font-mono text-xs text-butter/40">
        // A selection of things I&apos;ve built. Each one taught me something
        different.
      </p>
      <div className="mt-1 font-mono text-[10px] tracking-widest text-butter/20">
        SORTED_BY: impact • FILTER: all • RESULTS: 6
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
              startDate={project.startDate}
              endDate={project.endDate}
              terminalLines={project.terminalLines}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;

