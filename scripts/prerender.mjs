// Prerandează home + paginile legale în HTML static, după `vite build` și build-ul SSR.
// Rulează din `npm run build`.
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const SITE = "https://zec.ro";
const template = await readFile("dist/index.html", "utf8");
const { render, legalPages } = await import(
  pathToFileURL(resolve("dist-ssr/entry-server.js")).href
);

const escapeAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function withHead(html, page) {
  const url = `${SITE}${page.path}`;
  const title = escapeAttr(page.title);
  const description = escapeAttr(page.description);
  const replaceOnce = (re, value) => {
    if (!re.test(html)) throw new Error(`Tag lipsă în index.html: ${re}`);
    html = html.replace(re, value);
  };
  replaceOnce(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
  const meta = (attr, name) =>
    new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`);
  replaceOnce(meta("name", "description"), `$1${description}$2`);
  replaceOnce(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  replaceOnce(meta("property", "og:url"), `$1${url}$2`);
  replaceOnce(meta("property", "og:title"), `$1${title}$2`);
  replaceOnce(meta("property", "og:description"), `$1${description}$2`);
  replaceOnce(meta("name", "twitter:title"), `$1${title}$2`);
  replaceOnce(meta("name", "twitter:description"), `$1${description}$2`);
  return html;
}

function inject(html, markup) {
  if (!html.includes('<div id="root"></div>')) throw new Error("Lipsește #root în index.html");
  return html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
}

await writeFile("dist/index.html", inject(template, render("/")));

for (const page of legalPages) {
  const html = inject(withHead(template, page), render(page.path));
  await writeFile(`dist${page.path}.html`, html);
  console.log(`prerendered ${page.path}`);
}
console.log("prerendered /");
