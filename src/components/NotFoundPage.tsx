import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

// Pagina 404: prerandată în dist/404.html (serverul o trimite cu status 404 pentru orice rută
// inexistentă, inclusiv un articol încă nepublicat) și afișată și de client pe rute necunoscute.
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-obsidian text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
          <a href="/" aria-label="ZECRO — pagina principală" className="text-white">
            <Logo className="w-28 sm:w-32" />
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-20 sm:px-8">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
          / EROARE 404
        </span>
        <h1 className="mt-6 font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Pagina nu a fost găsită
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
          Adresa nu există sau articolul nu a fost încă publicat. Poți continua de la pagina principală.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
          >
            Pagina principală <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
          <a
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-accent hover:text-accent"
          >
            Portofoliu
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-accent hover:text-accent"
          >
            Contact
          </a>
        </div>
      </main>
    </div>
  );
}
