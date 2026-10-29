import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import CustomCursor from "./CustomCursor";
import ArticleBody from "./ArticleBody";
import { POSTS, formatPostDate, postPath, readingMinutes, type Post } from "../data/posts";
import { COMPANY } from "../data/company";

// Pagina de sine stătătoare a unui articol (/blog/<slug>): linkul care se partajează.
export default function ArticlePage({ post }: { post: Post }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-obsidian text-white">
      <CustomCursor />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-obsidian/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
          <a href="/" data-cursor="ACASĂ" aria-label="ZECRO — pagina principală" className="text-white">
            <Logo className="w-28 sm:w-32" />
          </a>
          <a
            href="/#blog"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Toate articolele
          </a>
        </div>
      </header>

      <main>
        <article className="mx-auto max-w-3xl px-4 pb-20 pt-12 sm:px-8 sm:pt-20">
          <span className="block font-mono text-xs font-bold uppercase tracking-widest text-white/50">
            / BLOG · {post.tag}
          </span>
          <h1 className="mt-6 font-sans text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-xl leading-snug text-white/60">{post.subtitle}</p>
          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{readingMinutes(post)} min citire</span>
          </div>

          <div className="mt-10 aspect-[1200/630] w-full overflow-hidden rounded-2xl bg-card-1">
            <img src={post.image} alt={post.imageAlt} width={1200} height={630} className="h-full w-full object-cover" />
          </div>

          <div className="mt-12">
            <ArticleBody post={post} />
          </div>

          <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h2 className="font-sans text-2xl font-extrabold leading-tight tracking-tight">
              Ai un proiect în minte?
            </h2>
            <p className="text-white/60">Scrie-ne la {COMPANY.email} sau completează formularul de pe site.</p>
            <a
              href="/#contact"
              data-cursor="CONTACT"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-transform hover:scale-105"
            >
              Începe un proiect <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </article>

        {others.length > 0 && (
          <section className="border-t border-white/10 px-4 py-16 sm:px-8">
            <div className="mx-auto max-w-3xl">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
                / CITEȘTE ȘI
              </span>
              <ul className="mt-6 flex flex-col divide-y divide-white/10 border-y border-white/10">
                {others.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={postPath(p)}
                      className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                    >
                      <span className="font-sans text-lg font-bold leading-snug">{p.title}</span>
                      <ArrowUpRight size={16} className="shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
