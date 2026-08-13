import { notFound } from "next/navigation";
import { ProjectJsonLd } from "@/components/json-ld";
import { projects, site } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMeta(project.title, project.summary, `/work/${slug}`);
}

export default async function WorkCase({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const url = `${site.url}/work/${project.slug}`;

  return (
    <main className="mx-auto max-w-2xl px-4 pt-28 pb-16 md:px-6 md:pr-24">
      <ProjectJsonLd name={project.title} description={project.summary} url={project.url ?? url} />
      <p className="font-mono text-xs text-muted">
        {project.year} · {project.stack.join(" · ")}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-4 text-lg text-muted">{project.summary}</p>
      <section className="mt-12 space-y-8">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Problem</h2>
          <p className="mt-3 leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Approach</h2>
          <p className="mt-3 leading-relaxed">{project.approach}</p>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Outcome</h2>
          <p className="mt-3 leading-relaxed">{project.outcome}</p>
        </div>
      </section>
    </main>
  );
}
