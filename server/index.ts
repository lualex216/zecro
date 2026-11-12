// Serviciu mic pentru hosting propriu: expune POST /api/contact în spatele nginx.
// Folosește exact handler-ul din api/contact.ts (același cod ca funcția Vercel), deci
// comportamentul e identic pe ambele platforme. Rulează cu Node 24+ (TypeScript nativ):
//   node server/index.ts
// Variabile de mediu: vezi deploy/contact.env.example.
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { POST } from "../api/contact.ts";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "127.0.0.1";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://zec.ro,https://www.zec.ro")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const MAX_BODY = 16 * 1024;
const RATE = { windowMs: 10 * 60 * 1000, max: 5 };

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE.max;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= RATE.windowMs)) hits.delete(ip);
  }
}, RATE.windowMs).unref();

// În spatele nginx, IP-ul real vine din X-Real-IP, dar îl credem doar de pe loopback.
function clientIp(req: IncomingMessage) {
  const remote = req.socket.remoteAddress ?? "unknown";
  const loopback = remote === "127.0.0.1" || remote === "::1" || remote === "::ffff:127.0.0.1";
  const forwarded = req.headers["x-real-ip"];
  return loopback && typeof forwarded === "string" && forwarded ? forwarded : remote;
}

function send(res: ServerResponse, status: number, body: Record<string, unknown>, headers = {}) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers });
  res.end(JSON.stringify(body));
}

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    let size = 0;
    let tooLarge = false;
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        // Nu închidem conexiunea încă: răspundem 413, iar restul corpului e ignorat
        // (requestTimeout oprește oricum un upload fără sfârșit).
        if (!tooLarge) reject(new Error("payload_too_large"));
        tooLarge = true;
        chunks.length = 0;
        return;
      }
      if (!tooLarge) chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function handle(req: IncomingMessage, res: ServerResponse) {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");

  if (pathname === "/api/health") return send(res, 200, { ok: true });
  if (pathname !== "/api/contact") return send(res, 404, { error: "not_found" });
  if (req.method !== "POST") return send(res, 405, { error: "method_not_allowed" }, { Allow: "POST" });

  // Un formular de pe alt site ar putea trimite POST „simplu” (text/plain), fără preflight CORS:
  // cerem Origin permis (când există) și JSON.
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return send(res, 403, { error: "forbidden_origin" });
  if (!String(req.headers["content-type"] ?? "").toLowerCase().startsWith("application/json")) {
    return send(res, 415, { error: "unsupported_media_type" });
  }
  if (rateLimited(clientIp(req))) return send(res, 429, { error: "rate_limited" }, { "Retry-After": "600" });

  let body: string;
  try {
    body = await readBody(req);
  } catch {
    return send(res, 413, { error: "payload_too_large" }, { Connection: "close" });
  }

  const response = await POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),
  );
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(await response.text());
}

const server = createServer((req, res) => {
  handle(req, res).catch((err) => {
    console.error("Eroare neașteptată", err);
    if (!res.headersSent) send(res, 500, { error: "server_error" });
    else res.end();
  });
});
server.headersTimeout = 10_000;
server.requestTimeout = 15_000;
server.keepAliveTimeout = 5_000;

server.listen(PORT, HOST, () => console.log(`zecro-contact ascultă pe http://${HOST}:${PORT}`));

for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5_000).unref();
  });
}
