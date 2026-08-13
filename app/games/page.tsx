import { games } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Games",
  "Small browser games by Omm — hosted elsewhere, played here.",
  "/games",
);

export default function GamesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 pb-20 md:px-6 md:pr-24">
      <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Play</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">games</h1>
      <p className="mt-3 max-w-xl text-muted">
        Tiny things that run in a browser. Play opens the live host in a new tab.
      </p>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {games.map((g) => (
          <li key={g.slug}>
            <a
              href={g.playUrl}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-xl border border-line/70 bg-panel/40 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="h-40"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${g.coverFrom}, ${g.coverTo})`,
                }}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{g.title}</h2>
                <p className="mt-2 text-sm text-muted">{g.blurb}</p>
                <p className="mt-4 text-xs font-medium tracking-wide uppercase">Play ↗</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
