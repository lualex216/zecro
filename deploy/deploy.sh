#!/usr/bin/env bash
# Build și publicare atomică pe serverul propriu.
#   - actualizează checkout-ul din GitHub (branch main), construiește site-ul,
#   - copiază rezultatul într-un director nou din releases/ și mută simbolic `current` pe el,
#   - păstrează ultimele 5 versiuni (rollback: ln -sfn releases/<versiune-veche> current).
# Rulează ca utilizatorul `zecro` (nu root). Se cheamă manual după fiecare modificare și
# automat miercuri 00:10 UTC din cron (publicarea programată a articolelor, vezi zecro-publish.cron).
#
# Structura așteptată (APP_DIR, implicit /var/www/zecro):
#   repo/        checkout git al proiectului (git clone o singură dată)
#   releases/    versiuni construite
#   current  ->  releases/<ultima>   (rădăcina nginx)
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/zecro}"
KEEP="${KEEP:-5}"
SERVICE="${SERVICE:-zecro-contact}"

exec 9>"$APP_DIR/.deploy.lock"
flock -n 9 || { echo "Un alt deploy rulează deja."; exit 1; }

log() { echo "[$(date -u +%FT%TZ)] $*"; }

cd "$APP_DIR/repo"
OLD="$(git rev-parse HEAD)"
git fetch --quiet origin main
git reset --hard --quiet origin/main
NEW="$(git rev-parse HEAD)"
log "commit $OLD -> $NEW"

# npm ci doar când s-a schimbat package-lock.json (sau lipsește node_modules).
LOCK_HASH="$(sha256sum package-lock.json | cut -d' ' -f1)"
if [ ! -d node_modules ] || [ "$(cat .lock-hash 2>/dev/null || true)" != "$LOCK_HASH" ]; then
  log "npm ci"
  npm ci --no-audit --no-fund
  echo "$LOCK_HASH" > .lock-hash
fi

log "npm run build"
npm run build

# Verificări minime înainte de a schimba versiunea activă.
[ -s dist/index.html ] && grep -q "https://zec.ro/" dist/index.html || { log "dist/index.html invalid, anulez"; exit 1; }
[ -s dist/404.html ] || { log "dist/404.html lipsește, anulez"; exit 1; }

REL="$APP_DIR/releases/$(date -u +%Y%m%d%H%M%S)"
mkdir -p "$REL"
cp -a dist/. "$REL/"
ln -sfn "$REL" "$APP_DIR/current.tmp"
mv -Tf "$APP_DIR/current.tmp" "$APP_DIR/current"
log "activ: $REL"

# Elimină versiunile vechi.
ls -1dt "$APP_DIR"/releases/* | tail -n +"$((KEEP + 1))" | xargs -r rm -rf

# Repornește serviciul de contact doar dacă s-a schimbat codul lui.
if [ "$OLD" != "$NEW" ] && ! git diff --quiet "$OLD" "$NEW" -- api server; then
  log "api/server modificate, repornesc $SERVICE"
  sudo -n systemctl restart "$SERVICE" || log "ATENȚIE: nu am putut reporni $SERVICE (vezi sudoers în README)"
fi
log "gata"
