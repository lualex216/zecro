import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../data/projects";

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-4 z-[80] mx-auto flex max-w-5xl flex-col overflow-y-auto rounded-2xl border border-white/10 bg-obsidian-2 sm:inset-8 md:inset-x-auto md:inset-y-10 md:w-full"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-obsidian-2/90 px-6 py-4 backdrop-blur-md">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
                {project.index} / STUDIU DE CAZ
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                data-cursor="ÎNCHIDE"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                className="h-full w-full object-cover"
                src={project.image}
                alt={project.client}
              />
            </div>

            <div className="flex flex-col gap-10 p-6 sm:p-10">
              <h2 className="font-sans text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl">
                {project.title}
              </h2>

              <p className="max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
                {[
                  ["CLIENT", project.client],
                  ["STATUS", "ACTIV"],
                ].map(([label, value]) => (
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
