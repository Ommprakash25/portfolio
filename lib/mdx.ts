import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "writing");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export function getPostSlugs() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
}

export function getPosts(): PostMeta[] {
  return getPostSlugs()
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? file),
        date: String(data.date ?? ""),
        description: String(data.description ?? ""),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    content,
  };
}
