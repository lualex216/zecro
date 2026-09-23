# ZECRO — Context Proiect

Site web pentru **ZECRO**, agenție de management sportiv din România (fotbal). Construit de la zero pornind de la un spec generic de creative studio, apoi rebrandat complet și populat cu conținut real.

## Stack tehnic

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`, fără `tailwind.config.js` — totul e configurat în `src/index.css` via `@theme`)
- **Framer Motion** — animații, scroll parallax, drawer-uri/dialog-uri
- **GSAP + ScrollTrigger** — reveal-uri de tip "word-by-word" pe manifeste
- **lucide-react** — iconițe UI generice (nu și iconițele de servicii, care sunt SVG-uri custom din Figma)

Comenzi: `npm run dev` (preview local), `npm run build` (`tsc -b && vite build`), `npm run lint` (oxlint).

## Identitate vizuală

Definită în `src/index.css` (`@theme`):

| Token | Valoare | Utilizare |
|---|---|---|
| `--color-accent` | `#CAF077` | verde neon, accent principal (CTA-uri, iconițe, highlight-uri, punctul cursorului pe fundal întunecat) |
| `--color-accent-2` | `#8DA853` | verde olive, folosit pe fundaluri deschise (contrast mai bun decât accent — și pe punctul cursorului acolo) |
| `--color-ink` | `#0E0E0D` | text închis pe fundaluri accent |
| `--color-obsidian` / `-2` / `-3` / `-4` | variații de negru | fundaluri secțiuni întunecate |
| `--color-bone` | `#FAFDF1` | fundal deschis (secțiuni "Despre noi", "Portofoliu", "FAQ") |
| `--color-card-1..4` | nuanțe verzi-negru | fundaluri carduri proiecte |

**Fonturi**: Geist (sans, titluri) + Roboto Slab (`font-mono` — folosit pentru toate etichetele mici/eyebrow-uri, în ciuda numelui clasei).

**Logo**: SVG-uri originale în `src/assets/logo.svg` (wordmark complet) și `src/assets/mark.svg` (doar iconul), ambele cu `fill="currentColor"` ca să poată fi colorate din CSS. Randate prin componentele `Logo.tsx` / `Mark.tsx` (`dangerouslySetInnerHTML` + import `?raw`). Iconul din wordmark e mereu accent (regulă CSS `.zecro-logo svg > g:last-of-type`).

**Cursor custom** (`CustomCursor.tsx`): punct + cerc alb care urmăresc mouse-ul, cu etichete contextuale traduse în română (`data-cursor="..."` pe elemente interactive). Punctul își schimbă culoarea în funcție de fundalul de sub el: verde lime (`accent`) pe fundal întunecat, verde olive (`accent-2`) pe fundal deschis — detectat prin `data-cursor-bg="light"` pus pe secțiunile cu fundal deschis (StudioStatement, SelectedWork, FAQ). Cercul rămâne mereu alb (decizie explicită). Animația de mărire a cercului la hover are spring supra-amortizat (`damping: 36` la `stiffness: 300`) ca să nu depășească ținta și să nu creeze flash de reflow pe etichetele de 2 rânduri.

## Structura paginii (`src/App.tsx`)

1. **Navbar** — logo + linkuri (`Despre noi`, `Portofoliu`, `Servicii`, `FAQ`, `Contact`) + CTA `Începe un proiect`. Capsulă plutitoare la scroll.
2. **HeroSection** — poză de fundal (`public/hero.jpg`, zoom lent continuu 24s), tagline, „VEZI PORTOFOLIUL", headline „MANAGEMENT SPORTIV" (auto-fit pe un singur rând, full width, via măsurare JS în `useLayoutEffect`).
3. **StudioStatement** (`id="studio"`) — manifest ZECRO (reveal GSAP), filozofie + 2 metrici (100% Transparență, FIFA Agenți Licențiați), mark-ul ZECRO într-un cerc, lista **Piloni** (Player Advisory / Club Solutions / Multi-Club Heritage / Commercial).
4. **SelectedWork** (`id="work"`) — 3 proiecte reale (vezi mai jos), layout alternant stânga/dreapta, header sticky cu contor live „0X/03" (calculat din poziția de scroll, nu IntersectionObserver — motiv: bug de sincronizare descoperit și reparat). Imaginea fiecărui proiect (cu tilt 3D la hover) e click-abilă și deschide același modal ca butonul „Citește studiul de caz".
5. **Capabilities** (`id="capabilities"`) — 4 carduri de servicii cu sticky-stack la scroll, conținut + iconițe SVG reale din Figma.
6. **FAQ** (`id="faq"`) — accordion cu 5 întrebări.
7. **ParallaxCallout** — banner cu efect typing (3 fraze românești) peste `public/parallax.jpg` (parallax scroll + zoom).
8. **Footer** (`id="contact"`) — formular de contact inline (Nume/Email/Club/Tip solicitare/Mesaj) + linkuri + social.
9. **ProjectModal** — drawer lateral deschis de orice buton „Începe un proiect", formular tradus (buget în €, tip proiect = cei 4 piloni).
10. **CaseStudyModal** — deschis din cardurile de proiecte (buton sau imagine). **Responsive cu două variante distincte**, comutate prin `matchMedia` (prag 768px, nu doar clase CSS): pe desktop e un dialog centrat, mai lat (`max-w-4xl`), cu grid pe 3 coloane pentru CLIENT/IMPLICARE ZECRO/STATUS; pe mobil rămâne drawer lateral (`max-w-lg`, la fel ca ProjectModal), cu aceleași informații afișate ca listă verticală. Conținutul comun (tag-uri, faze) e factorizat în componente mici partajate (`Tags`, `InfoRows`, `PhasesList`).

