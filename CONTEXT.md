# ZECRO — Context Proiect

Site web pentru **ZECRO S.R.L.**, agenție de management sportiv din România (fotbal). Construit de la zero pornind de la un spec generic de creative studio, apoi rebrandat complet și populat cu conținut real. Ultima actualizare a acestui document: 15 octombrie 2026.

## Stack tehnic

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`, fără `tailwind.config.js` — totul e configurat în `src/index.css` via `@theme`)
- **Framer Motion** — animații, scroll parallax, drawer-uri/dialog-uri
- **GSAP + ScrollTrigger** — reveal-uri de tip "word-by-word" pe manifeste
- **lucide-react** — singura librărie de iconițe UI (nu și iconițele de servicii, care sunt SVG-uri custom din Figma)

Comenzi: `npm run dev` (preview local), `npm run build` (`tsc -b && vite build && vite build --ssr ... && node scripts/prerender.mjs`), `npm run lint` (oxlint).

**Prerender (SEO)**: după build-ul client, `src/entry-server.tsx` (`renderToString(<App path>)`) generează HTML static pentru `/` (în `dist/index.html`) și cele 2 pagini legale (`dist/<cale>.html`, cu title/description/canonical/OG proprii), iar `src/main.tsx` hidratează (`hydrateRoot` dacă `#root` are conținut). `vercel.json` are `cleanUrls: true` (servește `/termeni-si-conditii.html` la `/termeni-si-conditii`) în loc de rewrites. `useMediaQuery` folosește `useSyncExternalStore` cu snapshot de server `false`, ca să nu apară erori de hidratare. Orice componentă nouă trebuie să fie sigură la SSR (fără `window`/`document` la randare, doar în efecte). Verificat doar local (vite preview); **de verificat pe Vercel** că Build Command rulează `npm run build` și că adresele legale răspund fără 404.

