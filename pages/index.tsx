import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';

const Home = () => {
  const profileName = 'Mohit Kumar';

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-background bg-grid-subtle bg-grid text-text">
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

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <motion.section
          id="about"
          className="section scroll-mt-24"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={childVariants} className="max-w-[65ch]">
            <h1 className="mb-5 text-4xl font-semibold tracking-tight text-text md:text-5xl">
              I build scalable, user-centric web applications.
            </h1>
            <p className="mb-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg">
              Full-stack delivery with React, Next.js, TypeScript, Node.js, and product-focused UI
              systems designed for speed, accessibility, and long-term maintainability.
            </p>
          </motion.div>

          <motion.div variants={childVariants} className="mb-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.ul
            variants={childVariants}
            className="grid max-w-[65ch] gap-3 text-sm text-zinc-600 sm:grid-cols-3 dark:text-zinc-300"
          >
            <li className="rounded-lg border border-zinc-200/80 bg-surface px-4 py-3 dark:border-zinc-800">
              3+ Major Projects
            </li>
            <li className="rounded-lg border border-zinc-200/80 bg-surface px-4 py-3 dark:border-zinc-800">
              Full Stack Focus
            </li>
            <li className="rounded-lg border border-zinc-200/80 bg-surface px-4 py-3 dark:border-zinc-800">
              Strong UI/UX Foundation
            </li>
          </motion.ul>
        </motion.section>

        <motion.section
          className="section scroll-mt-24"
          aria-labelledby="about-heading"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={childVariants}
            className="mb-6 h-12 w-12 rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
          <motion.h2
            variants={childVariants}
            id="about-heading"
            className="mb-5 text-2xl font-semibold tracking-tight text-text md:text-3xl"
          >
            About
          </motion.h2>
          <motion.p variants={childVariants} className="max-w-[65ch] leading-relaxed text-zinc-600 dark:text-zinc-300">
            Product teams often struggle with slow interfaces, unclear user flows, and frontend code
            that becomes hard to scale. My approach is to align product goals with a clean system
            architecture, prioritize accessibility from the start, and iterate quickly with measurable
            performance improvements. The outcome is dependable web products that feel intuitive to
            users and easier for teams to evolve over time.
          </motion.p>
          <motion.p variants={childVariants} className="mt-6 text-sm text-zinc-600 dark:text-zinc-300">
            Connect on{' '}
            <a
              href="www.linkedin.com/in/mohit-kumar-patwari"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              LinkedIn
            </a>{' '}
            and{' '}
            <a
              href="https://github.com/mohitk-patwari"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              GitHub
            </a>
            .
          </motion.p>
        </motion.section>

        <motion.section
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={childVariants}>
            <Education />
          </motion.div>
        </motion.section>

        <motion.section
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={childVariants}>
            <Skills />
          </motion.div>
        </motion.section>

        <motion.section
          className="section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={childVariants}>
            <Projects />
          </motion.div>
        </motion.section>

        <motion.footer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={childVariants}
          className="mt-14 border-t border-zinc-200 py-8 dark:border-zinc-800"
        >
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            &copy; 2026 {profileName}. All rights reserved.
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default Home;
