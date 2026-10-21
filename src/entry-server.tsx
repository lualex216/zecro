import { renderToString } from "react-dom/server";
import App from "./App";
import { LEGAL_DOCUMENTS } from "./data/legal";

export function render(path: string) {
  return renderToString(<App path={path} />);
}

export const legalPages = LEGAL_DOCUMENTS.map((d) => ({
  path: d.path,
  title: d.metaTitle,
  description: d.description,
}));
