import Link from "next/link";
import { GithubContributions } from "@/components/github-contributions";
import { Hero } from "@/components/hero";
import { ProjectStack } from "@/components/project-stack";
import { Reveal } from "@/components/reveal";
import { SignalsRail } from "@/components/signals-rail";
import { experience, games, projects, site, socials, tech } from "@/lib/content";
import { getPosts } from "@/lib/mdx";
import { pageMeta } from "@/lib/metadata";

const base = pageMeta(`${site.name} — ${site.role}`, site.description, "/");

export const metadata = {
  ...base,
  title: { absolute: `${site.name} — ${site.role}` },
};

function SectionKicker({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">{kicker}</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
    </div>
  );
}

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const posts = getPosts().slice(0, 3);

  return (
    <main className="pb-24 md:pr-24 md:pb-0">
      <Hero />
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SignalsRail />
      </div>

      <Reveal className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <SectionKicker kicker="Open source" title="GitHub Contributions" />
        <GithubContributions />
      </Reveal>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 overflow-visible px-4 py-16 md:px-6">
        <SectionKicker kicker="Portfolio" title="Featured Projects" />
        <ProjectStack projects={featured} />
        <p className="mt-10">
          <Link href="/projects" className="text-sm text-muted hover:text-ink">
            View all projects →
          </Link>
        </p>
      </section>

      <Reveal id="blogs" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 md:px-6">
        <SectionKicker kicker="Journal" title="Blogs" />
        <ul className="space-y-5">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blogs/${p.slug}`} className="group block">
                <h3 className="font-medium group-hover:text-accent">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {p.date} · {p.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/blogs" className="text-sm text-muted hover:text-ink">
            All blogs →
          </Link>
        </p>
      </Reveal>

      <Reveal id="games" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 md:px-6">
        <SectionKicker kicker="Play" title="Games" />
        <div className="grid gap-4 sm:grid-cols-3">
          {games.map((g) => (
            <a
              key={g.slug}
              href={g.playUrl}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-xl border border-line/70 bg-panel/40 transition hover:-translate-y-0.5"
            >
              <div
                className="h-24"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${g.coverFrom}, ${g.coverTo})`,
                }}
              />
              <div className="p-3">
                <p className="font-medium">{g.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted">{g.blurb}</p>
                <p className="mt-2 text-[10px] font-medium tracking-wide uppercase">Play ↗</p>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-6">
          <Link href="/games" className="text-sm text-muted hover:text-ink">
            All games →
          </Link>
        </p>
      </Reveal>

      <Reveal className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <SectionKicker kicker="Career" title="Work Experience" />
        <ol className="relative border-l border-line pl-0">
          {experience.map((e, i) => {
            const year = e.period.match(/\d{4}/)?.[0] ?? e.period;
            const current = i === 0;
            return (
              <li key={e.org} className="relative grid grid-cols-[4.5rem_1fr] gap-4 py-5 md:grid-cols-[5.5rem_1fr]">
                <p className="pt-0.5 font-mono text-sm text-muted">{year}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg">
                      {e.role} · {e.org}
                    </p>
                    {current ? (
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-accent uppercase">
                        Current
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted">{e.notes}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted">{e.period}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>

      <Reveal className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <SectionKicker kicker="Technologies" title="Tech Stack" />
        <ul className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line bg-panel/50 px-3 py-1.5 text-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 md:px-6">
        <section id="contact">
          <p className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">Contact</p>
          <h2 className="font-display mt-3 leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}>
            Let’s work
            <br />
            together
          </h2>
          <p className="mt-6 max-w-xl text-muted">
            {site.tagline} If a surface needs to stay quiet and still ship, write.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper"
            >
              Email me
            </a>
            <a
              href={socials.linkedin}
              rel="me"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </section>
      </Reveal>
    </main>
  );
}
