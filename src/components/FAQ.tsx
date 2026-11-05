import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const ITEMS = [
  {
    category: "SERVICII",
    question: "Ce servicii oferă ZECRO?",
    answer:
      "Oferim soluții administrative pentru cluburi, dezvoltare multi-club, parteneriate comerciale și servicii punctuale — de la taskuri individuale la proiecte one-off —, precum și scouting și analiză tactică (Football Intelligence).",
  },
  {
    category: "SCOUTING",
    question: "Ce primește un club prin scouting și analiză tactică?",
    answer:
      "În funcție de nevoie: liste de jucători filtrate după post, vârstă și buget, rapoarte de evaluare, shadow teams pentru perioadele de transfer, analize video ale adversarilor și evaluări post-meci pentru propria echipă. Nu intermediem transferuri; decizia și negocierea rămân la club.",
  },
  {
    category: "COLABORARE",
    question: "Cum decurge o colaborare cu ZECRO?",
    answer:
      "Începem cu o discuție despre obiectivele tale sau ale clubului, urmată de o propunere personalizată și un plan de acțiune clar, cu rapoarte periodice de progres.",
  },
  {
    category: "ACOPERIRE",
    question: "Lucrați doar în România sau și internațional?",
    answer:
      "Suntem o agenție românească, dar construim parteneriate și colaborări la nivel internațional pentru cluburi și academii.",
  },
  {
    category: "DEZVOLTARE",
    question: "Lucrați și cu cluburi aflate la început de drum?",
    answer:
      "Da. Lucrăm cu cluburi și academii din ligile inferioare, inclusiv Liga 3 și Liga 4, dar și cu cluburi profesioniste. Fiecare plan este adaptat nivelului, obiectivelor și etapei de dezvoltare a clubului.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      data-cursor-bg="light"
      className="relative w-full bg-bone px-4 py-24 text-[#0F1012] sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1000px]">
        <span className="mb-8 block font-mono text-xs font-bold uppercase tracking-widest text-black/50">
          / FAQ
        </span>
        <h2 className="font-sans text-4xl font-bold uppercase tracking-tighter sm:text-6xl md:text-7xl">
          Întrebări frecvente
        </h2>

        <div className="mt-16 border-t border-black/15">
          {ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question} className="border-b border-black/15">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  data-cursor="EXTINDE"
                >
                  <div>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-accent-2">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-sans text-xl font-extrabold uppercase tracking-tight sm:text-2xl">
                      {item.question}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                {/* Răspunsurile rămân mereu în DOM (deci și în HTML-ul prerandat, pentru SEO);
                    cele închise sunt doar restrânse vizual și ascunse pentru cititoarele de ecran. */}
                <motion.div
                  initial={false}
                  animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  className="overflow-hidden"
                  aria-hidden={!open}
                >
                  <p className="max-w-2xl pb-6 text-base leading-relaxed text-black/70 sm:text-lg">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
