import React from 'react';
import { FiGithub } from 'react-icons/fi';

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    repoUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, techStack, repoUrl }) => {
    return (
        <div className="border border-gray-700 rounded-lg p-6 mb-6 hover:border-gray-500 transition">
            <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
            <p className="text-gray-400 mb-4">{description}</p>
            <div className="mb-4">
                <p className="text-sm font-semibold text-text mb-2">Tech Stack:</p>
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-gray-800 text-text px-2 py-1 rounded text-xs"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 text-text px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    <FiGithub size={18} />
                    Repository
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
