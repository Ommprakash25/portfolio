import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts } from "@/lib/mdx";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta(post.title, post.description, `/writing/${slug}`);
}

export default async function WritingPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 pt-28 pb-16 md:px-6 md:pr-24">
      <p className="font-mono text-xs text-muted">{post.date}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{post.title}</h1>
      <article className="mt-10 space-y-5 text-lg leading-relaxed [&_p]:text-ink">
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}
