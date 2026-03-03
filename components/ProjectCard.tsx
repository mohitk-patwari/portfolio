import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import GlitchText from "./GlitchText";

export interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
  startDate: string;
  endDate: string;
}

const ProjectCard = ({
  title,
  description,
  techStack,
  repoUrl,
  imageSrc,
  imageAlt,
  index,
  startDate,
  endDate,
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

      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal via-royal/20 to-transparent" />
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
