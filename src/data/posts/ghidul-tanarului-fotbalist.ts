import type { PostBlock, PostMeta } from "../posts";

// Poziția în calendarul de publicare: data = firstPostDate + order × intervalDays (vezi schedule.json).
export const order = 1;

export const meta: PostMeta = {
  slug: "ghidul-tanarului-fotbalist",
  seoTitle: "Ghidul tânărului fotbalist: contracte și agenți FIFA",
  title: "Ghidul tânărului fotbalist",
  subtitle: "Ce trebuie să știe jucătorii și părinții despre contracte, licența FIFA și planificarea carierei",
  excerpt: "Primul contract, agentul licențiat FIFA și alegerea clubului potrivit: reperele pe care jucătorii și părinții ar trebui să le aibă înainte să semneze.",
  tag: "Jucători și părinți",
  image: "/blog/blog-2-ghidul-tanarului-fotbalist.jpg",
  imageAlt: "Ghidul tânărului fotbalist: contracte, licența FIFA și planificarea carierei",
  author: "ZECRO",
  focus: "35% 50%"
};

// @@blocks — tot ce urmează e eliminat din bundle până la data publicării (vezi vite.config.ts).
export const blocks: PostBlock[] = [
  {
    type: "p",
    text: "Trecerea de la juniorat la fotbalul profesionist e cea mai fragilă etapă din cariera unui tânăr sportiv. Fără informații clare și fără protecție juridică, o decizie luată în grabă sau un contract semnat fără prea multă atenție pot opri evoluția unui jucător cu potențial ani la rând."
  },
  {
    type: "p",
    text: "La ZECRO credem că un fotbalist informat este un fotbalist protejat. Ghidul de față le dă jucătorilor și familiilor lor câteva repere despre protecția contractuală, reprezentarea oficială și planificarea carierei pe termen lung."
  },
  {
    type: "h2",
    text: "Primul contract: ce semnezi și la ce să fii atent"
  },
  {
    type: "p",
    text: "Primul contract profesionist nu confirmă doar talentul. E și un angajament juridic ferm. Înainte de semnătură, jucătorul și părinții ar trebui să verifice:"
  },
  {
    type: "ul",
    items: [
      "Durata contractului și opțiunile de prelungire. O clauză care îi permite clubului să prelungească unilateral poate bloca jucătorul, așa că trebuie citită cu atenție.",
      "Drepturile financiare. Salariul, primele de performanță, grila de premiere și asigurarea medicală în caz de accidentare.",
      "Drepturile de imagine. În ce condiții pot folosi clubul sau terții imaginea jucătorului în campanii comerciale."
    ]
  },
  {
    type: "h2",
    text: "De ce contează un agent licențiat FIFA"
  },
  {
    type: "p",
    text: "Regulamentul FIFA privind agenții de fotbal (FFAR) a fost creat ca piața transferurilor să fie mai transparentă și mai etică. Dacă lucrezi cu un agent licențiat FIFA:"
  },
  {
    type: "ul",
    items: [
      "contractele de intermediere respectă cerințele internaționale și sunt înregistrate oficial;",
      "comisioanele sunt transparente, iar interesele financiare ale jucătorului sunt protejate;",
      "agentul are obligația legală și morală să acționeze în interesul de dezvoltare al jucătorului."
    ]
  },
  {
    type: "h2",
    text: "Cariera se planifică: dezvoltarea înaintea profitului rapid"
  },
  {
    type: "p",
    text: "Una dintre cele mai frecvente greșeli ale impresariatului tradițional este să sacrifici etapele firești de creștere pentru un contract rapid, dar nepotrivit. Un plan de carieră bun are în vedere:"
  },
  {
    type: "ul",
    items: [
      "Clubul în care joci. Pentru un tânăr de 17–18 ani, minutele adunate în Liga 2 sau în Liga 3 pot valora mai mult decât statutul de rezervă neutilizată într-un lot de Liga 1.",
      "Școala. Pregătirea școlară și dezvoltarea personală dau echilibrul psihologic de care ai nevoie în sportul de performanță.",
      "Pregătirea mentală și alimentația. Un stil de viață disciplinat se construiește și în afara celor 90 de minute."
    ]
  },
  {
    type: "h2",
    text: "Deciziile de la 16–18 ani contează"
  },
  {
    type: "p",
    text: "Cariera unui fotbalist e scurtă, iar deciziile luate la 16–18 ani îi pot schimba mult parcursul. Fiecare contract semnat, fiecare club ales și fiecare etapă de pregătire sunt părți ale aceluiași plan de carieră, construit cu răbdare și responsabilitate."
  },
  {
    type: "p",
    text: "Pentru tinerii fotbaliști și familiile lor, sprijinul potrivit înseamnă să înțeleagă ce își asumă, să evalueze realist oportunitățile și să poată decide în cunoștință de cauză. Iar când vine momentul reprezentării, primul pas e simplu: verificați că agentul ales este licențiat FIFA."
  }
];
