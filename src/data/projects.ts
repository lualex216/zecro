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
      "Echipamente oficiale, identitate vizuală și consultanță administrativă pentru înscrierea în Liga 4.",
    description:
      "Un pachet integrat B2B care a combinat consultanța administrativă (înscrierea oficială a echipei în Liga 4 de către ZECRO) cu designul complet al echipamentelor de joc Adidas Teamwear 2026, integrarea sponsorilor și materiale digitale de prezentare.",
    tags: ["Brand", "Creare Club & Identitate", "Brand & Comercial"],
    image: "/projects/aspi.png",
    involvement: "PARTENERIAT ADMINISTRATIV & CREATIV",
    phases: [
      {
        title: "Înscriere oficială în Liga 4",
        description:
          "ZECRO a gestionat integral procesul administrativ de înscriere a echipei A.S.P.I. în Liga 4, de la dosarul de afiliere la relația cu forurile competente, asigurând conformitatea completă înainte de startul sezonului.",
        items: [
          "Dosar de afiliere & documentație FRF/AJF",
          "Relație directă cu forul competent",
          "Consultanță privind clasificarea competițională",
        ],
      },
      {
        title: "Identitate vizuală & echipament de joc",
        description:
          "Am proiectat identitatea vizuală completă a clubului și am coordonat producția echipamentului oficial de joc Adidas Teamwear 2026, integrând sponsorii și pregătind materialele digitale de prezentare pentru lansarea publică.",
        items: [
          "Design complet echipament Adidas Teamwear 2026",
          "Integrare vizuală sponsori",
          "Materiale digitale de prezentare",
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
      "Construirea unui club de la zero: identitate de brand, structură organizațională și management executiv complet.",
    description:
      "ZECRO a preluat proiectul din faza incipientă, construind identitatea de brand, structura organizațională și fluxurile administrative necesare, alături de un management executiv complet pentru primele etape de dezvoltare ale clubului.",
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
          "Am creat identitatea de brand a clubului și am preluat managementul executiv complet în primele etape de dezvoltare, ghidând proiectul de la concept la realitate competițională.",
        items: [
          "Identitate de brand completă",
          "Management executiv complet",
          "Ghidare strategică în etapele inițiale",
        ],
      },
    ],
  },
];
