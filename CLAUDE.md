# zec.ro — instrucțiuni pentru Claude Code

Site-ul ZECRO S.R.L. (agenție de management sportiv, fotbal). Tot conținutul public e în română.

## Context de citit
- Tehnic, design, structură, decizii de implementare: @CONTEXT.md
- Brand, poziționare, piloni, ton, fapte verificate, ce nu promitem: @BRAND.md

## Reguli
- Înainte de orice text nou sau modificat (componente, `src/data/*`, articole de blog, meta din `index.html`), verifică `BRAND.md`. Folosește numele canonice ale pilonilor și faptele de acolo.
- Nu prezenta ZECRO ca agent de fotbal: fără „reprezentare jucători”, „agenți licențiați FIFA” sau intermediere/negociere de transferuri ca serviciu ZECRO.
- Fără superlative și fără cifre care nu pot fi dovedite (ex. „100% transparență”).
- Când se ia o decizie nouă de brand sau de conținut, actualizează `BRAND.md` în același commit. Deciziile tehnice merg în `CONTEXT.md`.
- Verificare: `tsc`, `npm run build`, apoi vizual în browser (vezi `CONTEXT.md`).
