import { COMPANY } from "./company";

export type LegalBlock = string | string[];

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  related: { label: string; href: string };
};

const UPDATED = "13 octombrie 2026";

const IDENTIFICATION: string[] = [
  `Denumire: ${COMPANY.name}`,
  `Formă juridică: ${COMPANY.legalForm}`,
  `Cod unic de înregistrare (CUI): ${COMPANY.cui}`,
  `Cod de identificare fiscală pentru TVA: ${COMPANY.vatId}`,
  `Număr de înregistrare în Registrul Comerțului: ${COMPANY.tradeRegister}`,
  `Sediul social: ${COMPANY.address}`,
  `E-mail: ${COMPANY.email}`,
  `Telefon: ${COMPANY.phone}`,
  `Website: ${COMPANY.website}`,
];

export const PRIVACY: LegalDocument = {
  path: "/politica-de-confidentialitate",
  title: "Politica de confidențialitate",
  metaTitle: "Politica de confidențialitate — ZECRO",
  description:
    "Cum prelucrează ZECRO S.R.L. datele cu caracter personal transmise prin site-ul zec.ro: scopuri, temeiuri legale, durata păstrării și drepturile tale.",
  updated: UPDATED,
  intro:
    "Confidențialitatea datelor tale contează pentru noi. Această politică explică ce date personale prelucrăm prin site-ul zec.ro, de ce, cât timp le păstrăm și ce drepturi ai, în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și cu legislația română aplicabilă.",
  related: { label: "Termeni și condiții", href: "/termeni-si-conditii" },
  sections: [
    {
      heading: "Cine este operatorul datelor",
      blocks: [
        "Operatorul datelor cu caracter personal prelucrate prin acest site este:",
        IDENTIFICATION,
        `Pentru orice întrebare privind datele tale personale ne poți scrie la ${COMPANY.email}.`,
      ],
    },
    {
      heading: "Ce date prelucrăm",
      blocks: [
        "Datele pe care ni le transmiți tu. Dacă ne scrii prin formularele „Începe un proiect” sau „Contact” ori direct prin e-mail, putem prelucra:",
        [
          "numele și adresa de e-mail;",
          "clubul sau organizația din care faci parte (dacă o completezi);",
          "tipul solicitării și, în formularul „Începe un proiect”, intervalul de buget orientativ;",
          "conținutul mesajului tău și orice alte informații pe care alegi să ni le transmiți.",
        ],
        "Date tehnice. Atunci când accesezi site-ul, serverul furnizorului de găzduire poate înregistra automat adresa IP, tipul de browser și momentul accesării. Aceste date sunt folosite pentru securitatea și buna funcționare a site-ului.",
        "Nu avem conturi de utilizator, nu procesăm plăți prin site și nu îți solicităm date sensibile. Te rugăm să nu ne transmiți date sensibile în mesaje.",
      ],
    },
    {
      heading: "De ce prelucrăm datele și pe ce temei",
      blocks: [
        [
          "Pentru a răspunde solicitărilor tale și a purta discuții înainte de încheierea unui contract — art. 6 alin. (1) lit. b) GDPR (măsuri la cererea persoanei vizate înainte de încheierea unui contract) sau, în relațiile cu cluburi și organizații, art. 6 alin. (1) lit. f) (interesul nostru legitim de a comunica cu potențiali parteneri);",
          "Pentru încheierea și executarea contractelor de servicii — art. 6 alin. (1) lit. b);",
          "Pentru îndeplinirea obligațiilor legale, de pildă cele contabile și fiscale — art. 6 alin. (1) lit. c);",
          "Pentru securitatea și funcționarea site-ului — art. 6 alin. (1) lit. f);",
          "Pentru comunicări comerciale, doar dacă ți-ai dat consimțământul — art. 6 alin. (1) lit. a). Îl poți retrage oricând, fără să afecteze legalitatea prelucrării anterioare.",
        ],
        "Nu folosim datele tale pentru marketing direct fără consimțământul tău prealabil și nu luăm decizii bazate exclusiv pe prelucrare automată sau profilare.",
      ],
    },
    {
      heading: "Cookie-uri și tehnologii similare",
      blocks: [
        "Site-ul nu folosește cookie-uri de analiză sau de marketing și nu stochează date în browserul tău. Nu folosim Google Analytics, Meta Pixel sau instrumente similare de urmărire.",
        "Fonturile site-ului (Geist și Roboto Slab) sunt încărcate de la Google Fonts. La încărcarea paginii, browserul tău transmite adresa IP către serverele Google pentru a primi fișierele de font.",
        "Dacă vom introduce instrumente de analiză sau de marketing, vom actualiza această politică și vom solicita consimțământul tău acolo unde legea o cere.",
      ],
    },
    {
      heading: "Cui transmitem datele",
      blocks: [
        "Nu vindem și nu închiriem datele tale. Le putem transmite doar:",
        [
          "furnizorilor de servicii care ne ajută să operăm site-ul și comunicările (găzduire — Vercel Inc., servicii de e-mail și infrastructură IT), pe baza unor contracte care îi obligă să protejeze datele;",
          "contabililor, consultanților juridici și altor profesioniști supuși obligației de confidențialitate, când este necesar;",
          "autorităților publice, atunci când legea ne obligă.",
        ],
        "Unii dintre furnizori (de exemplu Vercel sau Google) pot prelucra date în afara Spațiului Economic European. În aceste cazuri ne bazăm, după caz, pe Cadrul UE–SUA privind confidențialitatea datelor sau pe clauze contractuale standard aprobate de Comisia Europeană.",
      ],
    },
    {
      heading: "Cât timp păstrăm datele",
      blocks: [
        [
          "Solicitările și mesajele care nu duc la un contract: cât timp este necesar pentru a le soluționa și, ulterior, cel mult 3 ani (termenul general de prescripție), după care datele sunt șterse sau anonimizate, dacă nu ne ceri ștergerea mai devreme;",
          "Datele din contracte și documentele contabile: pe durata prevăzută de lege (de exemplu, 10 ani pentru documentele justificative contabile);",
          "Jurnalele serverului: pe perioada scurtă stabilită de furnizorul de găzduire.",
        ],
      ],
    },
    {
      heading: "Drepturile tale",
      blocks: [
        "În condițiile GDPR, ai dreptul:",
        [
          "de acces la datele tale și la informații despre prelucrarea lor;",
          "de rectificare a datelor inexacte sau incomplete;",
          "la ștergerea datelor („dreptul de a fi uitat”), când sunt îndeplinite condițiile legale;",
          "la restricționarea prelucrării;",
          "la portabilitatea datelor;",
          "de opoziție, inclusiv față de prelucrările bazate pe interesul nostru legitim;",
          "de a-ți retrage consimțământul, când prelucrarea se bazează pe acesta.",
        ],
        `Pentru a-ți exercita drepturile, scrie-ne la ${COMPANY.email}. Îți răspundem în cel mult o lună de la primirea cererii, termen care poate fi prelungit în cazurile prevăzute de GDPR.`,
        `Ai și dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP): ${COMPANY.anspdcp}. Te încurajăm însă să ne contactezi mai întâi, ca să putem rezolva situația.`,
      ],
    },
    {
      heading: "Securitatea datelor",
      blocks: [
        "Aplicăm măsuri tehnice și organizatorice rezonabile pentru protejarea datelor: conexiune criptată (HTTPS), acces limitat la date și folosirea unor furnizori de încredere. Nicio transmitere prin internet nu poate fi însă garantată ca fiind complet sigură.",
      ],
    },
    {
      heading: "Minori",
      blocks: [
        "Site-ul se adresează în principal profesioniștilor din fotbal: cluburi, academii, jucători și reprezentanții lor. Nu colectăm în mod intenționat date de la minori fără acordul părinților sau al reprezentanților legali. Dacă suntem contactați în legătură cu un minor, discuția se poartă cu părintele sau reprezentantul legal.",
      ],
    },
    {
      heading: "Linkuri către alte site-uri",
      blocks: [
        "Site-ul poate conține trimiteri către pagini ale unor terți, de exemplu rețele sociale. Nu controlăm și nu răspundem pentru politicile lor de confidențialitate; te rugăm să le consulți separat.",
      ],
    },
    {
      heading: "Modificări ale politicii",
      blocks: [
        "Putem actualiza periodic această politică. Versiunea în vigoare este cea publicată pe această pagină, împreună cu data ultimei actualizări.",
      ],
    },
    {
      heading: "Contact",
      blocks: [
        `${COMPANY.name} — ${COMPANY.address}.`,
        `E-mail: ${COMPANY.email} · Telefon: ${COMPANY.phone}`,
      ],
    },
  ],
};

