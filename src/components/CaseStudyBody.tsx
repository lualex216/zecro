import { Check } from "lucide-react";
import type { Project } from "../data/projects";

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

function ContextSection({ context }: { context: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
        Context și provocare
      </span>
      <p className="text-base leading-relaxed text-white/70 sm:text-lg">{context}</p>
    </div>
  );
}

function PillarSection({
  eyebrow,
  pillar,
}: {
  eyebrow: string;
  pillar: Project["administrativePillar"];
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-2">
        {eyebrow}
      </span>
      <h3 className="font-sans text-lg font-extrabold uppercase tracking-tight text-white sm:text-xl">
        {pillar.heading}
      </h3>
      <p className="text-sm leading-relaxed text-white/70">{pillar.description}</p>
      <ul className="mt-2 flex flex-col gap-2">
        {pillar.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
            <Check size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.5} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GallerySection({ items }: { items: Project["gallery"] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
        Galerie foto
      </span>
      {items.length > 0 ? (
        <div className="flex flex-col gap-4">
          {items.map((item, i) =>
            item.type === "wide" ? (
              <div key={i} className="aspect-video overflow-hidden rounded-xl bg-black">
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div key={i} className="grid grid-cols-3 gap-4">
                {item.images.map((image, j) => (
                  <div key={j} className="aspect-square overflow-hidden rounded-xl bg-black">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/15 py-12">
          <span className="font-mono text-xs uppercase tracking-widest text-white/30">
            Imagini în curând
          </span>
        </div>
      )}
    </div>
  );
}

function ResultsSection({ results }: { results: Project["results"] }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 sm:p-6">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent-2">
        Rezultate & impact
      </span>
      <p className="text-sm leading-relaxed text-white/70 sm:text-base">{results.description}</p>
      <ul className="mt-2 flex flex-col gap-2">
        {results.highlights.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
            <Check size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.5} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InfoRows({ project, layout }: { project: Project; layout: "grid" | "list" }) {
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


// Tot ce urmează după titlu și descriere într-un studiu de caz (folosit de modal și de pagina proprie).
export function CaseStudyDetails({
  project,
  layout,
}: {
  project: Project;
  layout: "grid" | "list";
}) {
  return (
    <>
      <Tags tags={project.tags} />
      <InfoRows project={project} layout={layout} />
      <ContextSection context={project.context} />
      <PillarSection eyebrow="Pilonul Administrativ" pillar={project.administrativePillar} />
      <PillarSection eyebrow="Pilonul de Branding" pillar={project.brandingPillar} />
      <GallerySection items={project.gallery} />
      <ResultsSection results={project.results} />
    </>
  );
}