## Conținut real (din Figma)

Sursă: `https://www.figma.com/design/8lwdXsgGoE7gAfCchl03vv/ZECRO` — mockup de referință în aceeași temă.

- **3 proiecte** în `src/data/projects.ts`: **A.S.P.I.** (echipamente + consultanță Liga 4), **Cetatea Suceava** (revitalizare brand istoric), **Gloria Ultra** (club construit de la zero). Imagini reale descărcate în `public/projects/`.
- **4 servicii** în `Capabilities.tsx`: Management sportiv & suport operațional, Reprezentare & dezvoltare carieră, Ecosistem sportiv & revitalizare, Dezvoltare comercială & comunicare. Iconițe SVG descărcate din Figma → `src/assets/services/`, colorate via `currentColor` prin `ServiceIcon.tsx`.
- Titlurile lungi (proiecte + servicii) sunt trunchiate la 2 rânduri (`line-clamp-2`).

### Structura studiilor de caz (fiecare proiect are)

- `involvement`: etichetă text pentru nivelul de implicare ZECRO (ex. „PARTENERIAT ADMINISTRATIV & CREATIV", „MANAGEMENT STRATEGIC CONTINUU", „MANAGEMENT EXECUTIV COMPLET") — afișată în grid-ul de info din drawer/dialog.
- `phases`: listă **flexibilă** (nu fixă) de etape ale colaborării, fiecare cu `title`, `description` și `items` (checklist de realizări concrete). Numărul de faze poate diferi de la un proiect la altul — nu sunt forțate în tiparul "administrativ + creativ".
- **Important**: conținutul fazelor pentru toate cele 3 proiecte e un **draft scris de asistent**, pornind de la ce se știa deja despre fiecare proiect — nu a fost încă validat integral de client cu fapte reale. De revizuit.

## Localizare

Site 100% în română (nav, CTA-uri, formulare, cursor). Rămân în engleză doar denumirile celor 4 "piloni"/tip-uri de proiect (Player Advisory, Club Solutions, Multi-Club Heritage, Commercial) — tratate ca nume proprii de serviciu, consistent peste tot unde apar. Buget-ul din `ProjectModal` e în euro (€), nu dolari.

## Deploy

- **GitHub**: `https://github.com/lualex216/zecro` (repo recreat de la zero, git init local + push).
- **Vercel**: `zecro.vercel.app` — proiect existent, reconectat la noul repo. **Blocaj cunoscut, nerezolvat la ultima verificare**: Framework Preset era setat pe Next.js (proiect vechi, nerelaționat), cauzând eroare de build (`No Next.js version detected`). Trebuie schimbat manual în dashboard: Settings → General → Build & Development Settings → Framework Preset → **Vite**, apoi redeploy.

## Ce mai rămâne deschis

- Framework Preset greșit pe Vercel (blocaj activ, vezi mai sus) — de confirmat dacă a fost rezolvat între timp.
- Conținutul fazelor din studiile de caz (`phases` în `projects.ts`) e draft, de validat cu clientul.
- Secțiunea Capabilities își păstrează manifestul tradus („VIZIUNEA evoluează în STRATEGIE...") dar alte fragmente minore ar putea necesita revizuire.
- Contact social (Instagram/LinkedIn în footer) sunt text simplu, fără URL-uri reale.
- Email de contact (`contact@zecro.ro`) e placeholder, de confirmat dacă e adresa reală.
- Nu există teste automate — orice verificare s-a făcut manual, vizual, în browser.
