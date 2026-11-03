import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../data/projects";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { CaseStudyDetails } from "./CaseStudyBody";

function DesktopDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
    >
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
              {project.index} / {project.client}
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
            <img className="h-full w-full object-cover" src={project.image} alt={`${project.client} — imagine principală studiu de caz`} width={1600} height={1066} loading="lazy" />
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-10">
            <h2 className="font-sans text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl">
              {project.title}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              {project.description}
            </p>
            <CaseStudyDetails project={project} layout="grid" />
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
      className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-obsidian-2/95 backdrop-blur-2xl"
    >
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-obsidian-2/90 px-6 py-4 backdrop-blur-md">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
            {project.index} / {project.client}
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

        <div className="aspect-video w-full overflow-hidden bg-black">
          <img className="h-full w-full object-cover" src={project.image} alt={`${project.client} — imagine principală studiu de caz`} width={1600} height={1066} loading="lazy" />
        </div>

        <div className="flex flex-col gap-8 px-6 py-8 sm:px-10 sm:py-12">
          <h2 className="font-sans text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl">
            {project.title}
          </h2>
          <p className="text-base leading-relaxed text-white/70">{project.description}</p>
          <CaseStudyDetails project={project} layout="list" />
        </div>
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

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

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
