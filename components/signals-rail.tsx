"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { useWeather } from "./providers";

type Cell = { label: string; value: string };

function Spark({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const w = 56;
  const h = 16;
  const pts = values
    .map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * w;
      const y = h - (v / max) * (h - 2) - 1;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="inline-block align-middle" aria-hidden>
      <polyline fill="none" stroke="currentColor" strokeWidth="1" points={pts} />
    </svg>
  );
}

function availabilityNow() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const hourFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    hour: "numeric",
    hour12: false,
  });
  const now = new Date();
  const hour = Number(hourFmt.format(now));
  const open = hour >= site.workHours.start && hour < site.workHours.end;
  return {
    clock: fmt.format(now),
    label: open ? "Open to collab" : "Heads down",
  };
}

export function SignalsRail() {
  const { sceneMode, climate } = useWeather();
  const [cells, setCells] = useState<Cell[]>([]);
  const [spark, setSpark] = useState<number[]>([1, 2, 1, 3, 2, 2, 1]);
  const [uptime, setUptime] = useState<Array<{ name: string; ok: boolean }>>([]);

  useEffect(() => {
    let cancelled = false;
    const avail = availabilityNow();

    Promise.all([
      fetch("/api/github").then((r) => r.json()),
      fetch("/api/wakatime").then((r) => r.json()),
      fetch("/api/steam").then((r) => r.json()),
      fetch("/api/spotify").then((r) => r.json()),
      fetch("/api/trakt").then((r) => r.json()),
      fetch("/api/uptime").then((r) => r.json()),
      fetch("/api/presence").then((r) => r.json()),
    ])
      .then(([gh, waka, steam, spot, trakt, up, pres]) => {
        if (cancelled) return;
        setSpark(gh.sparkline ?? [1, 2, 1, 3, 2, 2, 1]);
        setUptime(up.checks ?? []);
        const next: Cell[] = [
          { label: "GitHub", value: gh.latest ?? "—" },
          { label: "WakaTime", value: waka.text ?? "—" },
          { label: "Steam", value: steam.text ?? "—" },
          { label: "Spotify", value: spot.text ?? "—" },
          { label: "Watching", value: trakt.text ?? "—" },
          { label: "Desk", value: `${avail.clock} · ${avail.label}` },
          { label: "Presence", value: String(pres.count ?? 4000) },
        ];
        setCells(next);
      })
      .catch(() => {
        if (cancelled) return;
        const avail = availabilityNow();
        setCells([
          { label: "GitHub", value: "portfolio · feat: denser project cards" },
          { label: "WakaTime", value: "28 hrs 41 mins this week" },
          { label: "Steam", value: "Playing · Hades II" },
          { label: "Spotify", value: "Now · Midnight City — M83" },
          { label: "Watching", value: "Watching · Severance S02E03" },
          { label: "Desk", value: `${avail.clock} · ${avail.label}` },
          { label: "Presence", value: "4000" },
        ]);
        setSpark([3, 5, 2, 8, 4, 6, 7]);
        setUptime([
          { name: "This site", ok: true },
          { name: "Ledger Lane", ok: true },
          { name: "Signal Garden", ok: true },
        ]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-label="Signals" className="overflow-hidden rounded-xl border border-line/70 bg-panel/40">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-muted">
        {cells.map((c) => (
          <p key={c.label} className="flex items-baseline gap-2 normal-case tracking-normal">
            <span className="uppercase tracking-wider text-muted">{c.label}</span>
            <span className="text-ink">{c.value}</span>
            {c.label === "GitHub" ? (
              <span className="text-accent">
                <Spark values={spark} />
              </span>
            ) : null}
          </p>
        ))}
        <p className="flex items-center gap-2 normal-case tracking-normal">
          <span className="uppercase tracking-wider text-muted">Uptime</span>
          {(uptime.length ? uptime : [{ name: "site", ok: true }]).map((u) => (
            <span key={u.name} className="inline-flex items-center gap-1 text-ink">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${u.ok ? "bg-accent" : "bg-red-700"}`}
                aria-hidden
              />
              {u.name}
            </span>
          ))}
        </p>
        {sceneMode === "live" && climate ? (
          <p className="flex items-baseline gap-2 normal-case tracking-normal">
            <span className="uppercase tracking-wider text-muted">Climate</span>
            <span className="text-ink">
              {climate.city} · {climate.condition}
            </span>
          </p>
        ) : null}
      </div>
    </section>
  );
}
