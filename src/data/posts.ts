import schedule from "./posts/schedule.json";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type PostMeta = {
  slug: string;
  title: string;
  subtitle: string;
  /** Rezumat pentru meta description și JSON-LD. */
  excerpt: string;
  tag: string;
  /** 1200×630, folosită și ca imagine la share (og:image). */
  image: string;
  imageAlt: string;
  author: string;
  /** object-position pentru decupajele portret din card. */
  focus: string;
};

export type Post = PostMeta & {
  /** Data publicării (YYYY-MM-DD), calculată din schedule.json. */
  date: string;
  /** Goale cât timp articolul nu e publicat (conținutul e scos din bundle la build). */
  blocks: PostBlock[];
  published: boolean;
};

// Calendarul: primul articol la firstPostDate, următoarele la câte intervalDays zile.
// Fiecare articol e într-un fișier din ./posts; `order` îi dă locul în calendar.
function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// În dev se văd toate articolele; în producție doar cele cu data <= data build-ului.
const TODAY = import.meta.env.DEV ? "9999-12-31" : __BUILD_DATE__;

const modules = import.meta.glob<{ order: number; meta: PostMeta; blocks: PostBlock[] }>(
  "./posts/*.ts",
  { eager: true },
);

const ALL: Post[] = Object.values(modules)
  .map((m) => {
    const date = addDays(schedule.firstPostDate, m.order * schedule.intervalDays);
    return { ...m.meta, date, blocks: m.blocks, published: date <= TODAY };
  })
  .sort((a, b) => (a.date < b.date ? -1 : 1));

/** Articolele publicate, cele mai noi primele. */
export const POSTS: Post[] = ALL.filter((p) => p.published).reverse();

/** Articole programate: apar în secțiunea de blog doar ca previzualizare, fără pagină. */
export const UPCOMING: Post[] = ALL.filter((p) => !p.published);

/** Ordinea din secțiunea de blog: cea din calendar (1, 2, 3, 4), indiferent care sunt deja publicate. */
export const FEED: Post[] = ALL;

export const POST_PATH_PREFIX = "/blog/";

export const postPath = (post: Post) => `${POST_PATH_PREFIX}${post.slug}`;

export const findPost = (path: string) =>
  POSTS.find((p) => postPath(p) === path.replace(/\/+$/, "")) ?? null;

const MONTHS = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

export function formatPostDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function readingMinutes(post: Post) {
  const words = post.blocks
    .map((b) => (b.type === "ul" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
