import { PrintButton } from "@/components/print-button";
import { experience, projects, resume, site, socials } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Resume",
  `Curriculum vitae for ${site.name}, ${site.role} in ${site.location}.`,
  "/resume",
);

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 pt-28 pb-16 md:px-6 md:pr-24">
      <div className="print:hidden mb-8 flex items-center justify-between text-sm">
        <p className="text-muted">Print this page for a paper copy.</p>
        <PrintButton />
      </div>
      <header>
        <h1 className="text-4xl font-semibold tracking-tight">{site.name}</h1>
        <p className="mt-1 text-lg">
          {site.role} · {site.location}
        </p>
        <p className="mt-2 text-sm">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {" · "}
          <a href={socials.github}>GitHub</a>
          {" · "}
          <a href={socials.linkedin}>LinkedIn</a>
        </p>
      </header>
      <p className="mt-8 leading-relaxed">{resume.summary}</p>

      <h2 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">Experience</h2>
      <ul className="mt-4 space-y-6">
        {experience.map((e) => (
          <li key={e.org}>
            <p className="font-medium">
              {e.role} · {e.org}
            </p>
            <p className="font-mono text-xs text-muted">{e.period}</p>
            <p className="mt-1 text-muted">{e.notes}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">Projects</h2>
      <ul className="mt-4 space-y-4">
        {projects.map((p) => (
          <li key={p.slug}>
            <p className="font-medium">{p.title}</p>
            <p className="text-muted">{p.summary}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">Skills</h2>
      <p className="mt-3">{resume.skills.join(" · ")}</p>

      <h2 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">Education</h2>
      <ul className="mt-3">
        {resume.education.map((ed) => (
          <li key={ed.school}>
            {ed.credential} · {ed.school} · {ed.period}
          </li>
        ))}
      </ul>
    </main>
  );
}
