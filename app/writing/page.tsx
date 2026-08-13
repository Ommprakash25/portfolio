import Link from "next/link";
import { getPosts } from "@/lib/mdx";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Writing",
  "Notes on shipping complete layouts — essays by Omm.",
  "/writing",
);

export default function WritingIndex() {
  const posts = getPosts();
  return (
    <main className="mx-auto max-w-3xl px-4 pt-28 pb-20 md:px-6 md:pr-24">
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug} className="mb-4">
            <Link href={`/writing/${p.slug}`} className="flex flex-col space-y-1">
              <p className="tracking-tight">{p.title}</p>
              <p className="h-6 text-xs text-muted">
                {p.date} · {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
