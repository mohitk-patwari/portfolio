import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

type SectionId = 'home' | 'education' | 'skills' | 'projects';

interface NavItem {
  href: `#${SectionId}`;
  label: string;
  id: SectionId;
}

const navItems: NavItem[] = [
  { href: '#education', label: 'Education', id: 'education' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#projects', label: 'Projects', id: 'projects' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sectionIds = useMemo<SectionId[]>(
    () => ['home', 'education', 'skills', 'projects'],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id as SectionId);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
      setIsMobileOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          onClick={scrollToSection('home')}
          className="text-lg font-semibold tracking-tight text-zinc-900 transition-colors hover:text-primary dark:text-zinc-100 dark:hover:text-primary"
          aria-label="Go to top of page"
        >
          MK
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-100/70 p-1 md:flex dark:border-zinc-700 dark:bg-zinc-900/80">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <li key={item.id} className="relative">
                <a
                  href={item.href}
                  onClick={scrollToSection(item.id)}
                  className={`relative z-10 block rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-zinc-900 dark:text-zinc-50'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm dark:bg-zinc-800"
                      transition={{ type: 'spring', stiffness: 450, damping: 36 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileOpen}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-200 p-2 text-zinc-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:hidden dark:border-zinc-700 dark:text-zinc-200"
        >
          {isMobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-zinc-200 bg-white/95 px-4 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950/95"
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <li key={`mobile-${item.id}`}>
                    <a
                      href={item.href}
                      onClick={scrollToSection(item.id)}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
