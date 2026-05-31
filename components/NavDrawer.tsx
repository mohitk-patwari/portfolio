import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "./Logo";

type SectionId = "home" | "about" | "education" | "skills" | "projects";

const navItems = [
  { id: "home" as SectionId,      label: "Home",      href: "#home" },
  { id: "about" as SectionId,     label: "About",     href: "#about" },
  { id: "education" as SectionId, label: "Education", href: "#education" },
  { id: "skills" as SectionId,    label: "Skills",    href: "#skills" },
  { id: "projects" as SectionId,  label: "Projects",  href: "#projects" },
];

const overlayVariants = {
  hidden: { y: "-100%" },
  visible: { y: "0%", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as number[] } },
  exit:    { y: "-100%", transition: { duration: 0.45, ease: [0.64, 0, 0.78, 0] as number[] } },
};

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden:  { x: -50, opacity: 0 },
  visible: { x: 0,   opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const NavDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const onNavigate =
    (id: SectionId) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.history.replaceState(null, "", `#${id}`);
      }, 460);
    };

  return (
    <>
      {/* Hamburger / close button — always fixed top-left */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cyber-focus fixed top-4 left-4 z-[150] flex h-10 w-10 items-center justify-center rounded-lg border border-borderline bg-royal/70 backdrop-blur-sm transition-colors hover:border-lemon/40 hover:bg-glow"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="nav-drawer"
      >
        <span className="relative flex h-5 w-5 flex-col justify-between" aria-hidden="true">
          <motion.span
            className="block h-[2px] w-full bg-lemon origin-left"
            animate={isOpen ? { rotate: 45, y: 0, width: "141%" } : { rotate: 0, y: 0, width: "100%" }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-[2px] w-3/4 bg-lemon"
            animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-[2px] w-full bg-lemon origin-left"
            animate={isOpen ? { rotate: -45, y: 0, width: "141%" } : { rotate: 0, y: 0, width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[140] flex flex-col bg-sapphire px-8 py-6 md:px-16 md:py-10 overflow-hidden"
          >
            {/* Subtle background decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #3dd6c8 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Nav links */}
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 mt-16 flex flex-col gap-2 md:mt-20"
              aria-label="Site sections"
            >
              {navItems.map((item, i) => (
                <motion.li key={item.id} variants={itemVariants}>
                  <a
                    href={item.href}
                    onClick={onNavigate(item.id)}
                    className="group flex items-baseline gap-4 py-2 focus:outline-none"
                  >
                    <span className="font-mono text-xs text-tealcyber/40 tracking-widest w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="font-display text-4xl font-black text-lemon leading-none tracking-tight transition-all duration-200 group-hover:text-butter group-hover:glow-lemon md:text-6xl lg:text-7xl">
                      {item.label}
                    </span>
                  </a>
                  {i < navItems.length - 1 && (
                    <div className="ml-10 h-px bg-borderline/30" />
                  )}
                </motion.li>
              ))}
            </motion.ul>

            {/* Bottom bar */}
            <motion.div
              className="relative z-10 mt-auto flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
            >
              <Logo variant="full" />

              <div className="flex items-center gap-5">
                <a
                  href="https://github.com/mohitk-patwari"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="cyber-focus text-2xl text-butter/40 transition-colors hover:text-lemon"
                >
                  <FaGithub aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohitk-patwari"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="cyber-focus text-2xl text-butter/40 transition-colors hover:text-lemon"
                >
                  <FaLinkedin aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavDrawer;
