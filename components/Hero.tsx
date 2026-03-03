import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import GlitchText from "./GlitchText";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const metrics = [
  { value: "3+", label: "Major Projects" },
  { value: "Full", label: "Stack Focus" },
  { value: "UI/UX", label: "Emphasis" },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[-5%] top-[-10%] h-96 w-96 rounded-full border border-borderline bg-[radial-gradient(circle,_#0d2d5240_0%,_transparent_70%)] animate-spin"
          style={{ animationDuration: "30s" }}
        />
        <div className="absolute bottom-[10%] left-[-3%] h-48 w-48 rounded-full border border-[#3dd6c820] bg-[radial-gradient(circle,_#3dd6c810_0%,_transparent_70%)]" />
        <div className="absolute left-0 right-0 top-[30%] h-px bg-[linear-gradient(90deg,_transparent,_#1e4976,_transparent)] opacity-40" />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-tealcyber/80">
            <span className="inline-block h-2 w-2 animate-pulse-slow rounded-full bg-tealcyber" />
            <span>
              <span className="text-lemon/60">&gt;&gt;</span>
              {" "}workspace_init.exe
              <span className="ml-1 animate-pulse text-lemon">_</span>
            </span>
            <span className="ml-auto hidden text-butter/20 md:block">[ PID: 4096 ]</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1">
          <GlitchText
            text="MOHIT"
            as="h1"
            className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-butter"
            animDelay={200}
            scrambleDuration={1400}
          />
          <GlitchText
            text="PATWARI"
            as="h1"
            className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-lemon glow-lemon"
            scrambleOnHover={true}
            animDelay={500}
            scrambleDuration={1000}
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 font-mono text-lg text-tealcyber glow-teal md:text-xl"
        >
          Full-stack developer. Digital dimension explorer.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-2 flex gap-6 font-mono text-[10px] tracking-widest text-butter/30"
        >
          <span>
            STATUS: <span className="text-tealcyber/70">AVAILABLE_FOR_HIRE</span>
          </span>
          <span>
            STACK: <span className="text-tealcyber/70">FULL</span>
          </span>
          <span>
            BUILD: <span className="text-lemon/50">PASSING ✓</span>
          </span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-[55ch] font-body text-base leading-[1.8] text-butter/70"
        >
          Building scalable, user-centric web applications at the intersection
          of imagination and engineering.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="cyber-focus rounded-lg border border-tealcyber bg-transparent px-6 py-3 font-mono text-sm text-tealcyber transition-all hover:bg-tealcyber/10 hover:glow-box-teal active:scale-95"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            className="cyber-focus rounded-lg bg-lemon px-6 py-3 font-mono text-sm font-bold text-sapphire transition-all hover:bg-lemon/80 active:scale-95"
          >
            <FiDownload className="mr-2 inline" />
            Download Resume
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 flex flex-wrap items-center gap-6">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="flex items-center gap-6">
              <div>
                <p className="font-display text-2xl text-lemon glow-lemon">
                  {metric.value}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-butter/50">
                  {metric.label}
                </p>
              </div>
              {index < metrics.length - 1 && (
                <div className="h-10 w-px bg-borderline" />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
