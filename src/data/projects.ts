export type Project = {
  id: string;
  index: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: string;
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
  },
];
