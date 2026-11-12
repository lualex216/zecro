import { ArrowUpRight } from "lucide-react";

// Listă de linkuri interne de la finalul paginilor de articol / studiu de caz.
export default function RelatedLinks({
  label,
  items,
  uppercase = false,
}: {
  label: string;
  items: { href: string; title: string }[];
  uppercase?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <section className="border-t border-white/10 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
          / {label}
        </span>
        <ul className="mt-6 flex flex-col divide-y divide-white/10 border-y border-white/10">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
              >
                <span
                  className={`font-sans text-lg font-bold leading-snug${uppercase ? " uppercase" : ""}`}
                >
                  {item.title}
                </span>
                <ArrowUpRight size={16} className="shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
