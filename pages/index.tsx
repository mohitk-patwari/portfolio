import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';

const Home: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="min-h-screen bg-background text-text">
            <Navbar />
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <motion.div
                className="max-w-4xl mx-auto px-6 py-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
                        Hi, I'm [Your Name]
                    </h1>
                    <p className="text-lg text-gray-400 mb-2">
                        Full-Stack Developer & UI/UX Enthusiast
                    </p>
                    <p className="text-gray-500 max-w-2xl">
                        I build beautiful, functional web applications with a focus on minimalist design
                        and user experience. Specializing in React, TypeScript, and modern web technologies.
                    </p>
                </motion.div>

                {/* Education Section */}
                <motion.div variants={itemVariants} className="mb-12">
                    <Education />
                </motion.div>

                {/* Skills Section */}
                <motion.div variants={itemVariants} className="mb-12">
                    <Skills />
                </motion.div>

                {/* Projects Section */}
                <motion.div variants={itemVariants} className="mb-12">
                    <Projects />
                </motion.div>

                {/* Footer */}
                <motion.div variants={itemVariants} className="py-8 border-t border-gray-700 mt-12">
                    <p className="text-center text-gray-500">
                        © 2026 [Your Name]. All rights reserved.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;
