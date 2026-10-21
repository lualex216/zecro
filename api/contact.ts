// Vercel Function: primește formularele de contact și le trimite pe e-mail prin Resend.
// Variabile de mediu (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  (obligatoriu)
//   CONTACT_TO      (opțional, implicit office@zec.ro)
//   CONTACT_FROM    (opțional, implicit "ZECRO Site <noreply@zec.ro>"; domeniul trebuie verificat în Resend)

const MAX = { name: 120, email: 200, club: 160, type: 60, budget: 40, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const field = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  // Honeypot: boții completează câmpul ascuns; răspundem „ok” fără să trimitem nimic.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json({ ok: true });
  }

  const kind = data.kind === "project" ? "project" : "contact";
  const name = field(data.name, MAX.name);
  const email = field(data.email, MAX.email);
  const club = field(data.club, MAX.club);
  const type = field(data.type, MAX.type);
  const budget = field(data.budget, MAX.budget);
  const message = field(data.message, MAX.message);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return json({ error: "invalid_fields" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY lipsește");
    return json({ error: "not_configured" }, 500);
  }

  const rows: [string, string][] = [
    ["Nume", name],
    ["Email", email],
  ];
  if (club) rows.push(["Club / Organizație", club]);
  if (type) rows.push(["Tip", type]);
  if (budget) rows.push(["Buget", budget]);

  const html =
    `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">` +
    rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
      .join("") +
    `</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${message}`;

  // Fără CR/LF în subiect (header injection).
  const subject = `${kind === "project" ? "Solicitare proiect" : "Mesaj nou"} — ${name}`
    .replace(/[\r\n]+/g, " ")
    .slice(0, 200);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "ZECRO Site <noreply@zec.ro>",
      to: [process.env.CONTACT_TO || "office@zec.ro"],
      reply_to: email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend a răspuns", res.status, await res.text());
    return json({ error: "send_failed" }, 502);
  }
  return json({ ok: true });
}
