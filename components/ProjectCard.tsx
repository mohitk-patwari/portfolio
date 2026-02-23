import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';

export interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
}

const ProjectCard = ({ title, description, techStack, repoUrl }: ProjectCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <h3 className="mb-2 text-xl font-semibold tracking-tight text-text">{title}</h3>
      <p className="mb-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description}</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open repository for ${title} in a new tab`}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-primary dark:hover:text-primary"
      >
        <FiGithub aria-label={`GitHub icon for ${title}`} size={16} />
        <span>Repository</span>
        <span className="sr-only">{`for ${title}`}</span>
      </a>
    </motion.article>
  );
};

export default ProjectCard;
