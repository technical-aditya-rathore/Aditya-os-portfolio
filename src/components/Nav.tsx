import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navItems, personalInfo } from "@/data/portfolio";
import { useActiveSection } from "@/lib/hooks";

interface NavProps {
  isDay: boolean;
  onThemeToggle: () => void;
}

export default function Nav({ isDay, onThemeToggle }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.href.replace("#", "")));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-80 flex justify-center px-4 sm:px-6">
        <nav
          className={`w-full flex items-center justify-between rounded-full glow-border glass transition-all duration-300 ${
            scrolled ? "mt-3 max-w-5xl px-4 py-2" : "mt-5 max-w-[1350px] px-5 py-3"
          }`}
        >
          <a
            href="#home"
            className="font-display font-semibold text-sm tracking-tight text-[var(--color-text)] flex items-center gap-2 shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-signal)] shadow-[0_0_8px_var(--color-signal)]" />
            ADITYA<span className="signal-text">.OS</span>
          </a>

          <ul className="hidden lg:flex items-center gap-1 font-mono text-[11px] tracking-wider uppercase">
            {navItems.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`px-3 py-1.5 rounded-full transition-colors block ${
                      isActive
                        ? "text-[var(--color-ink)] bg-[var(--color-signal)]"
                        : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onThemeToggle}
              aria-label={isDay ? "Switch to night view" : "Switch to day view"}
              aria-pressed={isDay}
              title={isDay ? "Switch to night view" : "Switch to day view"}
              className="w-9 h-9 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-signal)] hover:border-[var(--color-signal)] transition-colors"
            >
              {isDay ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] transition-colors"
            >
              Resume
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-[var(--color-text)]"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99 bg-[var(--color-ink)]/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-line)]">
              <span className="font-display font-semibold text-sm">
                ADITYA<span className="signal-text">.OS</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[var(--color-text)]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <ul className="flex-1 flex flex-col justify-center gap-1 px-8 font-display">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline gap-3 py-3 text-3xl font-medium text-[var(--color-text)] hover:text-[var(--color-signal)] transition-colors"
                  >
                    <span className="font-mono text-xs text-[var(--color-text-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-8 mb-8 text-center rounded-full bg-[var(--color-signal)] text-[var(--color-ink)] font-mono text-xs uppercase tracking-wider py-3.5"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
