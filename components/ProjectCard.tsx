import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import GlitchText from "./GlitchText";

export interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  index: number;
  startDate: string;
  endDate: string;
  terminalLines: { text: string; type: "cmd" | "out" }[];
}

const ProjectCard = ({
  title,
  description,
  techStack,
  repoUrl,
  index,
  startDate,
  endDate,
  terminalLines,
}: ProjectCardProps) => {
  return (
    <motion.article
      whileHover={{
        y: -6,
        boxShadow: "0 0 0 1px #3dd6c840, 0 0 16px #3dd6c820",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-borderline bg-royal"
    >
      <span className="absolute left-3 top-3 z-10 font-mono text-xs text-butter/30">
        {`0${index + 1}`}
      </span>

      <div className="relative aspect-video overflow-hidden bg-sapphire flex flex-col">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-borderline/60 bg-royal/80 shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-rust/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-lemon/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-tealcyber/40" />
          <span className="ml-2 font-mono text-[9px] tracking-widest text-butter/25">
            terminal — bash
          </span>
        </div>
        <div className="flex-1 overflow-hidden p-3 flex flex-col gap-0.5">
          {terminalLines.map((line, i) => (
            <p
              key={i}
              className={`font-mono text-[10px] leading-relaxed ${
                line.type === "cmd"
                  ? "text-tealcyber/80"
                  : "text-butter/45"
              }`}
            >
              {line.text}
            </p>
          ))}
          <p className="font-mono text-[10px] text-tealcyber/80 mt-0.5">
            <span className="animate-pulse">▋</span>
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-royal/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="p-5">
        <GlitchText
          text={title}
          as="h3"
          className="font-display text-base text-butter tracking-wide group-hover:text-lemon transition-colors"
          scrambleOnHover={true}
          scrambleDuration={500}
        />

        <div className="mt-1 mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-butter/30">
            Duration
          </span>
          <span className="font-mono text-[10px] text-tealcyber/60">
            {startDate} → {endDate}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-butter/60">
          {description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${title} tech stack`}>
          {techStack.map((tech) => (
            <li key={`${title}-${tech}`}>
              <span className="rounded-full border border-tealcyber/30 bg-tealcyber/10 px-2 py-0.5 font-mono text-xs text-tealcyber">
                {tech}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${title}`}
            className="cyber-focus rounded-sm font-mono text-xs text-butter/40 transition-colors hover:text-lemon"
          >
            <FiGithub className="mr-1.5 inline" aria-hidden="true" />
            View Source
          </a>

          <FiArrowUpRight
            aria-hidden="true"
            className="text-butter/20 transition-colors group-hover:text-tealcyber"
          />
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
