import { motion } from "framer-motion";
import { FEED, formatPostDate, postPath, type Post } from "../data/posts";

// Aranjare 2×2 cu lățimi alternate (îngust + lat, apoi lat + îngust), al doilea card decalat în jos,
// text peste imagine, carduri care intră în pagină cu animație la scroll (după secțiunea din Studiova).

// Pe xl: 5/12 și 7/12 din rând, alternând.
const SPANS = ["xl:col-span-5", "xl:col-span-7", "xl:col-span-7", "xl:col-span-5"];

function PostCard({
  post,
  index,
  onOpen,
}: {
  post: Post;
  index: number;
  onOpen: (p: Post) => void;
}) {
  const body = (
    <>
      <img
        src={post.image}
        alt={post.imageAlt}
        width={1200}
        height={630}
        loading="lazy"
        style={{ objectPosition: post.focus }}
        className={`absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 ${
          post.published ? "group-hover:scale-105" : "opacity-60"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div>
          <span
            className={`block font-sans text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl ${
              post.published ? "text-white" : "text-white/70"
            }`}
          >
            {post.published ? "Citește" : "În curând"} <span className="text-accent">/</span>
          </span>
          <h3 className="mt-5 max-w-[28ch] font-sans text-xl font-medium leading-snug text-white/90 sm:text-2xl">
            {post.title}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-white/60 sm:text-[11px]">
          <span>
            {String(index + 1).padStart(2, "0")} / {post.tag}
          </span>
          <time dateTime={post.date} className="shrink-0 text-right text-white">
            {post.published ? "" : "Din "}
            {formatPostDate(post.date)}
          </time>
        </div>
      </div>
    </>
  );

  const frame =
    "group relative block h-[440px] w-full overflow-hidden rounded-3xl bg-card-1 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:h-[500px]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`${SPANS[index]} ${index === 1 ? "xl:mt-12" : ""}`}
    >
      {post.published ? (
        <a
          href={postPath(post)}
          data-cursor="CITEȘTE"
          onClick={(e) => {
            // Click simplu → modal; cu Ctrl/Cmd/Shift sau click-mijloc rămâne linkul normal.
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            onOpen(post);
          }}
          className={frame}
        >
          {body}
        </a>
      ) : (
        <div className={`${frame} cursor-default`}>{body}</div>
      )}
    </motion.article>
  );
}

export default function Blog({ onOpen }: { onOpen: (p: Post) => void }) {
  if (FEED.length === 0) return null;
  const shown = FEED.slice(0, 4);

  return (
    <section
      id="blog"
      className="relative w-full scroll-mt-24 bg-obsidian px-4 py-24 text-white sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <span className="block font-mono text-xs font-bold uppercase tracking-widest text-white/50">
          / BLOG
        </span>
        <h2 className="mt-6 max-w-3xl font-sans text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-6xl">
          Idei din biroul ZECRO
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-12">
          {shown.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}
