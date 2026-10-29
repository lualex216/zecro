import type { Post, PostBlock } from "../data/posts";

// „Titlu scurt. Restul frazei" → titlul scurt apare îngroșat.
const LEAD = /^([^.:]{3,48}\.)\s+(.+)$/s;

function ListItem({ text }: { text: string }) {
  const m = LEAD.exec(text);
  return (
    <li className="flex gap-3 text-base leading-relaxed text-white/75 sm:text-lg">
      <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span>
        {m ? (
          <>
            <strong className="font-semibold text-white">{m[1]}</strong> {m[2]}
          </>
        ) : (
          text
        )}
      </span>
    </li>
  );
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-base leading-relaxed text-white/75 sm:text-lg">{block.text}</p>;
    case "h2":
      return (
        <h2 className="mt-4 font-sans text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-2 font-sans text-lg font-bold leading-snug text-white sm:text-xl">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <ListItem key={item} text={item} />
          ))}
        </ul>
      );
  }
}

export default function ArticleBody({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-6">
      {post.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
