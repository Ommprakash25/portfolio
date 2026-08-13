import { games, projects, site } from "@/lib/content";
import { getPosts } from "@/lib/mdx";

export default function sitemap() {
  const base = site.url;
  const staticPaths = ["", "/work", "/writing", "/kit", "/games", "/resume", "/building", "/cli"].map(
    (p) => ({
      url: `${base}${p || "/"}`,
      lastModified: new Date(),
    }),
  );
  const work = projects.map((p) => ({ url: `${base}/work/${p.slug}`, lastModified: new Date() }));
  const writing = getPosts().map((p) => ({
    url: `${base}/writing/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  const play = games.map((g) => ({ url: `${base}/games#${g.slug}`, lastModified: new Date() }));
  return [...staticPaths, ...work, ...writing, ...play];
}
