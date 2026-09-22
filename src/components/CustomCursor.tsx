import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (target) {
        const text = target.getAttribute("data-cursor");
        setLabel(text || null);
        setIsPointer(true);
      } else {
        setLabel(null);
        setIsPointer(false);
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-accent"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-white/70"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? (label ? 96 : 56) : 32,
          height: isPointer ? (label ? 96 : 56) : 32,
          backgroundColor: isPointer ? "rgba(202,240,119,0.95)" : "rgba(0,0,0,0)",
          borderColor: isPointer ? "rgba(202,240,119,0.95)" : "rgba(255,255,255,0.6)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {label && (
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink text-center px-1 leading-tight">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
