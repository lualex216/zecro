import { Fragment, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import CustomCursor from "./CustomCursor";
import BackToTop from "./BackToTop";
import { COMPANY } from "../data/company";
import { LEGAL_DOCUMENTS, type LegalDocument } from "../data/legal";

const LINK_PATTERN = /(https?:\/\/[^\s)]*[^\s).,;]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(LINK_PATTERN).map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        const href = part.includes("@") ? `mailto:${part}` : part;
        return (
          <a
            key={i}
            href={href}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {part}
          </a>
        );
      })}
    </>
  );
}

function setHead(doc: LegalDocument) {
  document.title = doc.metaTitle;

  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute("content", doc.description);

  const canonical = document.querySelector('link[rel="canonical"]');
  canonical?.setAttribute("href", `${COMPANY.website.replace(/\/$/, "")}${doc.path}`);
}

export default function LegalPage({ doc }: { doc: LegalDocument }) {
  useEffect(() => {
    setHead(doc);
    window.scrollTo(0, 0);
  }, [doc]);

  return (
    <div className="min-h-screen w-full bg-obsidian text-white">
      <CustomCursor />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-obsidian/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
          <a href="/" data-cursor="ACASĂ" aria-label="ZECRO — pagina principală" className="text-white">
            <Logo className="w-28 sm:w-32" />
          </a>
          <a
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Înapoi la site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-16 sm:px-8 sm:pt-24">
        <span className="block font-mono text-xs font-bold uppercase tracking-widest text-white/50">
          / DOCUMENT LEGAL
        </span>
        <h1 className="mt-6 font-sans text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-6xl">
          {doc.title}
        </h1>
        <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
          Ultima actualizare: {doc.updated}
        </p>
        <p className="mt-10 text-lg leading-relaxed text-white/80">{doc.intro}</p>

        <div className="mt-16 flex flex-col gap-14">
          {doc.sections.map((section, i) => (
            <section key={section.heading} className="border-t border-white/10 pt-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs font-bold tracking-widest text-accent-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-sans text-xl font-extrabold uppercase tracking-tight sm:text-2xl">
                  {section.heading}
                </h2>
              </div>
              <div className="mt-5 flex flex-col gap-4 sm:pl-10">
                {section.blocks.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="flex flex-col gap-2.5">
                      {block.map((item) => (
                        <li
                          key={item}
                          className="relative pl-5 text-base leading-relaxed text-white/70 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-accent"
                        >
                          <Linkified text={item} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j} className="text-base leading-relaxed text-white/70">
                      <Linkified text={block} />
                    </p>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
            Vezi și
          </span>
          <a
            href={doc.related.href}
            className="mt-3 block font-sans text-xl font-extrabold uppercase tracking-tight transition-colors hover:text-accent sm:text-2xl"
          >
            {doc.related.label} →
          </a>
        </div>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white/30 sm:flex-row sm:items-center sm:justify-between sm:pr-14 lg:pr-10">
          <span>&copy; 2026 {COMPANY.name} Toate drepturile rezervate.</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_DOCUMENTS.map((d) => (
              <a
                key={d.path}
                href={d.path}
                className={`transition-colors hover:text-white ${
                  d.path === doc.path ? "text-white/70" : ""
                }`}
              >
                {d.title}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
