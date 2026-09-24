import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const BUDGETS = ["< 10K€", "10K€ — 50K€", "50K€ — 100K€", "100K€+"];
const TYPES = ["One Task Only", "Player Advisory", "Club Solutions", "Multi-Club Heritage", "Commercial"];

export default function ProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [type, setType] = useState("One Task Only");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            id="contact"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-white/10 bg-obsidian-2/95 px-6 py-8 backdrop-blur-2xl sm:px-10 sm:py-12"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
                / ÎNCEPE UN PROIECT
              </span>
              <button
                onClick={handleClose}
                aria-label="Închide"
                data-cursor="ÎNCHIDE"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <h3 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-white">
                  Solicitare primită
                </h3>
                <p className="max-w-xs text-sm text-white/60">
                  Mulțumim. Echipa ZECRO îți va răspunde în 48 de ore cu
                  următorii pași.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 flex flex-1 flex-col gap-8">
                <h2 className="font-sans text-3xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-4xl">
                  Spune-ne despre viziunea ta.
                </h2>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Nume
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ion Popescu"
                    className="border-b border-white/20 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="ion@companie.ro"
                    className="border-b border-white/20 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Interval de buget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${
                          budget === b
                            ? "border-accent bg-accent text-ink"
                            : "border-white/15 text-white/70 hover:border-white/40"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Tip proiect
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setType(t)}
                        className={`rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${
                          type === t
                            ? "border-accent bg-accent text-ink"
                            : "border-white/15 text-white/70 hover:border-white/40"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Mesaj
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Spune-ne despre proiectul tău, termenul și obiectivele..."
                    className="resize-none border-b border-white/20 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor="TRIMITE"
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-accent py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.02]"
                >
                  Trimite solicitarea <ArrowUpRight size={14} strokeWidth={2.5} />
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
