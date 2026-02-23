import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';

const Home = () => {
  const profileName = 'Mohit Kumar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-background bg-grid-subtle bg-grid bg-radial-fade text-text">
      <Head>
        <title>{`${profileName} | Portfolio`}</title>
        <meta
          name="description"
          content="Portfolio of Mohit Kumar, a frontend-focused full-stack developer building performant, accessible, and scalable web applications."
        />
      </Head>

      <Navbar />
      <div className="fixed right-4 top-20 z-50 md:top-4">
        <ThemeToggle />
      </div>

      <motion.main
        className="mx-auto max-w-4xl px-6 py-12 md:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          id="home"
          className="mb-16 scroll-mt-24 py-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text md:text-6xl">
            Hi, I&apos;m {profileName}
          </h1>
          <p className="mb-4 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
            Full-Stack Developer and UI/UX Enthusiast
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            I build thoughtful, high-performing web applications with clean interfaces and
            accessible interactions. I specialize in React, TypeScript, and modern frontend
            architecture.
          </p>
        </motion.section>

        <motion.div variants={itemVariants} className="mb-12">
          <Education />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <Skills />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <Projects />
        </motion.div>

        <motion.footer
          variants={itemVariants}
          className="mt-14 border-t border-zinc-200 py-8 dark:border-zinc-800"
        >
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            &copy; 2026 {profileName}. All rights reserved.
          </p>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Home;
