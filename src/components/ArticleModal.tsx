import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ArticleBody from "./ArticleBody";
import { formatPostDate, readingMinutes, type Post } from "../data/posts";
import { useMediaQuery } from "../hooks/useMediaQuery";

function Content({ post, onClose }: { post: Post; onClose: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-obsidian-2/90 px-6 py-4 backdrop-blur-md">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
          / BLOG · {post.tag}
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

      <div className="aspect-[1200/630] w-full overflow-hidden bg-black">
        <img src={post.image} alt={post.imageAlt} width={1200} height={630} className="h-full w-full object-cover" />
      </div>

      <article className="flex flex-col gap-8 px-6 py-8 sm:px-10 sm:py-12">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{readingMinutes(post)} min citire</span>
          </div>
          <h2 className="font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {post.title}
          </h2>
          <p className="text-lg leading-snug text-white/60">{post.subtitle}</p>
        </header>
        <ArticleBody post={post} />
      </article>
    </div>
  );
}

export default function ArticleModal({
  post,
  onClose,
}: {
  post: Post | null;
  onClose: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />
          {isDesktop ? (
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
                role="dialog"
                aria-modal="true"
                aria-label={post.title}
                className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-obsidian-2"
                style={{ maxHeight: "min(90vh, 900px)" }}
              >
                <Content post={post} onClose={onClose} />
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              role="dialog"
              aria-modal="true"
              aria-label={post.title}
              className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-obsidian-2/95 backdrop-blur-2xl"
            >
              <Content post={post} onClose={onClose} />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
