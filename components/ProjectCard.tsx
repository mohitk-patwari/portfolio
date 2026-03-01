import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';

export interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  imageSrc: string;
  imageAlt: string;
}

const ProjectCard = ({ title, description, techStack, repoUrl, imageSrc, imageAlt }: ProjectCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/90 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <div className="relative aspect-video w-full border-b border-zinc-200 dark:border-zinc-800">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-text">{title}</h3>
        <p className="mb-4 text-sm leading-6 text-zinc-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden dark:text-zinc-300">
          {description}
        </p>

        <ul className="mb-5 flex flex-wrap gap-2" aria-label={`${title} tech stack`}>
          {techStack.map((tech) => (
            <li key={tech}>
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {tech}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open repository for ${title} on GitHub`}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-primary dark:hover:text-primary"
        >
          <FiGithub aria-hidden="true" size={16} />
          <span>Repository</span>
        </a>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