export const TERMS: LegalDocument = {
  path: "/termeni-si-conditii",
  title: "Termeni și condiții",
  metaTitle: "Termeni și condiții — ZECRO",
  description:
    "Termenii și condițiile de utilizare a site-ului zec.ro, operat de ZECRO S.R.L.: scopul site-ului, proprietate intelectuală, limitarea răspunderii și legea aplicabilă.",
  updated: UPDATED,
  intro:
    "Acești termeni stabilesc regulile de utilizare a site-ului zec.ro. Te rugăm să-i citești înainte de a naviga sau de a ne trimite o solicitare.",
  related: {
    label: "Politica de confidențialitate",
    href: "/politica-de-confidentialitate",
  },
  sections: [
    {
      heading: "Informații despre operator",
      blocks: [
        "Site-ul zec.ro este operat de:",
        IDENTIFICATION,
      ],
    },
    {
      heading: "Acceptarea termenilor",
      blocks: [
        "Prin accesarea și utilizarea site-ului confirmi că ai citit acești termeni și că ești de acord cu ei. Dacă nu ești de acord, te rugăm să nu mai folosești site-ul.",
      ],
    },
    {
      heading: "Scopul site-ului",
      blocks: [
        "Site-ul are caracter informativ: prezintă ZECRO, serviciile noastre de management sportiv și consultanță și proiectele din portofoliu.",
        "Site-ul nu este un magazin online. Nu se încheie contracte și nu se fac plăți prin intermediul lui.",
      ],
    },
    {
      heading: "Solicitări și servicii",
      blocks: [
        "Formularele „Începe un proiect” și „Contact” îți permit să ne transmiți o solicitare sau un mesaj. Trimiterea unei solicitări nu creează nicio obligație pentru ZECRO sau pentru tine și nu reprezintă o ofertă fermă.",
        "Serviciile noastre se prestează doar în baza unui contract scris, încheiat separat. Intervalele de buget din formular sunt orientative și nu constituie un preț.",
        "Reprezentarea jucătorilor se realizează prin agenți licențiați FIFA, în conformitate cu reglementările FIFA și ale Federației Române de Fotbal.",
      ],
    },
    {
      heading: "Studii de caz și portofoliu",
      blocks: [
        "Proiectele din portofoliu sunt prezentate cu scop informativ și descriu colaborări reale la momentul redactării. Rezultatele menționate nu reprezintă o garanție pentru proiecte viitoare.",
        "Denumirile, siglele, emblemele și mărcile cluburilor prezentate aparțin titularilor lor și sunt folosite exclusiv pentru a descrie colaborarea cu ZECRO. Materialele vizuale (mockup-uri, simulări, prezentări) au rol ilustrativ.",
      ],
    },
    {
      heading: "Proprietate intelectuală",
      blocks: [
        "Conținutul site-ului — texte, design, structură, sigla și identitatea vizuală ZECRO, imagini, materiale video și codul sursă — aparține ZECRO S.R.L. sau licențiatorilor săi și este protejat de Legea nr. 8/1996 privind dreptul de autor și drepturile conexe și de legislația privind mărcile.",
        "Este interzisă copierea, reproducerea, distribuirea sau folosirea conținutului în scopuri comerciale fără acordul nostru scris. Citarea scurtă, cu indicarea clară a sursei, este permisă în limitele legii.",
      ],
    },
    {
      heading: "Utilizare permisă",
      blocks: [
        "Te angajezi să folosești site-ul în mod legal și de bună-credință. Este interzis să:",
        [
          "încerci să obții acces neautorizat la site, la servere sau la date;",
          "transmiți cod malițios sau să afectezi funcționarea site-ului;",
          "folosești mijloace automate (scraping, boți) într-un mod abuziv sau care încarcă nerezonabil infrastructura;",
          "trimiți prin formulare conținut ilicit, înșelător, ofensator sau care încalcă drepturile altora.",
        ],
      ],
    },
    {
      heading: "Limitarea răspunderii",
      blocks: [
        "Informațiile de pe site sunt generale și nu constituie consultanță juridică, fiscală sau financiară. Depunem eforturi pentru ca ele să fie corecte și actuale, dar nu garantăm lipsa erorilor sau disponibilitatea neîntreruptă a site-ului.",
        "În măsura permisă de lege, ZECRO nu răspunde pentru prejudicii indirecte sau pierderi rezultate din utilizarea site-ului sau din imposibilitatea de a-l folosi. Nicio prevedere din acești termeni nu limitează răspunderea care, potrivit legii, nu poate fi exclusă sau limitată, inclusiv drepturile consumatorilor.",
      ],
    },
    {
      heading: "Linkuri către terți",
      blocks: [
        "Site-ul poate conține trimiteri către pagini ale unor terți. Acestea sunt oferite pentru comoditate; nu controlăm conținutul lor și nu răspundem pentru el.",
      ],
    },
    {
      heading: "Protecția datelor personale",
      blocks: [
        "Modul în care prelucrăm datele cu caracter personal este descris în Politica de confidențialitate, disponibilă pe site.",
      ],
    },
    {
      heading: "Modificarea termenilor",
      blocks: [
        "Putem actualiza acești termeni oricând. Versiunea în vigoare este cea publicată pe această pagină, cu data ultimei actualizări, și se aplică de la momentul publicării.",
      ],
    },
    {
      heading: "Legea aplicabilă și soluționarea litigiilor",
      blocks: [
        "Acești termeni sunt guvernați de legea română. Orice neînțelegere va fi soluționată mai întâi pe cale amiabilă. În lipsa unei înțelegeri, litigiile se soluționează de instanțele române competente, iar în relațiile cu profesioniștii de instanțele competente de la sediul social al ZECRO. Consumatorii beneficiază de dispozițiile imperative ale legii care li se aplică.",
        `Consumatorii se pot adresa și Autorității Naționale pentru Protecția Consumatorilor (ANPC): ${COMPANY.anpc}.`,
      ],
    },
    {
      heading: "Contact",
      blocks: [
        `${COMPANY.name} — ${COMPANY.address}.`,
        `E-mail: ${COMPANY.email} · Telefon: ${COMPANY.phone}`,
      ],
    },
  ],
};

export const LEGAL_DOCUMENTS: LegalDocument[] = [PRIVACY, TERMS];
