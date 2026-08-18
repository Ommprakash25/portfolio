import { games, projects, site } from "@/lib/content";
import { getPosts } from "@/lib/mdx";

export default function sitemap() {
  const base = site.url;
  const staticPaths = ["", "/projects", "/blogs", "/games", "/resume", "/building", "/cmd"].map(
    (p) => ({
      url: `${base}${p || "/"}`,
      lastModified: new Date(),
    }),
  );
  const work = projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() }));
  const writing = getPosts().map((p) => ({
    url: `${base}/blogs/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  const play = games.map((g) => ({ url: `${base}/games#${g.slug}`, lastModified: new Date() }));
  return [...staticPaths, ...work, ...writing, ...play];
}
