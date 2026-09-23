import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PHRASES = [
  "CONSTRUIM FOTBALUL ROMÂNESC.",
  "FORMĂM CAMPIONII DE MÂINE.",
  "APĂRĂM VIITORUL JUCĂTORILOR.",
];

function useTypingEffect(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let delay = deleting ? 40 : 65;

    if (!deleting && text === current) {
      delay = 1600;
    } else if (deleting && text === "") {
      delay = 300;
    }

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        return;
      }
      setText((t) =>
        deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases]);

  return text;
}

export default function ParallaxCallout({ onOpenModal }: { onOpenModal: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  const typed = useTypingEffect(PHRASES);

  return (
    <section
      ref={ref}
      className="relative flex h-[80vh] min-h-[540px] w-full items-center justify-center overflow-hidden bg-black"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <img
          src="/parallax.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center gap-10 px-4 text-center">
        <h2
          className="flex h-[3.15em] max-w-5xl items-end justify-center font-sans font-bold uppercase leading-[0.95] tracking-tighter text-white"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5.5rem)" }}
        >
          <span>
            {typed}
            <span className="animate-blink text-accent">|</span>
          </span>
        </h2>

        <button
          data-cursor="START"
          onClick={onOpenModal}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
        >
          ÎNCEPE UN PROIECT <ArrowUpRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}
