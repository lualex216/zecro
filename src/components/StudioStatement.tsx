import { Fragment, useEffect, useRef } from "react";
import { loadGsap } from "../lib/loadGsap";
import Signature from "./Signature";
import CircleText from "./CircleText";

const MANIFESTO =
  "CONSTRUIM UN SISTEM SOLID ÎN FOTBALUL ROMÂNESC, UNDE TRANSPARENȚA, PERFORMANȚA ADMINISTRATIVĂ ȘI DEZVOLTAREA PE TERMEN LUNG CONVERG ÎN REZULTATE CONCRETE.";

const PILONI = [
  "FOOTBALL INTELLIGENCE",
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

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    loadGsap().then((gsap) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
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
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
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
            <Fragment key={i}>
              <span className="manifesto-word inline-block">{word}</span>{" "}
            </Fragment>
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
              îmbinarea rigurozității administrative cu analiza riguroasă a
              fiecărei decizii sportive, transformăm provocările din fotbalul românesc
              în oportunități reale de progres.
            </p>

            <div className="mt-12 border-t border-black/15 pt-8">
              <Signature
                role="img"
                aria-label="Semnătura fondatorului ZECRO"
                className="w-48 text-[#0F1012] sm:w-56"
              />
            </div>
          </div>

          {/* Middle column - brand mark */}
          <div className="flex flex-col items-center md:col-span-4">
            <div className="relative flex w-56 items-center justify-center sm:w-64 md:w-72 lg:w-80">
              <CircleText
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 text-black/50 [animation:spin_30s_linear_infinite]"
              />
              <div className="flex aspect-square w-full items-center justify-center">
                <img
                  src="/razvan-zetu.webp"
                  alt="Fondatorul ZECRO"
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-square w-[68%] rounded-full object-cover"
                />
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
