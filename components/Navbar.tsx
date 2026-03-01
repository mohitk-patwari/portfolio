import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

type SectionId = 'about' | 'education' | 'skills' | 'projects';

interface NavItem {
  href: `#${SectionId}`;
  label: string;
  id: SectionId;
}

const navItems: NavItem[] = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#education', label: 'Education', id: 'education' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#projects', label: 'Projects', id: 'projects' },
];

const sectionTargets: Record<SectionId, string[]> = {
  about: ['about', 'home'],
  education: ['education'],
  skills: ['skills'],
  projects: ['projects'],
};

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('about');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const drawerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const resolveSection = useCallback((sectionId: SectionId): HTMLElement | null => {
    const targetIds = sectionTargets[sectionId];

    for (const id of targetIds) {
      const element = document.getElementById(id);
      if (element) {
        return element;
      }
    }

    return null;
  }, []);

  const observedSections = useMemo<SectionId[]>(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elementToSection = new Map<Element, SectionId>();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visible[0];
        if (!topEntry) {
          return;
        }

        const sectionId = elementToSection.get(topEntry.target);
        if (sectionId) {
          setActiveSection(sectionId);
        }
      },
      {
        rootMargin: '-22% 0px -58% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    observedSections.forEach((sectionId) => {
      const element = resolveSection(sectionId);
      if (element) {
        elementToSection.set(element, sectionId);
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [observedSections, resolveSection]);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusDrawer = () => {
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
      focusable?.[0]?.focus();
    };

    focusDrawer();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) {
        return;
      }

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isMobileOpen]);

  const handleNavigate =
    (sectionId: SectionId) => (event: MouseEvent<HTMLAnchorElement> | ReactKeyboardEvent) => {
      event.preventDefault();
      const section = resolveSection(sectionId);

      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      window.history.replaceState(null, '', `#${sectionId}`);
      setActiveSection(sectionId);
      setIsMobileOpen(false);
    };

  const navContainerClass = isScrolled
    ? 'bg-white/80 shadow-sm dark:bg-zinc-950/80'
    : 'bg-white/55 dark:bg-zinc-950/55';

  return (
    <header className="sticky top-0 z-40">
      <nav
        className={`border-b border-zinc-200 backdrop-blur-md transition-colors dark:border-zinc-800 ${navContainerClass}`}
        aria-label="Primary"
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a
            href="#about"
            onClick={handleNavigate('about')}
            className="text-lg font-semibold tracking-tight text-zinc-900 transition-colors hover:text-primary dark:text-zinc-100"
            aria-label="Back to top"
          >
            M.
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-100/70 p-1 md:flex dark:border-zinc-700 dark:bg-zinc-900/80">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id} className="relative">
                  <a
                    href={item.href}
                    onClick={handleNavigate(item.id)}
                    className={`relative z-10 block rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-zinc-900 dark:text-zinc-50'
                        : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm dark:bg-zinc-800"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 p-2 text-zinc-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:hidden dark:border-zinc-700 dark:text-zinc-200"
          >
            {isMobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full bg-zinc-900/35"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close navigation drawer"
            />

            <motion.aside
              ref={drawerRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute right-0 top-0 h-full w-72 border-l border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="rounded-md border border-zinc-200 p-2 text-zinc-700 transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 dark:border-zinc-700 dark:text-zinc-200"
                >
                  <FiX size={16} />
                </button>
              </div>

              <nav aria-label="Mobile primary">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                      <li key={`mobile-${item.id}`}>
                        <a
                          href={item.href}
                          onClick={handleNavigate(item.id)}
                          className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                              : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                          }`}
                          aria-current={isActive ? 'location' : undefined}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
