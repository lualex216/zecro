export type ProjectPhase = {
  title: string;
  description: string;
  items: string[];
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
  phases: ProjectPhase[];
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
    phases: [
      {
        title: "De la Steaua Magică la A.S.P.I.",
        description:
          "Moștenirea clubului de copii și juniori Steaua Magică din Iași a fost preluată și transformată de ZECRO într-o nouă identitate, A.S.P.I., păstrând nucleul de jucători tineri și extinzând viziunea către fotbalul de seniori.",
        items: [
          "Preluarea și rebranding-ul clubului Steaua Magică",
          "Construirea unei identități vizuale noi",
          "Continuitatea nucleului de juniori",
        ],
      },
      {
        title: "Înscrierea oficială în Liga 4",
        description:
          "ZECRO a gestionat integral procesul administrativ de afiliere și înscriere a echipei A.S.P.I. în Liga 4, asigurând conformitatea completă cu cerințele FRF/AJF înainte de startul sezonului.",
        items: [
          "Dosar de afiliere & documentație FRF/AJF",
          "Relație directă cu forul competent",
          "Conformitate administrativă completă",
        ],
      },
      {
        title: "Plan de dezvoltare: academie de juniori",
        description:
          "Dincolo de echipa de seniori, proiectul include planuri de susținere a unei academii de copii și juniori, continuând moștenirea Steaua Magică și asigurând un flux constant de tinere talente.",
        items: [
          "Plan de înființare academie de juniori",
          "Continuarea dezvoltării tinerelor talente",
          "Structură multi-nivel: juniori → seniori",
        ],
      },
    ],
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
    phases: [
      {
        title: "Redesenarea identității istorice",
        description:
          "Am regândit sigla și elementele vizuale ale clubului istoric, păstrând simbolistica originală și adaptând-o standardelor moderne de brand, pentru a reconecta suporterii cu identitatea clubului.",
        items: [
          "Redesign logo & elemente heraldice",
          "Ghid de identitate vizuală",
          "Asistență comunicare & social media",
        ],
      },
      {
        title: "Management strategic în conducerea clubului",
        description:
          "Dincolo de brand, ZECRO face parte activă din conducerea clubului, oferind sprijin strategic continuu pentru deciziile administrative și de dezvoltare pe termen lung.",
        items: [
          "Poziție activă în conducerea clubului",
          "Planificare strategică pe termen lung",
          "Suport administrativ continuu",
        ],
      },
    ],
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
    phases: [
      {
        title: "Structură organizațională de la zero",
        description:
          "Am construit fluxurile administrative și structura organizațională necesare funcționării clubului încă din prima zi, punând bazele unui management profesionist.",
        items: [
          "Structură organizațională & roluri",
          "Fluxuri administrative de la zero",
          "Conformitate & documentație inițială",
        ],
      },
      {
        title: "Brand și management executiv",
        description:
          "Am creat identitatea de brand a clubului și am preluat managementul executiv complet, ghidând proiectul de la concept la realitate competițională.",
        items: [
          "Identitate de brand completă",
          "Management executiv complet",
          "Ghidare strategică în etapele inițiale",
        ],
      },
      {
        title: "Reorientare spre mini-fotbal",
        description:
          "După o perioadă de management executiv complet, finanțatorii clubului au decis schimbarea direcției proiectului către mini-fotbal, marcând finalul acestei etape de colaborare — o decizie a proprietarilor clubului, nu a managementului ZECRO.",
        items: [
          "Decizie a finanțatorilor de reorientare spre mini-fotbal",
          "Tranziție transparentă a managementului",
          "Lecții aplicate în proiectele multi-club ulterioare",
        ],
      },
    ],
  },
];
