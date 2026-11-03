import { renderToString } from "react-dom/server";
import App from "./App";
import { LEGAL_DOCUMENTS } from "./data/legal";
import { POSTS, postDocumentTitle, postPath } from "./data/posts";
import { projects, projectPath } from "./data/projects";

export function render(path: string) {
  return renderToString(<App path={path} />);
}

export const legalPages = LEGAL_DOCUMENTS.map((d) => ({
  path: d.path,
  title: d.metaTitle,
  description: d.description,
}));

export const blogPages = POSTS.map((p) => ({
  kind: "article" as const,
  path: postPath(p),
  title: postDocumentTitle(p),
  description: p.excerpt,
  image: p.image,
  date: p.date,
  headline: p.title,
  author: p.author,
}));

export const latestPostDate = POSTS[0]?.date ?? null;

export const projectPages = projects.map((p) => ({
  kind: "project" as const,
  path: projectPath(p),
  title: `${p.client} — studiu de caz ZECRO`,
  description: p.excerpt,
  image: `/projects/${p.id}-og.jpg`,
  headline: `${p.client} — studiu de caz`,
  author: "ZECRO",
}));
