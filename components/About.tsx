import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import GlitchText from "./GlitchText";

const About = () => {
  return (
    <section
      id="about"
      className="section relative mx-auto max-w-6xl overflow-hidden px-6"
      aria-labelledby="about-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 select-none font-display text-[12rem] tracking-widest text-white/[0.02]"
      >
        ABOUT
      </div>

      <div className="relative z-10">
        <p className="mono-label">// WHO_AM_I</p>
        <GlitchText
          text="About Me"
          as="h2"
          className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2"
          scrambleOnHover={true}
          animDelay={100}
          scrambleDuration={800}
        />

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-5 font-body text-base leading-[1.8] text-butter/80">
              <p>
                I&apos;m a final-year engineering student who builds things that
                feel alive - not just functional. My work sits at the edge of
                clean architecture and creative expression.
              </p>
              <p>
                I approach every project like a workshop problem: identify the
                chaos, engineer the solution, then make it beautiful.
                Performance and aesthetics aren&apos;t opposites -
                they&apos;re collaborators.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m thinking about interfaces,
                systems, and why some digital experiences feel like home and
                others feel like waiting rooms.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="cyber-focus rounded-sm text-2xl text-butter/50 transition hover:text-lemon hover:glow-lemon"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="cyber-focus rounded-sm text-2xl text-butter/50 transition hover:text-tealcyber"
              >
                <FaGithub />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="overflow-hidden rounded-xl border border-borderline bg-royal glow-box-teal">
              <div className="flex items-center gap-2 border-b border-borderline bg-glow px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rust/70" />
                <span className="h-3 w-3 rounded-full bg-lemon/70" />
                <span className="h-3 w-3 rounded-full bg-tealcyber/70" />
                <span className="ml-2 font-mono text-xs text-butter/40">
                  mohit@workshop:~
                </span>
              </div>

              <div className="space-y-2 p-5 font-mono text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-tealcyber">$ whoami</span>
                  <span className="text-borderline">→</span>
                  <span className="text-butter/70">creative-engineer</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-tealcyber">$ uname -a</span>
                  <span className="text-borderline">→</span>
                  <span className="text-butter/70">NextJS 14 • TypeScript • Tailwind</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-tealcyber">$ uptime</span>
                  <span className="text-borderline">→</span>
                  <span className="text-butter/70">4 years learning, still going</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-tealcyber">$ git log --oneline</span>
                  <span className="text-borderline">→</span>
                  <span className="text-butter/70">3 projects • many commits</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-tealcyber">$ cat interests.txt</span>
                  <span className="text-borderline">→</span>
                  <span className="text-butter/70">systems, interfaces, coffee</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-tealcyber">$ echo $STATUS</span>
                  <span className="text-borderline">→</span>
                  <span className="text-butter/70">OPEN_TO_OPPORTUNITIES</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-tealcyber">$</span>
                  <span className="animate-pulse text-lemon">|</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="rounded-lg border border-borderline bg-sapphire px-3 py-2 font-mono text-xs">
                <span className="mb-0.5 block text-[10px] uppercase text-butter/30">COMMITS</span>
                <span className="text-sm font-bold text-tealcyber">100+</span>
              </div>
              <div className="rounded-lg border border-borderline bg-sapphire px-3 py-2 font-mono text-xs">
                <span className="mb-0.5 block text-[10px] uppercase text-butter/30">COFFEE</span>
                <span className="text-sm font-bold text-rust">∞</span>
              </div>
              <div className="rounded-lg border border-borderline bg-sapphire px-3 py-2 font-mono text-xs">
                <span className="mb-0.5 block text-[10px] uppercase text-butter/30">BUGS FIXED</span>
                <span className="text-sm font-bold text-lemon/70">most of them</span>
              </div>
            </div>

            <div className="mt-6 inline-flex rounded-full border border-rust/40 bg-rust/15 px-3 py-1 font-mono text-xs text-rust">
              {"\u26A1 Open to opportunities"}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
