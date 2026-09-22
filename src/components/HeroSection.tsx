import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const fit = () => {
      const container = el.parentElement;
      if (!container) return;
      el.style.fontSize = "100px";
      const naturalWidth = el.scrollWidth;
      if (naturalWidth > 0) {
        el.style.fontSize = `${(container.clientWidth / naturalWidth) * 100}px`;
      }
    };

    fit();
    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-obsidian"
    >
      <motion.img
        src="/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />

      <div className="relative z-10 flex h-full min-w-0 flex-col justify-between px-4 pt-28 pb-6 sm:px-8 sm:pt-32 sm:pb-8 lg:px-12">
        {/* Top statement block */}
        <div className="max-w-xl mt-10 sm:mt-16">
          <div className="flex items-start gap-4">
            <div className="h-12 w-1 shrink-0 rounded-full bg-white sm:h-16" />
            <p className="font-sans text-base leading-snug text-white/85 sm:text-lg">
              Agenție de management sportiv care construiește
              <br />
              viitorul fotbalului românesc.
            </p>
          </div>
          <button
            data-cursor="EXPLOREAZĂ"
            onClick={scrollToWork}
            className="group ml-5 mt-5 inline-flex w-fit items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-white"
          >
            <span className="group-hover:text-accent transition-colors">
              VEZI PORTOFOLIUL
            </span>
            <span className="h-px w-8 bg-white/40 group-hover:bg-accent transition-colors" />
            <span className="group-hover:text-accent transition-colors">&#8595;</span>
          </button>
        </div>

        {/* Bottom block */}
        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/80">
              EST. 2024
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="select-none whitespace-nowrap font-sans text-[13vw] font-extrabold uppercase leading-none tracking-tighter text-white drop-shadow-[0_0_45px_rgba(202,240,119,0.3)]"
          >
            MANAGEMENT SPORTIV
          </h1>
        </div>
      </div>
    </section>
  );
}
