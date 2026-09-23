import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../data/projects";

function ProjectVisual({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 280, damping: 24 };
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), spring);
  const moveX = useSpring(useTransform(mx, [0, 1], [-12, 12]), spring);
  const moveY = useSpring(useTransform(my, [0, 1], [-12, 12]), spring);
  const glareX = useSpring(useTransform(mx, [0, 1], [0, 100]), spring);
  const glareY = useSpring(useTransform(my, [0, 1], [0, 100]), spring);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="group/visual relative w-full" style={{ perspective: 1400 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => onOpen(project)}
        data-cursor="VEZI PROIECTUL"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-card-1"
      >
        <motion.div style={{ x: moveX, y: moveY, scale: 1.12 }} className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src={project.image}
            alt={project.client}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <motion.div
          className="pointer-events-none absolute -inset-1/2 h-[200%] w-[200%] opacity-0 group-hover/visual:opacity-100"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 48%, transparent 56%)",
            left: useTransform(glareX, (v) => `${v - 50}%`),
            top: useTransform(glareY, (v) => `${v - 50}%`),
            transition: "opacity 0.3s",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function SelectedWork({
  onOpen,
}: {
  onOpen: (p: Project) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      setActiveIndex(closestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="work"
      data-cursor-bg="light"
      className="relative w-full bg-bone px-4 pb-24 text-[#0F1012] sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="sticky top-0 z-20 -mx-4 bg-bone/95 px-4 pt-28 pb-6 backdrop-blur-md sm:-mx-8 sm:px-8 sm:pt-32 lg:-mx-12 lg:px-12">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/50">
              PORTOFOLIU
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/50">
              2024—2026
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <h2 className="font-sans text-5xl font-bold uppercase tracking-tighter sm:text-7xl md:text-8xl">
              Proiecte selectate
            </h2>
            <span className="shrink-0 whitespace-nowrap font-mono text-sm font-bold tracking-widest text-accent-2 sm:text-lg">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-6 h-px w-full bg-black/15" />
        </div>

        <div className="mt-4">
          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className={`flex flex-col gap-8 border-b border-black/10 py-16 md:flex-row md:items-center md:gap-16 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2">
                <ProjectVisual project={p} onOpen={onOpen} />
              </div>

              <div className="md:w-1/2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-2">
                    PROIECT {p.index} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-black/40">
                    CLIENT: {p.client}
                  </span>
                </div>

                <h3 className="mt-4 line-clamp-2 font-sans text-2xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-3xl md:text-4xl">
                  {p.title}
                </h3>

                <p className="mt-4 max-w-md text-base text-black/70 sm:text-lg">
                  {p.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/15 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-black/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-black/10 pt-6">
                  <span className="hidden font-mono text-xs uppercase tracking-widest text-black/40 sm:block">
                    Click pentru studiu de caz
                  </span>
                  <button
                    data-cursor="VEZI PROIECTUL"
                    onClick={() => onOpen(p)}
                    className="inline-flex items-center gap-2 rounded-full bg-obsidian px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
                  >
                    Citește studiul de caz
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
