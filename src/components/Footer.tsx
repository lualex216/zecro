import { useState } from "react";
import Logo from "./Logo";

const PROJECT_TYPES = [
  "Player Advisory",
  "Club Solutions",
  "Multi-Club Heritage",
  "Commercial",
];

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer
      id="contact"
      className="relative w-full scroll-mt-24 bg-obsidian-3 px-4 pb-8 pt-24 text-white sm:px-8 sm:pt-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 md:grid-cols-2 md:gap-20">
          <div>
            <span className="block font-mono text-xs font-bold uppercase tracking-widest text-white/50">
              / CONTACT
            </span>
            <h2 className="mt-6 font-sans text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-6xl">
              Ai un proiect în minte?
            </h2>
            <a
              href="mailto:contact@zecro.ro"
              className="mt-8 inline-block border-b border-white/30 text-xl text-white transition-colors hover:border-accent hover:text-accent sm:text-2xl"
            >
              contact@zecro.ro
            </a>
          </div>

          {submitted ? (
            <div className="flex flex-col items-start justify-center gap-3">
              <h3 className="font-sans text-2xl font-extrabold uppercase tracking-tight text-white">
                Mesaj trimis
              </h3>
              <p className="max-w-sm text-sm text-white/60">
                Mulțumim. Echipa ZECRO îți va răspunde în cel mai scurt timp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Club / Organizație
                </label>
                <input
                  type="text"
                  placeholder="Opțional"
                  className="border-b border-white/20 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Tip solicitare
                </label>
                <select
                  defaultValue={PROJECT_TYPES[0]}
                  className="border-b border-white/20 bg-transparent py-2 text-white outline-none focus:border-accent [&>option]:bg-obsidian-3"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Mesaj
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Spune-ne despre proiectul tău și obiectivele urmărite..."
                  className="resize-none border-b border-white/20 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-accent"
                />
              </div>

              <button
                type="submit"
                data-cursor="TRIMITE"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
              >
                Trimite mesajul <span>&#8599;</span>
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo className="w-32 text-white" />
            <p className="mt-3 max-w-xs text-sm text-white/50">
              Agenție de management sportiv care construiește viitorul
              fotbalului românesc.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                Meniu
              </span>
              <a href="#studio" className="text-sm text-white/70 hover:text-white">
                Despre noi
              </a>
              <a href="#work" className="text-sm text-white/70 hover:text-white">
                Portofoliu
              </a>
              <a href="#capabilities" className="text-sm text-white/70 hover:text-white">
                Servicii
              </a>
              <a href="#faq" className="text-sm text-white/70 hover:text-white">
                FAQ
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                Social
              </span>
              <span className="text-sm text-white/70">Instagram</span>
              <span className="text-sm text-white/70">LinkedIn</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 ZECRO. All rights reserved.</span>
          <span>INDEPENDENT / ROMÂNIA</span>
        </div>
      </div>
    </footer>
  );
}
