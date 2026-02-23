import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiGithub } from 'react-icons/fi';

const Project1: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-text">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link href="/">
                    <a className="inline-flex items-center gap-2 text-gray-400 hover:text-text mb-8 transition">
                        <FiArrowLeft size={20} />
                        Back to Portfolio
                    </a>
                </Link>

                <h1 className="text-4xl font-bold text-text mb-4">E-Commerce Platform</h1>
                <p className="text-gray-400 mb-8">
                    A full-stack e-commerce platform built with Next.js and PostgreSQL, featuring real-time inventory
                    management and payment processing.
                </p>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-text mb-4">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'].map((tech, idx) => (
                            <span key={idx} className="bg-gray-800 text-text px-3 py-1 rounded text-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-text mb-4">Features</h2>
                    <ul className="list-disc pl-5 text-gray-400">
                        <li>Real-time inventory management</li>
                        <li>Secure payment processing with Stripe</li>
                        <li>User authentication and authorization</li>
                        <li>Responsive design for all devices</li>
                        <li>Admin dashboard for product management</li>
                    </ul>
                </div>

                <div className="flex gap-4">
                    <a
                        href="https://github.com/mohit/ecommerce-platform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-800 text-text px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        <FiGithub size={20} />
                        View Repository
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Project1;
