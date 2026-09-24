export type ProjectPillar = {
  heading: string;
  description: string;
  items: string[];
};

export type ProjectResults = {
  description: string;
  highlights: string[];
};

export type Project = {
  id: string;
  index: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: string;
  involvement: string;
  context: string;
  administrativePillar: ProjectPillar;
  brandingPillar: ProjectPillar;
  gallery: string[];
  results: ProjectResults;
};

export const projects: Project[] = [
  {
    id: "aspi",
    index: "01",
    client: "A.S.P.I.",
    title:
      "De la Steaua Magică la A.S.P.I.: transformarea unui club de juniori într-o echipă înscrisă în Liga 4.",
    description:
      "ZECRO a preluat moștenirea clubului de copii și juniori Steaua Magică din Iași și a transformat proiectul în A.S.P.I., o echipă nou-înscrisă în Liga 4, cu un plan de dezvoltare care include și susținerea unei academii de juniori.",
    tags: ["Creare Club & Identitate", "Licențiere & Administrativ", "Academie de Juniori"],
    image: "/projects/aspi.png",
    involvement: "TRANSFORMARE CLUB & ÎNFIINȚARE ACADEMIE",
    context:
      "Fotbalul de juniori din Iași avea nevoie de o structură administrativă nouă — capabilă să transforme un nucleu existent de copii și juniori într-un proiect cu perspectivă de competiție profesionistă, fără moștenirea birocratică a unui club vechi.",
    administrativePillar: {
      heading: "Structură nouă, conformitate completă",
      description:
        "ZECRO a gestionat integral tranziția de la un club de juniori la o structură competițională completă, cu accent pe conformitate administrativă și sustenabilitate financiară.",
      items: [
        "Preluarea și transformarea clubului de juniori Steaua Magică (Iași)",
        "Dosar de afiliere & înscriere oficială în Liga 4",
        "Structură de finanțare din surse multiple, fără dependență de un singur susținător",
      ],
    },
    brandingPillar: {
      heading: "Disciplină, eleganță și moștenire",
      description:
        "Identitatea A.S.P.I. a fost construită în jurul disciplinei și eleganței clasice, cu o paletă cromatică distinctă și un ton de comunicare direct și onest.",
      items: [
        "Arhetip de brand: Înțeleptul Atletic — eleganță clasică, disciplină, rol de mentorat",
        "Paletă cromatică: albastru profund, negru, crem și accent auriu",
        "Echipament oficial de joc și materiale de prezentare pregătite pentru lansarea publică",
      ],
    },
    gallery: [],
    results: {
      description:
        "Colaborarea a pus bazele unei identități de club complet noi, cu rădăcini în comunitatea de juniori din Iași.",
      highlights: [
        "Înscriere oficială reușită în Liga 4",
        "Identitate de brand completă, gata de lansare publică",
        "Plan clar de extindere către o academie de juniori",
      ],
    },
  },
  {
    id: "cetatea-suceava",
    index: "02",
    client: "Cetatea Suceava",
    title:
      "Revitalizarea unui brand istoric: redesenarea identității vizuale, licențiere și management strategic.",
    description:
      "Proiect din pilonul ZECRO Heritage axat pe protejarea și restaurarea patrimoniului sportiv. ZECRO a redesenat sigla clubului istoric, a oferit asistență pe comunicare și social media și asigură managementul strategic continuu în cadrul conducerii clubului.",
    tags: ["Revitalizare Brand Istoric", "Management Strategic", "Strategie Social Media"],
    image: "/projects/cetatea-suceava.png",
    involvement: "MANAGEMENT STRATEGIC CONTINUU",
    context:
      "Un brand istoric al fotbalului din Bucovina, cu identitate puternică în comunitate, dar cu nevoie de restructurare vizuală și de guvernanță strategică pentru a rămâne relevant și competitiv în Liga 3.",
    administrativePillar: {
      heading: "Stabilitate sportivă și guvernanță continuă",
      description:
        "ZECRO asigură managementul strategic continuu al clubului, cu accent pe stabilitate sportivă și administrativă în vederea participării constante în play-off-ul de promovare.",
      items: [
        "Poziție activă în conducerea clubului",
        "Managementul meciurilor de pe teren propriu (Stadionul „Areni”) ca punct de adunare comunitar",
        "Planificare strategică pe termen lung, conectată la rețeaua multi-club ZECRO",
      ],
    },
    brandingPillar: {
      heading: "Moștenirea Cetății, reconectată",
      description:
        "Identitatea vizuală reconectează suporterii cu simbolistica istorică a Cetății de Scaun a Sucevei, adaptată standardelor moderne de brand și cerințelor oficiale FRF pentru Liga 3.",
      items: [
        "Redesign logo & elemente heraldice",
        "Paletă cromatică: albastru marin, albastru regal, alb, cu accente roșu/galben conform manualului Ligii 3",
        "Materiale oficiale de meci: panouri interviu, badge-uri de acces, bilete, afișe de promovare",
      ],
    },
    gallery: [],
    results: {
      description:
        "Rezultatul e un brand istoric reconectat cu suporterii săi și o guvernanță strategică stabilă în cadrul conducerii clubului.",
      highlights: [
        "Participare constantă în play-off-ul de promovare din Liga 3",
        "Identitate vizuală reconectată cu tradiția Cetății Sucevei",
        "Stadionul „Areni” consolidat ca punct de adunare comunitar",
      ],
    },
  },
  {
    id: "gloria-ultra",
    index: "03",
    client: "Gloria Ultra",
    title:
      "Management executiv complet pentru un club aflat la început de drum, până la decizia finanțatorilor de a schimba direcția.",
    description:
      "ZECRO a preluat proiectul într-o fază incipientă, construind identitatea de brand, structura organizațională și fluxurile administrative necesare unui management executiv complet. Colaborarea s-a încheiat atunci când finanțatorii clubului au decis reorientarea proiectului către mini-fotbal.",
    tags: ["Management Executiv Complet", "Creare Club & Identitate", "Brand & Comercial"],
    image: "/projects/gloria-ultra.png",
    involvement: "MANAGEMENT EXECUTIV COMPLET",
    context:
      "Proiectul și-a propus să testeze metode moderne de administrare și guvernanță pentru un club de fotbal, gestionat direct de fondatorii ZECRO, până când finanțatorii clubului au decis o schimbare de direcție.",
    administrativePillar: {
      heading: "Management executiv, de la zero",
      description:
        "ZECRO a preluat managementul executiv complet al clubului, construind de la zero structura organizațională și fluxurile administrative necesare, într-un proiect-pilot pentru metode moderne de administrare.",
      items: [
        "Structură organizațională & fluxuri administrative de la zero",
        "Management executiv complet, condus direct de fondatorii ZECRO",
        "Colaborarea s-a încheiat odată cu decizia finanțatorilor de reorientare spre mini-fotbal",
      ],
    },
    brandingPillar: {
      heading: "Păunul: eleganță și regenerare",
      description:
        "Identitatea de brand a fost construită în jurul Păunului — simbol al eleganței, mândriei și regenerării — cu un ton de comunicare prietenos și aproape de suporteri.",
      items: [
        "Mascotă & simbol central: Păunul (#PăuniiÎnZbor)",
        "Paletă cromatică: albastru (încredere), roșu (pasiune), alb (integritate)",
        "Echipament oficial de joc și materiale de prezentare pentru lansarea publică",
      ],
    },
    gallery: [],
    results: {
      description:
        "Deși colaborarea s-a încheiat odată cu reorientarea clubului spre mini-fotbal, proiectul a pus bazele unei identități de brand complete și a rafinat metodologia ZECRO pentru managementul executiv al proiectelor multi-club.",
      highlights: [
        "Identitate de brand completă, de la structură organizațională la simbolistică",
        "Experiență directă în managementul executiv complet al unui club",
        "Lecții aplicate ulterior în proiectele multi-club ZECRO",
      ],
    },
  },
];
