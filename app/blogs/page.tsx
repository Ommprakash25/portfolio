import Link from "next/link";
import { getPosts } from "@/lib/mdx";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Blogs",
  "Notes on shipping complete layouts — essays by Omm.",
  "/blogs",
);

export default function BlogsIndex() {
  const posts = getPosts();
  return (
    <main className="mx-auto max-w-3xl px-4 pt-16 pb-28 md:px-6">
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">blog</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug} className="mb-4">
            <Link href={`/blogs/${p.slug}`} className="flex flex-col space-y-1">
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
