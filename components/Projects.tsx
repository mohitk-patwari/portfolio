import ProjectCard, { ProjectCardProps } from './ProjectCard';

const projectsData: ProjectCardProps[] = [
  {
    title: 'microops-watchtower',
    description:
      'Operational observability dashboard for tracking service health, incident trends, and reliability signals in one place.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    repoUrl: 'https://github.com/mohit/microops-watchtower',
    imageSrc: '/projects/microops-watchtower.svg',
    imageAlt: 'Preview thumbnail for microops-watchtower project',
  },
  {
    title: 'DBS-Lab-Project',
    description:
      'Database systems lab project focused on query workflow design, schema optimization, and reliable data access patterns.',
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'SQL'],
    repoUrl: 'https://github.com/mohit/DBS-Lab-Project',
    imageSrc: '/projects/dbs-lab-project.svg',
    imageAlt: 'Preview thumbnail for DBS-Lab-Project',
  },
  {
    title: 'Smart-Expense-Tracker',
    description:
      'Personal finance tracker that streamlines budget visibility with category insights and clear monthly spending summaries.',
    techStack: ['React', 'TypeScript', 'Firebase', 'Framer Motion'],
    repoUrl: 'https://github.com/mohit/Smart-Expense-Tracker',
    imageSrc: '/projects/smart-expense-tracker.svg',
    imageAlt: 'Preview thumbnail for Smart-Expense-Tracker project',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section scroll-mt-24" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="mb-6 text-2xl font-semibold tracking-tight text-text md:text-3xl">
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            repoUrl={project.repoUrl}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
