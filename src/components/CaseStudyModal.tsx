import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { Project } from "../data/projects";
import { useMediaQuery } from "../hooks/useMediaQuery";

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white/70"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function PhasesList({ phases }: { phases: Project["phases"] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
        Etapele colaborării
      </span>

      <div className="flex flex-col gap-4">
        {phases.map((phase, i) => (
          <div
            key={phase.title}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-2">
              Faza {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-sans text-lg font-extrabold uppercase tracking-tight text-white sm:text-xl">
              {phase.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/70">
              {phase.description}
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {phase.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                  <Check size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoRows({ project, layout }: { project: Project; layout: "grid" | "list" }) {
  const rows: [string, string][] = [
    ["CLIENT", project.client],
    ["IMPLICARE ZECRO", project.involvement],
    ["STATUS", "ACTIV"],
  ];

  if (layout === "grid") {
    return (
      <div className="grid grid-cols-3 gap-8 border-y border-white/10 py-6">
        {rows.map(([label, value]) => (
          <div key={label}>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
              {label}
            </span>
            <span className="mt-1 block font-sans text-sm font-bold uppercase text-white">
              {value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-4 py-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
            {label}
          </span>
          <span className="text-right font-sans text-xs font-bold uppercase text-white">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

function DesktopDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-obsidian-2"
        style={{ maxHeight: "min(90vh, 900px)" }}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-obsidian-2/90 px-6 py-4 backdrop-blur-md">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
              {project.index} / STUDIU DE CAZ
            </span>
            <button
              onClick={onClose}
              aria-label="Închide"
              data-cursor="ÎNCHIDE"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <img className="h-full w-full object-cover" src={project.image} alt={project.client} />
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-10">
            <h2 className="font-sans text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl">
              {project.title}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              {project.description}
            </p>
            <Tags tags={project.tags} />
            <InfoRows project={project} layout="grid" />
            <PhasesList phases={project.phases} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MobileDrawer({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 32 }}
      className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-white/10 bg-obsidian-2/95 px-6 py-8 backdrop-blur-2xl sm:px-10 sm:py-12"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
          {project.index} / STUDIU DE CAZ
        </span>
        <button
          onClick={onClose}
          aria-label="Închide"
          data-cursor="ÎNCHIDE"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
        >
          <X size={16} />
        </button>
      </div>

      <div className="-mx-6 mt-8 aspect-video shrink-0 overflow-hidden bg-black sm:-mx-10">
        <img className="h-full w-full object-cover" src={project.image} alt={project.client} />
      </div>

      <div className="mt-8 flex flex-1 flex-col gap-8">
        <h2 className="font-sans text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl">
          {project.title}
        </h2>
        <p className="text-base leading-relaxed text-white/70">{project.description}</p>
        <Tags tags={project.tags} />
        <InfoRows project={project} layout="list" />
        <PhasesList phases={project.phases} />
      </div>
    </motion.div>
  );
}

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />
          {isDesktop ? (
            <DesktopDialog project={project} onClose={onClose} />
          ) : (
            <MobileDrawer project={project} onClose={onClose} />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
