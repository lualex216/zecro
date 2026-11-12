# Hosting propriu (nginx + Node) — zec.ro

Site-ul e static (`dist/`, prerandat) plus un singur endpoint dinamic, `/api/contact`. Pe server rulează:

- **nginx** — servește `dist/`, HTTPS, redirecturi, 404 real, compresie, cache, headere;
- **zecro-contact** (systemd) — `server/index.ts`, formularele către Resend; același handler ca `api/contact.ts` (Vercel);
- **cron** — rebuild miercuri 00:10 UTC pentru publicarea programată a articolelor.

Presupuneri: Debian/Ubuntu, nginx ≥ 1.25.1 (`http2 on`), Node 24+ (rulează TypeScript nativ), utilizator `zecro`.
Configurile nu au fost rulate pe un server real: primul pas la fiecare fișier e `sudo nginx -t`.

## 1. Pregătire
```bash
sudo adduser --system --group --home /var/www/zecro zecro
sudo mkdir -p /var/www/zecro/releases /var/www/certbot /var/log/zecro /etc/zecro
sudo chown -R zecro:zecro /var/www/zecro /var/log/zecro
sudo -u zecro git clone https://github.com/lualex216/zecro.git /var/www/zecro/repo
```
DNS: `A`/`AAAA` pentru `zec.ro` și `www.zec.ro` către server.

## 2. Primul build
```bash
sudo -u zecro /var/www/zecro/repo/deploy/deploy.sh
```
Construiește site-ul, îl pune în `releases/<data>` și face `current` să arate spre el.

## 3. nginx + certificat
```bash
sudo cp /var/www/zecro/repo/deploy/nginx/zecro-security-headers.conf /etc/nginx/snippets/
sudo cp /var/www/zecro/repo/deploy/nginx/zec.ro.conf /etc/nginx/conf.d/
sudo nginx -t && sudo systemctl reload nginx        # doar partea HTTP
sudo certbot certonly --webroot -w /var/www/certbot -d zec.ro -d www.zec.ro
sudo cp /var/www/zecro/repo/deploy/nginx/zec.ro-ssl.conf /etc/nginx/conf.d/
sudo nginx -t && sudo systemctl reload nginx        # acum și HTTPS
```
Reînnoirea certificatului: `certbot renew` (timer-ul vine cu pachetul certbot); adaugă un deploy-hook `systemctl reload nginx`.
HSTS: dacă HTTPS-ul e nou, pune întâi `max-age=300` în `zecro-security-headers.conf`, verifică, apoi crește.
Brotli (opțional, mai mic decât gzip): modulul `ngx_brotli`, apoi decomentezi blocul din `zec.ro-ssl.conf`.

## 4. Formularele
```bash
sudo cp /var/www/zecro/repo/deploy/contact.env.example /etc/zecro/contact.env
sudo chmod 600 /etc/zecro/contact.env && sudo nano /etc/zecro/contact.env   # RESEND_API_KEY etc.
sudo cp /var/www/zecro/repo/deploy/zecro-contact.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now zecro-contact
curl -s localhost:3001/api/health        # {"ok":true}
```
Resend: domeniul `zec.ro` trebuie verificat (înregistrări SPF + DKIM în DNS), altfel e-mailurile nu pleacă.
Verifică `which node` și, dacă nu e `/usr/bin/node`, corectează `ExecStart` în fișierul `.service`.

## 5. Publicare programată și deploy-uri
```bash
sudo cp /var/www/zecro/repo/deploy/zecro-publish.cron /etc/cron.d/zecro-publish
echo 'zecro ALL=(root) NOPASSWD: /usr/bin/systemctl restart zecro-contact' | sudo tee /etc/sudoers.d/zecro-contact
```
După fiecare modificare împinsă pe `main`: `sudo -u zecro /var/www/zecro/repo/deploy/deploy.sh`.
Rollback: `sudo -u zecro ln -sfn /var/www/zecro/releases/<versiune-veche> /var/www/zecro/current`.
Data publicării articolelor vine din `src/data/posts/schedule.json` (miercuri); fără build după dată, articolul nu apare.

## 6. Verificări după lansare
```bash
curl -sI http://zec.ro/ | head -3                         # 301 -> https://zec.ro/
curl -sI https://www.zec.ro/ | head -3                    # 301 -> https://zec.ro/
curl -sI https://zec.ro/ | grep -i "content-encoding\|cache-control\|strict-transport"
curl -sI https://zec.ro/blog/ghidul-tanarului-fotbalist   # 404 până la 25 nov.
curl -sI https://zec.ro/termeni-si-conditii.html          # 301 -> /termeni-si-conditii
curl -sI https://zec.ro/assets/ | head -1
curl -s  https://zec.ro/robots.txt https://zec.ro/sitemap.xml | head
curl -sI --range 0-99 https://zec.ro/hero.mp4 | head -3   # 206 Partial Content (Safari cere Range)
```
Apoi: PageSpeed Insights, Rich Results Test (JSON-LD), Facebook Sharing Debugger, LinkedIn Post Inspector,
Search Console (verificare DNS TXT + sitemap), Bing Webmaster Tools. Test real al formularelor din ambele locuri.

## Vercel (testare înainte de lansare)
Rămâne funcțional: `vercel.json` + `api/contact.ts` + `dist/404.html`. Preset Framework: **Vite**, Build Command `npm run build`,
`RESEND_API_KEY` în Environment Variables. Canonical-ul indică `zec.ro`, deci mediul de test nu intră în concurență în index.
