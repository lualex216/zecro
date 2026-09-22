import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceIcon from "./ServiceIcon";
import laptopFootballSvg from "../assets/services/laptop-football.svg?raw";
import playerTopSvg from "../assets/services/player-top.svg?raw";
import bannerSvg from "../assets/services/banner.svg?raw";
import clubInsigniaSvg from "../assets/services/club-insignia.svg?raw";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  num: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  bg: string;
};

const CARDS: Card[] = [
  {
    num: "01",
    eyebrow: "CLUB & ACADEMY SOLUTIONS",
    title: "MANAGEMENT SPORTIV & SUPORT OPERAȚIONAL",
    description:
      "Lucrăm alături de cluburi și academii pentru a organiza mai bine activitatea sportivă și administrativă. De la secretariat și relația cu FRF/AJF până la licențiere, clasificare și management externalizat, intervenim punctual sau preluăm zone clare de activitate.",
    icon: laptopFootballSvg,
    tags: [
      "Secretariat și relații FRF / AJF",
      "Management Sportiv & Administrativ",
      "Licențiere, afiliere & clasificare",
    ],
    bg: "#141410",
  },
  {
    num: "02",
    eyebrow: "PLAYER MANAGEMENT & ADVISORY",
    title: "REPREZENTARE ȘI DEZVOLTARE CARIERĂ",
    description:
      "Construim parcursul jucătorului dincolo de următorul transfer. Oferim reprezentare prin agenți licențiați FIFA, sprijin contractual, evaluare sportivă și planificare, astfel încât jucătorul și familia să poată lua decizii informate la fiecare etapă a carierei.",
    icon: playerTopSvg,
    tags: [
      "Reprezentare licențiată FIFA",
      "Contracte, Negocieri & Transferuri",
      "Scouting și analiză",
      "Mentorat și planificare",
    ],
    bg: "#191a13",
  },
  {
    num: "03",
    eyebrow: "MULTI CLUB HERITAGE",
    title: "ECOSISTEM SPORTIV & REVITALIZARE",
    description:
      "Conectăm cluburi, academii și jucători pentru a crea rute reale de progres și proiecte sportive care pot crește în timp. În paralel, lucrăm la protejarea identității, istoriei și legăturii cluburilor cu propriile comunități.",
    icon: bannerSvg,
    tags: [
      "Parteneriate & Proiecte multi-club",
      "Proiecte pentru academii",
      "Implicare comunitate & suporteri",
    ],
    bg: "#1e2017",
  },
  {
    num: "04",
    eyebrow: "BUSINESS, MARKETING & COMMERCIAL",
    title: "DEZVOLTARE COMERCIALĂ & COMUNICARE",
    description:
      "Ajutăm cluburile și proiectele sportive să atragă parteneri, să își organizeze mai bine resursele și să își construiască o prezență coerentă. De la sponsorizări și bugete până la branding, comunicare și evenimente, construim soluții adaptate fiecărui proiect.",
    icon: clubInsigniaSvg,
    tags: [
      "Branding, Social Media & PR",
      "Bugetare & proiecții financiare",
      "Evenimente & activări",
      "Sponsorizări",
    ],
    bg: "#23261a",
  },
];

const MANIFESTO =
  "VIZIUNEA evoluează în STRATEGIE. STRATEGIA DEVINE STRUCTURĂ. STRUCTURA GENEREAZĂ PERFORMANȚĂ.";

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const words = manifestoRef.current?.querySelectorAll(".manifesto-word");
    if (!words) return;
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
      id="capabilities"
      ref={sectionRef}
      className="relative w-full bg-obsidian-2 px-4 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <span className="mb-8 block font-mono text-xs font-bold uppercase tracking-widest text-white/50">
          / SERVICII
        </span>
        <h2
          ref={manifestoRef}
          className="max-w-4xl text-3xl font-bold uppercase leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {MANIFESTO.split(" ").map((word, i) => (
            <span key={i} className="manifesto-word mr-[0.28em] inline-block">
              {word}
            </span>
          ))}
        </h2>
      </div>

      <div className="relative mx-auto mt-24 max-w-[1100px]">
        {CARDS.map((card, i) => (
          <div
            key={card.num}
            className="sticky top-28 mb-6 md:top-32"
            style={{ zIndex: i + 1 }}
          >
            <div
              className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 sm:flex-row sm:items-center sm:gap-8 sm:p-10"
              style={{ backgroundColor: card.bg }}
            >
              <span className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-sans text-[7rem] font-extrabold leading-none text-white/[0.04] sm:text-[9rem]">
                {card.num}
              </span>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-black/20 p-2.5">
                <ServiceIcon svg={card.icon} className="h-full w-full text-accent" />
              </div>

              <div className="relative flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-2">
                    {card.num} / {String(CARDS.length).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
                    {card.eyebrow}
                  </span>
                </div>

                <h3 className="mt-3 line-clamp-2 font-sans text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
                  {card.title}
                </h3>

                <p className="mt-3 max-w-lg text-sm text-white/60 sm:text-base">
                  {card.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
