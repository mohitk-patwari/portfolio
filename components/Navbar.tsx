import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

type SectionId = "home" | "about" | "education" | "skills" | "projects";

type NavItem = {
  id: SectionId;
  label: string;
  href: `#${SectionId}`;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "education", label: "Education", href: "#education" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const sectionIds = useMemo(
    () => new Set<SectionId>(navItems.map((item) => item.id)),
    []
  );

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    ).filter((section) => sectionIds.has(section.id as SectionId));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible[0]) {
          return;
        }

        setActiveSection(visible[0].target.id as SectionId);
      },
      {
        rootMargin: "-28% 0px -52% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const onOutsideClick = (event: globalThis.MouseEvent) => {
      if (!navRef.current) {
        return;
      }

      const target = event.target as Node;
      if (!navRef.current.contains(target)) {
        setIsMobileOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", onOutsideClick as EventListener);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("mousedown", onOutsideClick as EventListener);
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavigate =
    (id: SectionId) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const target = document.getElementById(id);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      setActiveSection(id);
      setIsMobileOpen(false);
      window.history.replaceState(null, "", `#${id}`);
    };

  const linkClass =
    "cyber-focus relative px-1 py-2 font-mono text-sm text-butter/70 transition-colors duration-200 hover:text-tealcyber focus-visible:rounded-sm";

  return (
    <header
      ref={navRef}
      className="fixed left-1/2 top-4 z-50 w-[92vw] max-w-3xl -translate-x-1/2 rounded-2xl border border-borderline bg-[rgba(13,45,82,0.75)] px-6 py-3 shadow-[0_0_0_1px_#3dd6c820,0_0_40px_#0a162880] backdrop-blur-xl"
    >
      <nav className="flex items-center justify-between" aria-label="Primary">
        <a
          href="#home"
          onClick={onNavigate("home")}
          className="cyber-focus flex items-center gap-2 focus-visible:rounded-sm"
          aria-label="Go to home section"
        >
          <span className="font-display text-xl text-lemon glow-lemon">M.</span>
          <span className="rounded-full border border-tealcyber/30 bg-tealcyber/10 px-2 py-0.5 font-mono text-xs text-tealcyber">
            v2.0
          </span>
        </a>

        <ul className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={item.href}
                  onClick={onNavigate(item.id)}
                  className={`${linkClass} ${isActive ? "text-lemon glow-lemon" : ""}`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="navline"
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-lemon"
                    transition={{ type: "spring", stiffness: 500, damping: 34 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center md:flex">
          <span className="h-2 w-2 rounded-full bg-tealcyber animate-pulse-slow" />
          <span className="ml-1 font-mono text-xs text-tealcyber/70">ONLINE</span>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="cyber-focus inline-flex items-center justify-center rounded-md p-1.5 text-butter md:hidden"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-2 rounded-2xl border border-borderline bg-royal/95 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={`mobile-${item.id}`} className="relative">
                    <a
                      href={item.href}
                      onClick={onNavigate(item.id)}
                      className={`${linkClass} block ${isActive ? "text-lemon glow-lemon" : ""}`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {item.label}
                    </a>
                    {isActive && (
                      <motion.span
                        layoutId="navline"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-lemon"
                        transition={{ type: "spring", stiffness: 500, damping: 34 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
