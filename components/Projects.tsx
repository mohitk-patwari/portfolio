import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
    title: string;
    description: string;
    techStack: string[];
    repoUrl: string;
}

const projectsData: Project[] = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with Next.js and PostgreSQL, featuring real-time inventory management and payment processing.',
        techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        repoUrl: 'https://github.com/yourusername/ecommerce-platform',
    },
    {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, user authentication, and drag-and-drop functionality.',
        techStack: ['React', 'Firebase', 'Framer Motion', 'TypeScript'],
        repoUrl: 'https://github.com/yourusername/task-manager',
    },
    {
        title: 'Portfolio Website',
        description: 'A minimalist personal portfolio website showcasing projects and skills with dark mode support and smooth animations.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        repoUrl: 'https://github.com/yourusername/portfolio',
    },
];

const Projects: React.FC = () => {
    return (
        <div className="p-4" id="projects">
            <h2 className="text-xl font-bold text-text mb-6">Projects</h2>
            <div>
                {projectsData.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        techStack={project.techStack}
                        repoUrl={project.repoUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
