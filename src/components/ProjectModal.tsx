import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const BUDGETS = ["< $20K", "$20K — $50K", "$50K — $100K", "$100K+"];
const TYPES = ["Brand Identity", "Digital Flagship", "WebGL / Motion", "Retainer"];

export default function ProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [type, setType] = useState(TYPES[0]);

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
                aria-label="Close"
                data-cursor="ÎNCHIDE"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <h3 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-white">
                  Inquiry Received
                </h3>
                <p className="max-w-xs text-sm text-white/60">
                  Thank you. Our team will respond within 48 hours with next
                  steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 flex flex-1 flex-col gap-8">
                <h2 className="font-sans text-3xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-4xl">
                  Tell us about your vision.
                </h2>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Jane Appleseed"
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
                    placeholder="jane@company.com"
                    className="border-b border-white/20 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Budget Range
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
                    Project Type
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
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project, timeline, and goals..."
                    className="resize-none border-b border-white/20 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor="TRIMITE"
                  className="mt-2 w-full rounded-full bg-accent py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-[1.02]"
                >
                  Submit Inquiry &#8599;
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