Fără router: rutarea e făcută direct pe `window.location.pathname` în `App.tsx` (vezi „Pagini legale"). Fără teste automate — verificarea se face manual: `tsc`, `build`, iar vizual în browser (inclusiv headless cu Chrome + puppeteer-core, instalat în afara repo-ului).

## Identitate vizuală

Definită în `src/index.css` (`@theme`):

| Token | Valoare | Utilizare |
|---|---|---|
| `--color-accent` | `#CAF077` | verde neon, accent principal (CTA-uri, iconițe, highlight-uri, punctul cursorului pe fundal întunecat) |
| `--color-accent-2` | `#8DA853` | verde olive, folosit pe fundaluri deschise |
| `--color-ink` | `#0E0E0D` | text închis pe fundaluri accent |
| `--color-obsidian` / `-2` / `-3` / `-4` | variații de negru | fundaluri secțiuni întunecate |
| `--color-bone` | `#FAFDF1` | fundal deschis (secțiuni „Despre noi", „Portofoliu", „FAQ") |
| `--color-card-1..4` | nuanțe verzi-negru | fundaluri carduri proiecte |

**Fonturi**: Geist (sans, titluri + paragrafe) + Roboto Slab (`font-mono` — pentru etichetele mici/eyebrow-uri, în ciuda numelui clasei).

**Logo**: `src/assets/logo.svg` (wordmark) și `src/assets/mark.svg` (iconul), ambele cu `fill="currentColor"`. Randate prin `Logo.tsx` / `Mark.tsx` (`dangerouslySetInnerHTML` + import `?raw`; SVG-uri statice, fără input de la utilizator). Iconul din wordmark e mereu accent (regula CSS `.zecro-logo svg > g:last-of-type`).

**Text în cerc**: `src/assets/circle-text.svg` („AGENȚIE DE MANAGEMENT SPORTIV · ZEC.RO"), randat prin `CircleText.tsx`, rotație lentă (30s) în jurul mark-ului din StudioStatement. Mark-ul și textul sunt gri `black/50`, aceeași nuanță ca textele din „PILONI", pe fundal transparent. SVG-urile exportate din Illustrator trebuie normalizate (fără prolog XML/comentariu, `fill="currentColor"` pe rădăcină) — altfel se randează negre.

**Cursor custom** (`CustomCursor.tsx`): punct + cerc alb, cu etichete contextuale în română (`data-cursor="..."`). Punctul e verde lime pe fundal întunecat și olive pe fundal deschis (detectat prin `data-cursor-bg="light"` pe StudioStatement, SelectedWork, FAQ). Cercul rămâne mereu alb (decizie explicită). Spring supra-amortizat pe mărirea cercului (`damping: 36`) ca să nu se vadă flash de reflow pe etichetele de 2 rânduri.

## Structura paginii (`src/App.tsx` → `HomePage`)

1. **Navbar** — logo + linkuri (`Despre noi`, `Portofoliu`, `Servicii`, `FAQ`, `Contact`) + CTA `Începe un proiect`. Capsulă plutitoare la scroll. **Scroll-spy**: linkul secțiunii curente primește pill-ul activ (nimic activ cât ești în Hero). Meniul desktop apare doar la `min-width: 960px` **și** landscape (iPad Pro portrait și iPad mini landscape au amândouă 1024px, lățimea singură nu le deosebește); altfel hamburger. Meniul mobil folosește `100dvh` + blochează scroll-ul pe `body` cât e deschis (bug cu bara browserului care apare/dispare).
2. **HeroSection** — video de fundal în buclă (`public/hero.mp4`, 2560×1440, ~1.7MB, mut, `playsInline`), poster = **primul cadru al videoclipului** (`public/hero.jpg`, extras cu ffmpeg, ca să nu existe salt vizual la încărcare), zoom lent peste video, tagline „Alături de fotbalul românesc spre un viitor mai bun.", „VEZI PORTOFOLIUL", headline „MANAGEMENT SPORTIV" auto-fit pe un rând (măsurare JS în `useLayoutEffect`; `<h1>` e `inline-block` într-un wrapper, altfel `scrollWidth` minte).
3. **StudioStatement** (`id="studio"`) — manifest (reveal GSAP), filozofie + semnătura fondatorului (`Signature.tsx`, `src/assets/signature.svg`, `currentColor`), poza fondatorului (`public/razvan-zetu.webp`, 800×800, decupată în cerc la 68% din inel) cu text rotativ în jurul ei, lista **Piloni**.
4. **SelectedWork** (`id="work"`) — 3 proiecte reale, layout alternant, header sticky cu contor „0X/03" calculat din poziția de scroll. Imaginea (tilt 3D la hover) deschide același modal ca butonul „Citește studiul de caz". Hint-ul „Click pentru studiu de caz" apare doar pe landscape ≥960px.
5. **Capabilities** (`id="capabilities"`) — 4 carduri de servicii, sticky-stack la scroll, iconițe SVG din Figma.
6. **FAQ** (`id="faq"`) — accordion cu 5 întrebări (răspunsurile 1 și 5 revizuite: servicii punctuale / „one-off", cluburi la început de drum, inclusiv Liga 3).
7. **ParallaxCallout** — banner cu efect typing peste `public/parallax.jpg`. Imaginea e decorativă (`alt=""` intenționat).
8. **Footer** (`id="contact"`) — formular de contact inline, linkuri, **Facebook + LinkedIn** (linkuri reale, tab nou), `office@zec.ro`, rând final cu © „ZECRO S.R.L." și linkurile legale. Rândul are padding dreapta ca să nu intre sub butonul „Înapoi sus".
9. **ProjectModal** — drawer lateral pentru „Începe un proiect". Buget în € cu **„< 10K€" preselectat** (intervale: <10K / 10–50K / 50–100K / 100K+), tip proiect cu **„One Task Only" prima opțiune și implicită** (+ cei 4 piloni). Se închide cu Esc și click în afară.
10. **CaseStudyModal** — dialog centrat pe desktop, drawer lateral pe mobil (prag 768px prin `matchMedia`), header **sticky pe ambele variante**, cu „0X / NUME CLIENT". Se închide cu Esc și click în afară (pe desktop, wrapper-ul full-screen înghițea click-urile — rezolvat cu `onClick` pe el). **Fiecare studiu de caz are și pagină proprie** `/studii-de-caz/<id>` (`CaseStudyPage.tsx`, prerandată cu head propriu: title „<client> — studiu de caz ZECRO", `excerpt` din `projects.ts` ca description, `og:image` = `public/projects/<id>-og.jpg` 1200×630 decupat din cover, JSON-LD `CreativeWork`, intrare în sitemap). Cardul din portofoliu și butonul „Citește studiul de caz" sunt `<a href>` reale: click simplu → modal + `pushState` la adresa proprie (Esc / Back închid, titlul paginii se schimbă; același mecanism ca la blog, în `App.tsx`: `openProject` / `openPost` / `closeModal`), Ctrl/Cmd-click sau crawler → pagina proprie. Secțiunile comune modalului și paginii sunt în `CaseStudyBody.tsx` (`CaseStudyDetails`).
11. **BackToTop** — buton rotund dreapta-jos, apare după 600px de scroll, scroll lin sus, eticheta cursorului „SUS".

## Pagini legale

- `/politica-de-confidentialitate` și `/termeni-si-conditii`, randate de `LegalPage.tsx` (header cu logo, secțiuni numerotate, linkuri automate pe e-mail/URL-uri, titlu/descriere/canonical setate din JS).
- Conținutul e în `src/data/legal.ts`, datele firmei într-un singur loc, `src/data/company.ts` (denumire, CUI, TVA, nr. Registrul Comerțului, sediu, e-mail, telefon, ANPC, ANSPDCP + `SOCIAL`).
- Rutare: `window.location.pathname` în `App.tsx`; linkurile din footer sunt `<a href>` obișnuite (încărcare completă). În `vercel.json` există `rewrites` explicite pentru cele două căi → `/index.html`. **De verificat după deploy** că adresele directe nu dau 404 (testat doar în dev).
- **Numele reprezentantului legal a fost omis intenționat** (decizie: fără numele fondatorilor pe site). Textele sunt redactate pe structura standard GDPR și pe ce face efectiv site-ul (fără cookie-uri, fără analytics, fonturi găzduite local în `public/fonts`) — **necesită revizuire juridică**.

## Conținut real

Sursă design: `https://www.figma.com/design/8lwdXsgGoE7gAfCchl03vv/ZECRO`.

- **3 proiecte** în `src/data/projects.ts`: **A.S.P.I.** (Steaua Magică → A.S.P.I., club nou construit pe spiritul și tradiția Politehnicii Iași, Liga 4), **ACSM Cetatea 1932 Suceava** (revitalizare brand istoric, management strategic continuu, promovare în Liga 2), **Gloria Ultra** (management executiv complet; colaborarea s-a încheiat când finanțatorii au reorientat clubul către mini-fotbal — menționat o singură dată, accentul e pe ce s-a construit).
- **4 servicii** în `Capabilities.tsx`. Iconițe în `src/assets/services/`.
- Titlurile lungi sunt trunchiate la 2 rânduri (`line-clamp-2`).

### Structura unui studiu de caz (`Project` în `projects.ts`)

Hero (imagine, titlu, descriere, taguri, client / implicare / status) → **Context și provocare** (`context`) → **Pilonul Administrativ** (`administrativePillar`) → **Pilonul de Branding** (`brandingPillar`) → **Galerie foto** (`gallery`) → **Rezultate & impact** (`results`, calitativ, fără cifre inventate). Câmpul vechi `phases` nu mai există.

- Fiecare pilon: `heading`, `description`, `items[]`.
- **Galeria hibridă**: `GalleryItem` = `{ type: "wide", image }` (16:9, lățime completă) sau `{ type: "squares", images: [3] }` (rând de 3 pătrate), fiecare imagine cu `src` + **`alt` descriptiv**. Număr variabil per proiect (A.S.P.I. 3 wide + 2 rânduri, Cetatea 4 + 1, Gloria Ultra 4 + 2). Gap 16px, `loading="lazy"`.
- **Imagini galerie**: `public/projects/<id>/<nume-seo>.jpg` (ex. `esarfa-aspi.jpg`), 26 de fișiere, **wide 1600×900, pătrat 800×800**, JPG ~80–85%. Cover-uri: `public/projects/<id>.jpg` (JPG ~80%, 1600 px lățime; PNG-urile de 2,5 MB au fost înlocuite).
- **Neincluse intenționat**: parteneriate de echipament cu nume de branduri (Adidas, JAKO, Joma — apar doar în documente Gemini, neconfirmate) și rezultate cu cifre.

## SEO și securitate

- `index.html`: title „ZECRO — Agenție de management sportiv în fotbalul românesc", meta description (~160 caractere), canonical (`https://zec.ro/`), Open Graph + Twitter Card, theme-color, JSON-LD `ProfessionalService` (nume, `legalName`, e-mail, telefon, `vatID`, `contactPoint`, adresă doar la nivel de localitate — **fără stradă**, sediul fiind la bloc/apartament; `sameAs` Facebook/LinkedIn). `og-image.jpg` 2400×1260 în `public/`. **Favicon-uri**: `favicon.svg` (sursa) + `favicon.ico` (16/32/48), `icon-192.png`, `icon-512.png` (logo din JSON-LD), `apple-touch-icon.png` 180, toate cu marca pe `#0E0E0D` și margini libere (decupaj în cerc la Google); `site.webmanifest` în `public/`. Titlurile cu efect (manifest, „Viziunea evoluează…", typing din ParallaxCallout) au textul complet în HTML-ul prerandat: cuvintele sunt separate prin spații reale, iar typing-ul e `aria-hidden` peste un `sr-only` cu toate frazele.
- `public/robots.txt`, `public/sitemap.xml` (home + cele 2 pagini legale, cu `lastmod` scris de mână — **de actualizat** când se schimbă conținutul paginilor).
- Alt text pe toate imaginile (exceptând fundalul decorativ din ParallaxCallout).
- `vercel.json`: headere de bază (`X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`) + rewrites pentru paginile legale.
- Verificat: `npm audit` 0 vulnerabilități, fără secrete în cod, fără `target="_blank"` nesigur, fără cookie-uri / localStorage / analytics. **CSP nu e adăugat** (ar necesita testare ca să nu strice Framer Motion sau Google Fonts).

## Localizare

Site 100% în română. Rămân în engleză doar denumirile celor 4 piloni / tipuri de proiect (Club Solutions, Football Intelligence, Multi-Club Heritage, Commercial) și „One Task Only" — nume proprii de serviciu.

## Sincronizare cu brandingul (Gemini)

Fișierul local `GEMINI-SYNC.md` (netracked, doar pentru lipit în sesiunea Gemini) conține deciziile unde **site-ul e sursa de adevăr**: Geist + Roboto Slab (nu Roboto Serif), fundal `#0E0E0D` (nu `#262626`), imaginea AI cu statuie în Hero, CTA-urile „ÎNCEPE UN PROIECT" / „VEZI PORTOFOLIUL", fără grilă cu cele 6 valori, fără numele fondatorilor. Conține și faptele corectate despre cele 3 proiecte (Gemini avea greșit originea A.S.P.I. și statusul Gloria Ultra). Parțial depășit de revizuirile ulterioare de texte — de reîmprospătat înainte de următorul schimb cu Gemini.

## Deploy

- **GitHub**: `https://github.com/lualex216/zecro` (branch `main`).
- **Vercel**: `zecro.vercel.app`. **Blocaj cunoscut, nerezolvat la ultima verificare**: Framework Preset setat pe Next.js (proiect vechi), cauzând eroare de build. De schimbat manual: Settings → General → Build & Development Settings → Framework Preset → **Vite**, apoi redeploy.
- Domeniul `zec.ro` e presupus în canonical / OG / sitemap; **conectarea lui în Vercel nu a fost confirmată**.

## Planificat (nu e implementat)

**Coming soon**: s-a renunțat (19–21 oct. 2026); site-ul complet se lansează direct, fără pagină intermediară.

**Blog**: implementat (oct. 2026), vezi „Blog" mai jos. Rămâne planificată doar arhiva `/blog` (când trec de 4 articole).

## Blog

- **Conținut**: un fișier per articol în `src/data/posts/<slug>.ts` (`order`, `meta`, apoi, după marcajul `// @@blocks`, `blocks`); `src/data/posts.ts` le adună. Autor „ZECRO", imagini 1200×630 în `public/blog/`, PDF-urile sursă în `_docs/blog/` (în afara repo-ului). Textele au fost revizuite editorial față de PDF-urile Gemini (greșeli, formulări de „text generat", afirmații fără acoperire; detalii în sesiunea din 23 oct. 2026).
- **Calendar de publicare**: `src/data/posts/schedule.json` (`firstPostDate`, `intervalDays`; acum 28 oct. 2026 + 7 zile → 28 oct, 4 nov, 11 nov, 18 nov, miercuri); data fiecărui articol = `firstPostDate + order × intervalDays`. **La lansare, `firstPostDate` = ziua lansării.** Un articol e „publicat" dacă data lui <= data build-ului (`__BUILD_DATE__`, fusul Europe/Bucharest; `BUILD_DATE=YYYY-MM-DD npm run build` testează alt moment; în dev se văd toate).
- **Ordinea cardurilor** în secțiune e fixă, cea din calendar (`order` 0–3: paradigmă, ghidul tânărului fotbalist, meciul birourilor, multi-club), indiferent care sunt publicate; `FEED` în `posts.ts`. Secțiunea afișează primele 4 (de revăzut când trec de 4 articole).
- **Nepublicat = doar previzualizare**: cardul apare în secțiune (imagine estompată, insignă „În curând", „Disponibil din <data>", titlu), fără link, fără pagină, fără intrare în sitemap; textul lui e scos din bundle la build de pluginul `embargoUnpublishedPosts` din `vite.config.ts` (înlocuiește tot de la `// @@blocks` cu `[]`). Verificat: textul nepublicat nu apare nicăieri în `dist/`.
- **Publicare programată**: un articol cu dată viitoare apare la primul build de după dată. `.github/workflows/scheduled-deploy.yml` declanșează miercuri 00:10 UTC un Deploy Hook Vercel (**necesită secretul `VERCEL_DEPLOY_HOOK_URL` în GitHub**).
- **UI**: `Blog.tsx` (`id="blog"`, între Servicii și FAQ, fundal închis), aranjare după secțiunea din Studiova: 2×2 carduri cu lățimi alternate (`xl:col-span-5/7`, apoi `7/5`), al doilea card decalat în jos (`xl:mt-12`), text peste imagine (grayscale + gradient: „CITEȘTE /” cu slash accent, titlu, jos `0X / TAG` și data), intrare cu animație la scroll (framer-motion `whileInView`, stagger). Sub `xl` cardurile merg pe 2 coloane / 1 coloană. Link „BLOG” în meniu. Click pe un card publicat → `ArticleModal.tsx` (ca la studiile de caz) + `pushState` la `/blog/<slug>`; Esc / Back închid. Cardurile publicate sunt `<a href>` reale (Ctrl/Cmd-click și crawlerele merg pe pagina articolului); cele nepublicate arată „ÎN CURÂND /” și nu sunt link.
- **Linkul partajat**: `/blog/<slug>` se prerandează ca pagină de sine stătătoare (`ArticlePage.tsx`) cu head propriu (title, description = `excerpt`, canonical, `og:image` / `twitter:image` = imaginea articolului, `og:type=article`, JSON-LD `Article`); `scripts/prerender.mjs` adaugă articolele publicate în `dist/sitemap.xml`. `cleanUrls` servește `dist/blog/<slug>.html` la `/blog/<slug>`; un articol nepublicat dă 404. **De verificat după deploy** cu Facebook Sharing Debugger / LinkedIn Post Inspector.
- Rămâne planificată doar arhiva `/blog` (când trec de 4 articole).

## Ce mai rămâne deschis

- Framework Preset greșit pe Vercel și conectarea domeniului `zec.ro` (vezi Deploy).
- **Formulare**: footer + „Începe un proiect" trimit prin `api/contact.ts` (Vercel Function, Resend, fără dependențe noi) la `office@zec.ro`, cu `reply_to` = e-mailul vizitatorului, honeypot `website`, validare și escape HTML; client în `src/lib/sendContact.ts`, cu stări „Se trimite..." / eroare (fallback `mailto:`). Testat doar cu Resend simulat. **De făcut**: cont Resend + domeniul `zec.ro` verificat (DNS), `RESEND_API_KEY` în Vercel (Production + Preview; opțional `CONTACT_FROM`, `CONTACT_TO`), test real după deploy. În `npm run dev`, `/api` nu există (trimiterea dă eroare); local se folosește `vercel dev`. Politica de confidențialitate trebuie completată cu Resend ca procesator.
- `STATUS` e hardcodat „ACTIV" pentru toate proiectele în `CaseStudyModal`; la Gloria Ultra ar trebui „inactiv" (în Figma era). Necesită câmp `status` per proiect.
- `og-image.jpg`: statuia acoperă literele din mijlocul wordmark-ului („ZECRO" se citește „ZEC_O"); de refăcut dacă se vrea numele brandului lizibil în preview-uri.
- Perioadele și orașul exact (Gloria Ultra: Dorohoi sau Botoșani?) nu sunt pe site; apar doar în textele pentru Facebook/LinkedIn.
- Revizuire juridică a paginilor legale; opțional, self-hosting pentru fonturi (elimină transferul de IP către Google); CSP.
- Instagram a fost scos din footer (nu există cont/URL); de adăugat dacă apare.
- Lint: 2 avertismente oxlint (`ProjectModal` dependențe `useEffect` pentru Esc; `Navbar` setState în effect).

## Convenții de lucru

- **Push pe git doar la cerere explicită.** Rămân netracked intenționat: `.agents/`, `skills-lock.json` (skill-ul `brag-slim` + lock) și `GEMINI-SYNC.md`; `brag-output/` e în `.gitignore`.
- Înainte de orice înlocuire de fișiere în `public/`: `git status` / `git diff`. (Incident: imaginile puse manual de client în `public/projects/` au fost suprascrise o dată; nerecuperabile pentru că nu fuseseră comise.)
- Orice schimbare se verifică cu `tsc --noEmit` + `npm run build` + test în browser.
- Fără numele fondatorilor pe site; autorul textelor publice = „ZECRO".
