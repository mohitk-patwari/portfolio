import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiGithub } from 'react-icons/fi';

const Project2: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-text">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link href="/">
                    <a className="inline-flex items-center gap-2 text-gray-400 hover:text-text mb-8 transition">
                        <FiArrowLeft size={20} />
                        Back to Portfolio
                    </a>
                </Link>

                <h1 className="text-4xl font-bold text-text mb-4">Task Management App</h1>
                <p className="text-gray-400 mb-8">
                    A collaborative task management application with real-time updates, user authentication, and
                    drag-and-drop functionality for seamless task organization.
                </p>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-text mb-4">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Firebase', 'Framer Motion', 'TypeScript'].map((tech, idx) => (
                            <span key={idx} className="bg-royal text-text px-3 py-1 rounded text-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-text mb-4">Features</h2>
                    <ul className="list-disc pl-5 text-gray-400">
                        <li>Real-time task updates with Firebase</li>
                        <li>Drag-and-drop task organization</li>
                        <li>User authentication with Google Sign-In</li>
                        <li>Smooth animations with Framer Motion</li>
                        <li>Collaborative task sharing</li>
                    </ul>
                </div>

                <div className="flex gap-4">
                    <a
                        href="https://github.com/mohit/task-manager"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-royal text-text px-4 py-2 rounded hover:bg-sapphire transition"
                    >
                        <FiGithub size={20} />
                        View Repository
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Project2;
