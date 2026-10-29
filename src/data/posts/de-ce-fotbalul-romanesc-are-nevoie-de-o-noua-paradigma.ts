import type { PostBlock, PostMeta } from "../posts";

// Poziția în calendarul de publicare: data = firstPostDate + order × intervalDays (vezi schedule.json).
export const order = 0;

export const meta: PostMeta = {
  slug: "de-ce-fotbalul-romanesc-are-nevoie-de-o-noua-paradigma",
  title: "De ce fotbalul românesc are nevoie de o nouă paradigmă",
  subtitle: "De la impresariatul tradițional la managementul sportiv integrat",
  excerpt: "Impresariatul clasic și-a arătat limitele. Ce se schimbă atunci când reprezentarea jucătorilor și administrarea cluburilor sunt gândite împreună.",
  tag: "Management sportiv",
  image: "/blog/blog-1-de-ce-fotbalul-romanesc-are-nevoie-de-o-noua-paradigma.jpg",
  imageAlt: "De ce fotbalul românesc are nevoie de o nouă paradigmă",
  author: "ZECRO",
  focus: "50% 50%"
};

// @@blocks — tot ce urmează e eliminat din bundle până la data publicării (vezi vite.config.ts).
export const blocks: PostBlock[] = [
  {
    type: "p",
    text: "Modelul clasic al impresariatului din fotbalul românesc și-a arătat limitele. Mulți ani, piața a fost dominată de intermedierea rapidă a transferurilor și de comisioanele de moment. Interesul pe termen lung al jucătorului și stabilitatea cluburilor au rămas, de multe ori, pe plan secund."
  },
  {
    type: "p",
    text: "Un fotbal sustenabil și competitiv are nevoie de altceva: să treci de la intermedierea de ocazie la managementul sportiv integrat."
  },
  {
    type: "h2",
    text: "Unde se rupe impresariatul tradițional"
  },
  {
    type: "p",
    text: "Fotbalul de azi nu se mai joacă doar pe gazon. Deciziile administrative, cadrul juridic, disciplina financiară și pregătirea tinerilor sportivi contează la fel de mult ca tactica din cele 90 de minute."
  },
  {
    type: "p",
    text: "Impresariatul de tip vechi a lăsat în urmă câteva probleme care se repetă:"
  },
  {
    type: "ul",
    items: [
      "Orizontul scurt. Etapele firești de dezvoltare ale unui jucător tânăr sunt sacrificate pentru un contract rapid, iar cariera se blochează uneori înainte să înceapă.",
      "Lipsa protecției. Tinerii sportivi și familiile lor rămân adesea fără sprijin juridic real și se lovesc de clauze abuzive sau de venituri imprevizibile.",
      "Relații rupte cu cluburile. Reprezentanții jucătorilor și conducerile cluburilor nu au o viziune comună, iar în locul parteneriatului apar conflicte.",
      "Administrativul tratat superficial. Dosarele de licențiere și omologare sau clasificarea academiilor de copii și juniori sunt ignorate până când apar problemele."
    ]
  },
  {
    type: "h2",
    text: "Ce înseamnă managementul sportiv integrat"
  },
  {
    type: "p",
    text: "Managementul sportiv integrat înseamnă să construiești structuri care țin în timp, nu să închei un transfer și să dispari. Reprezentarea jucătorilor și sprijinul pentru cluburi se gândesc împreună, pentru că performanța de nivel înalt depinde de amândouă. Modelul se sprijină pe patru direcții."
  },
  {
    type: "h3",
    text: "Reprezentare licențiată și protecție contractuală"
  },
  {
    type: "p",
    text: "Un fotbalist are nevoie de cineva care răspunde juridic pentru deciziile luate alături de el. Agenții licențiați FIFA nu fac doar intermediere transparentă: asistă jucătorul pe toată durata negocierii contractelor, urmăresc respectarea regulamentelor naționale și internaționale și îi protejează drepturile de imagine."
  },
  {
    type: "h3",
    text: "Dezvoltare personală, educație și mentorat"
  },
  {
    type: "p",
    text: "Un atlet de elită se formează și în afara terenului. Un management integrat urmărește continuitatea școlară, orientarea vocațională și pregătirea mentală, ca sportivul să poată decide matur atunci când e sub presiune."
  },
  {
    type: "h3",
    text: "Rigoare administrativă și audit pentru cluburi"
  },
  {
    type: "p",
    text: "Rezultatele unei echipe merg mână în mână cu ordinea din birouri. Auditul instituțional, bugetele realiste, dosarele de omologare și licențiere întocmite corect și un management executiv bine organizat sunt condiții fără de care nicio investiție nu rezistă mult timp."
  },
  {
    type: "h3",
    text: "Ecosistem multi-club și patrimoniu"
  },
  {
    type: "p",
    text: "O rețea de cluburi din eșaloane diferite le oferă tinerilor un drum clar de la un nivel la altul: joacă minute acolo unde se potrivește stadiului lor de dezvoltare. Cluburile cu tradiție își păstrează identitatea și comunitatea de suporteri, printr-un model economic care se poate susține."
  },
  {
    type: "h2",
    text: "Un parteneriat corect pentru viitorul fotbalului"
  },
  {
    type: "p",
    text: "„Meciul birourilor” nu e un slogan. E o condiție dacă vrem ca fotbalul românesc să conteze din nou la nivel internațional. Când un club e administrat transparent, iar jucătorii sunt reprezentați etic, pe baza unor analize solide, riscurile financiare scad, iar performanța devine mai ușor de anticipat."
  },
  {
    type: "p",
    text: "La ZECRO ne-am propus să contribuim la această schimbare. Unim consultanța de business pentru cluburi cu managementul de carieră pentru sportivi, ca să construim un mediu curat, profesionist și ancorat în valori reale. Fotbalului românesc nu-i lipsește talentul. Îi lipsesc structura, transparența și viziunea pe termen lung."
  }
];
