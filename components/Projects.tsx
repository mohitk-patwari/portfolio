import ProjectCard, { ProjectCardProps } from './ProjectCard';

const projectsData: ProjectCardProps[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack commerce app with real-time inventory workflows and secure payment processing.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    repoUrl: 'https://github.com/mohit/ecommerce-platform',
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative task manager with auth, drag-and-drop boards, and live task synchronization.',
    techStack: ['React', 'Firebase', 'Framer Motion', 'TypeScript'],
    repoUrl: 'https://github.com/mohit/task-manager',
  },
  {
    title: 'Portfolio Website',
    description:
      'A performance-focused developer portfolio with theme support and motion-enhanced interactions.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    repoUrl: 'https://github.com/mohit/portfolio',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="scroll-mt-24 p-4">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-text md:text-2xl">Projects</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            repoUrl={project.repoUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
