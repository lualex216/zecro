import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const ITEMS = [
  {
    category: "SERVICII",
    question: "Ce servicii oferă ZECRO?",
    answer:
      "Oferim consiliere pentru jucători (player advisory), soluții administrative pentru cluburi, dezvoltare multi-club și parteneriate comerciale — o abordare integrată pentru fiecare etapă a carierei sportive.",
  },
  {
    category: "LICENȚIERE",
    question: "Sunteți agenție licențiată FIFA?",
    answer:
      "Da, colaborăm exclusiv prin agenți licențiați FIFA, respectând toate reglementările naționale și internaționale din fotbal.",
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
      "Suntem o agenție românească, dar construim parteneriate și colaborări la nivel internațional pentru jucători și cluburi.",
  },
  {
    category: "DEZVOLTARE",
    question: "Lucrați și cu jucători tineri, aflați la început de carieră?",
    answer:
      "Da, susținem atât jucători consacrați, cât și tineri talentați, cu un plan de dezvoltare adaptat fiecărei etape.",
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

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-base leading-relaxed text-black/70 sm:text-lg">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
