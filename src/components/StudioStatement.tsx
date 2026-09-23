import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mark from "./Mark";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO =
  "CONSTRUIM UN SISTEM SOLID ÎN FOTBALUL ROMÂNESC, UNDE TRANSPARENȚA, PERFORMANȚA ADMINISTRATIVĂ ȘI DEZVOLTAREA PE TERMEN LUNG CONVERG ÎN REZULTATE CONCRETE.";

const PILONI = [
  "PLAYER ADVISORY",
  "CLUB SOLUTIONS",
  "MULTI-CLUB HERITAGE",
  "COMMERCIAL",
];

export default function StudioStatement() {
  const manifestoRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = manifestoRef.current?.querySelectorAll(".manifesto-word");
    if (!words || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      data-cursor-bg="light"
      className="relative w-full bg-bone px-4 py-24 text-[#0F1012] sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <span className="mb-8 block font-mono text-xs font-bold uppercase tracking-widest text-black/50">
          / MANIFEST ZECRO
        </span>

        <h2
          ref={manifestoRef}
          className="max-w-5xl text-3xl font-bold uppercase leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
        >
          {MANIFESTO.split(" ").map((word, i) => (
            <span key={i} className="manifesto-word mr-[0.28em] inline-block">
              {word}
            </span>
          ))}
        </h2>

        <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          {/* Left column */}
          <div className="md:col-span-5">
            <h3 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-black/50">
              FILOZOFIE
            </h3>
            <p className="max-w-md text-lg leading-relaxed text-black/75 sm:text-xl">
              Refuzăm soluțiile de moment și promisiunile deșarte în favoarea
              unui management sportiv integrat și profesionist. Prin
              îmbinarea rigurozității administrative cu susținerea dedicată a
              fiecărui atlet, transformăm provocările din fotbalul românesc
              în oportunități reale de progres.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-black/15 pt-8">
              {[
                ["100%", "TRANSPARENȚĂ"],
                ["FIFA", "AGENȚI LICENȚIAȚI"],
              ].map(([num, label]) => (
                <div key={label}>
                  <div className="font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {num}
                  </div>
                  <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black/50">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle column - brand mark */}
          <div className="flex flex-col items-center md:col-span-4">
            <div className="relative flex w-56 items-center justify-center sm:w-64 md:w-72 lg:w-80">
              <div className="pointer-events-none absolute -inset-4 rounded-full border-4 border-dashed border-black/20 [animation:spin_30s_linear_infinite]" />
              <div className="flex aspect-square w-full items-center justify-center rounded-full bg-obsidian">
                <Mark className="w-2/5 text-accent" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-3">
            <h3 className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-black/50">
              PILONI
            </h3>
            <ul className="space-y-3">
              {PILONI.map((d) => (
                <li
                  key={d}
                  className="border-b border-black/10 pb-3 font-mono text-xs font-bold uppercase tracking-widest text-black/50"
                >
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-10 font-mono text-[10px] font-bold uppercase tracking-widest text-black/50">
              EST. 2024 / ROMÂNIA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
