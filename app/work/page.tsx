import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Work",
  "Selected projects by Omm — case studies with stack, problem, and outcome.",
  "/work",
);

export default function WorkIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-20 md:px-6 md:pr-24">
      <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Portfolio</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">projects</h1>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </main>
  );
}
