export type ContactPayload = {
  kind: "contact" | "project";
  name: string;
  email: string;
  club?: string;
  type?: string;
  budget?: string;
  message: string;
  website: string;
};

export async function sendContact(payload: ContactPayload): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`contact_${res.status}`);
}
