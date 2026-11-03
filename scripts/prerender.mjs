// Prerandează home + paginile legale în HTML static, după `vite build` și build-ul SSR.
// Rulează din `npm run build`.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const SITE = "https://zec.ro";
const template = await readFile("dist/index.html", "utf8");
const { render, legalPages, blogPages, projectPages, latestPostDate } = await import(
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
  if (page.image) {
    const image = `${SITE}${page.image}`;
    replaceOnce(meta("property", "og:image"), `$1${image}$2`);
    replaceOnce(meta("name", "twitter:image"), `$1${image}$2`);
    const isArticle = page.kind === "article";
    const extra = [];
    if (isArticle) {
      replaceOnce(meta("property", "og:type"), `$1article$2`);
      extra.push(
        `<meta property="article:published_time" content="${page.date}" />`,
        `<meta property="article:author" content="${escapeAttr(page.author)}" />`,
      );
    }
    const ld = isArticle
      ? { "@type": "Article", datePublished: page.date }
      : { "@type": "CreativeWork" };
    extra.push(
      `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        ...ld,
        headline: page.headline,
        name: page.headline,
        description: page.description,
        image,
        inLanguage: "ro",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: page.author, url: `${SITE}/` },
        publisher: { "@id": `${SITE}/#organization` },
      })}</script>`,
    );
    html = html.replace("</head>", `    ${extra.join("\n    ")}\n  </head>`);
  }
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
for (const page of [...blogPages, ...projectPages]) {
  const html = inject(withHead(template, page), render(page.path));
  await mkdir(`dist${page.path.replace(/\/[^/]+$/, "")}`, { recursive: true });
  await writeFile(`dist${page.path}.html`, html);
  console.log(`prerendered ${page.path}`);
}
console.log("prerendered /");

// Sitemap: adaugă articolele publicate și actualizează lastmod-ul paginii principale.
let sitemap = await readFile("dist/sitemap.xml", "utf8");
if (blogPages.length > 0 || projectPages.length > 0) {
  const entries = [...blogPages, ...projectPages]
    .map((p) => `  <url>\n    <loc>${SITE}${p.path}</loc>\n${p.date ? `    <lastmod>${p.date}</lastmod>\n` : ""}  </url>\n`)
    .join("");
  sitemap = sitemap.replace("</urlset>", `${entries}</urlset>`);
  sitemap = sitemap.replace(/(<loc>https:\/\/zec\.ro\/<\/loc>\s*<lastmod>)([^<]*)(<)/, (m, a, old, c) =>
    `${a}${latestPostDate && latestPostDate > old ? latestPostDate : old}${c}`);
  await writeFile("dist/sitemap.xml", sitemap);
}
