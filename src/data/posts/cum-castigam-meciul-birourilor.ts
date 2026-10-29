import type { PostBlock, PostMeta } from "../posts";

// Poziția în calendarul de publicare: data = firstPostDate + order × intervalDays (vezi schedule.json).
export const order = 2;

export const meta: PostMeta = {
  slug: "cum-castigam-meciul-birourilor",
  title: "Cum câștigăm „meciul birourilor”",
  subtitle: "Ghid de administrare, licențiere și clasificare a academiilor în fotbalul din România",
  excerpt: "Auditul instituțional, dosarul de licențiere și clasificarea academiilor: ce trebuie pus în ordine ca un club să aibă stabilitate și drept de joc.",
  tag: "Administrativ",
  image: "/blog/blog-3-ghid-de-administrare-licentiere-si-clasificare.jpg",
  imageAlt: "Ghid de administrare, licențiere și clasificare a academiilor în fotbalul din România",
  author: "ZECRO",
  focus: "62% 50%"
};

// @@blocks — tot ce urmează e eliminat din bundle până la data publicării (vezi vite.config.ts).
export const blocks: PostBlock[] = [
  {
    type: "p",
    text: "Ce se vede pe gazon e, în mare parte, oglinda a ceea ce se întâmplă în birouri. Tactica și valoarea individuală a jucătorilor nu pot compensa lipsa de guvernanță, deficitele financiare sau greșelile din dosarele de licențiere."
  },
  {
    type: "p",
    text: "În România, multe proiecte sportive promițătoare se opresc din motive administrative, nu sportive: sancțiuni birocratice, litigii contractuale sau finanțări pierdute din cauza unor documentații făcute prost."
  },
  {
    type: "p",
    text: "Ghidul de față se adresează conducerilor de cluburi și academii. Rezumă ce trebuie pus în ordine ca un club să aibă stabilitate și drept de joc în competițiile profesioniste."
  },
  {
    type: "h2",
    text: "Auditul instituțional: cum stă de fapt clubul"
  },
  {
    type: "p",
    text: "Înainte să fixezi un obiectiv de promovare, ai nevoie de o evaluare onestă a stării clubului. Auditul instituțional urmărește, de regulă:"
  },
  {
    type: "ul",
    items: [
      "structura organizatorică: organigrama, fișele de post, responsabilitățile executive;",
      "situația financiar-contractuală: toate contractele de activitate sportivă, riscurile de litigiu și datoriile restante;",
      "infrastructura și sectorul juvenil: stadiul omologării bazei sportive și cât produce propria academie."
    ]
  },
  {
    type: "h2",
    text: "Dosarul de licențiere"
  },
  {
    type: "p",
    text: "Licența pentru Liga 1 și pentru competițiile UEFA, ca și certificatul de participare în Liga 2, nu sunt simple formalități. Regulamentele Federației Române de Fotbal (FRF), aliniate la sistemul UEFA de licențiere, evaluează cluburile pe mai multe categorii de criterii:"
  },
  {
    type: "ul",
    items: [
      "sportive: programe pentru tineri și echipe de copii și juniori înscrise în competițiile oficiale;",
      "de infrastructură: stadion omologat, facilități de antrenament, securitate și accesibilitate;",
      "de personal și administrație: cadru tehnic, medical, administrativ și de securitate cu pregătirea cerută;",
      "juridice: acte constitutive la zi, declarații de conformitate și lipsa conflictelor de proprietate;",
      "financiare: situații financiare auditate și lipsa datoriilor restante către angajați și autorități."
    ]
  },
  {
    type: "p",
    text: "Cerințele exacte diferă de la o competiție la alta și se actualizează de la un sezon la altul, așa că merită verificate în regulamentul în vigoare."
  },
  {
    type: "h2",
    text: "Clasificarea academiilor (CCJ)"
  },
  {
    type: "p",
    text: "Centrele de copii și juniori (CCJ) sunt clasificate de FRF, iar punctajul obținut contează, printre altele, în procesul de licențiere al cluburilor din Liga 1. Un punctaj bun cere, de regulă:"
  },
  {
    type: "ul",
    items: [
      "o metodologie de antrenament unitară, cu un curriculum adaptat pe categorii de vârstă;",
      "staff tehnic calificat, cu antrenori care au licențele UEFA corespunzătoare fiecărei grupe de juniori;",
      "infrastructură dedicată: terenuri de antrenament, vestiare, spații medicale și echipamente pentru monitorizarea efortului;",
      "un traseu clar spre echipa de seniori, cu mecanisme oficiale prin care juniorii sunt promovați."
    ]
  },
  {
    type: "h2",
    text: "Soluția ZECRO: management externalizat"
  },
  {
    type: "p",
    text: "Un club care nu are resurse sau oameni pentru birocrația de zi cu zi poate externaliza managementul către o echipă specializată. Prin Club & Academy Solutions, ZECRO preia, pe bază de contract, atribuții de directorat sportiv sau executiv: întocmește dosarele, reprezintă clubul în relația cu FRF și AJF și ține bugetul sub control. Pentru multe cluburi, e cea mai rezonabilă variantă din punct de vedere economic."
  },
  {
    type: "h2",
    text: "Ordinea din birouri se vede pe teren"
  },
  {
    type: "p",
    text: "Un club administrat modern, cu audit, transparență și guvernanță curată, este mai atractiv pentru sponsori, investitori și suporteri."
  }
];
