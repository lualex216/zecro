import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Menu } from "lucide-react";
import Logo from "./Logo";
import { useMediaQuery } from "../hooks/useMediaQuery";

const LINKS = [
  { label: "DESPRE NOI", href: "#studio" },
  { label: "PORTOFOLIU", href: "#work" },
  { label: "SERVICII", href: "#capabilities" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("DESPRE NOI");
  const [mobileOpen, setMobileOpen] = useState(false);
  // Width alone can't tell an iPad Pro 12.9" in portrait (1024px) apart from
  // an iPad mini in landscape (also 1024px) — requiring landscape too
  // resolves that overlap, so tablets only get the inline nav when rotated.
  const isDesktopNav = useMediaQuery(
    "(min-width: 960px) and (orientation: landscape)"
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isDesktopNav) setMobileOpen(false);
  }, [isDesktopNav]);

  const handleNav = (label: string, href: string) => {
    setActive(label);
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
      <motion.div
        animate={{
          maxWidth: scrolled ? 1550 : 1720,
          marginTop: scrolled ? 14 : 24,
          paddingLeft: scrolled ? 20 : 0,
          paddingRight: scrolled ? 20 : 0,
          paddingTop: scrolled ? 10 : 0,
          paddingBottom: scrolled ? 10 : 0,
          backgroundColor: scrolled ? "rgba(19,19,17,0.95)" : "rgba(0,0,0,0)",
          borderRadius: scrolled ? 9999 : 0,
          boxShadow: scrolled
            ? "0 8px 30px rgba(0,0,0,0.35)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className={`w-full flex items-center justify-between backdrop-blur-xl ${
          scrolled ? "border border-white/15" : "border border-transparent"
        }`}
      >
        <a
          href="#top"
          data-cursor="ACASĂ"
          className="flex items-center text-white"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Logo className="w-28 sm:w-32" />
        </a>

        {isDesktopNav ? (
          <>
            <nav className="flex items-center gap-1 relative">
              {LINKS.map((l) => (
                <button
                  key={l.label}
                  data-cursor="VEZI"
                  onClick={() => handleNav(l.label, l.href)}
                  className="relative px-4 py-2 font-mono text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors"
                >
                  {active === l.label && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </button>
              ))}
            </nav>

            <button
              data-cursor="START"
              onClick={onOpenModal}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-bold tracking-widest uppercase text-ink transition-transform hover:scale-105"
            >
              ÎNCEPE UN PROIECT <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <button
            className="text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-obsidian px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <Logo className="w-32 text-white" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="text-white" size={26} />
              </button>
            </div>
            <div className="mt-16 flex flex-1 flex-col justify-center gap-8">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNav(l.label, l.href)}
                  className="text-left font-sans text-4xl font-extrabold uppercase tracking-tight text-white"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenModal();
              }}
              className="mb-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-4 font-mono text-xs font-bold tracking-widest uppercase text-ink"
            >
              ÎNCEPE UN PROIECT <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
