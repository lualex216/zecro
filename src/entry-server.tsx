import { renderToString } from "react-dom/server";
import App from "./App";
import { LEGAL_DOCUMENTS } from "./data/legal";
import { POSTS, postPath } from "./data/posts";

export function render(path: string) {
  return renderToString(<App path={path} />);
}

export const legalPages = LEGAL_DOCUMENTS.map((d) => ({
  path: d.path,
  title: d.metaTitle,
  description: d.description,
}));

export const blogPages = POSTS.map((p) => ({
  path: postPath(p),
  title: `${p.title} — ZECRO`,
  description: p.excerpt,
  image: p.image,
  date: p.date,
  headline: p.title,
  author: p.author,
}));

export const latestPostDate = POSTS[0]?.date ?? null;
