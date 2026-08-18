import { building } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Building",
  "A dated changelog of what Omm shipped — notes, not a feed.",
  "/building",
);

export default function BuildingPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 pt-16 pb-28 md:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">Building</h1>
      <ol className="mt-12 border-l border-line pl-6">
        {building.map((b) => (
          <li key={b.date} className="relative mb-10">
            <span className="absolute -left-[1.6rem] top-1.5 h-2 w-2 bg-accent" />
            <p className="font-mono text-xs text-muted">{b.date}</p>
            <h2 className="mt-1 text-xl">{b.title}</h2>
            <p className="mt-2 text-muted">{b.note}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
