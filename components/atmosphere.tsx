"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import type { AtmosphereScene } from "@/lib/climate";
import { useWeather } from "./providers";
import { cn } from "@/lib/utils";

function Grid() {
  return <div className="grid-paper pointer-events-none absolute inset-0 opacity-80" />;
}

function Birds({ day }: { day: boolean }) {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "scene-bird pointer-events-none absolute",
            day ? "text-slate-700/80" : "text-white/55",
          )}
          style={{
            top: `${10 + i * 9}%`,
            animationDuration: `${14 + i * 3}s`,
            animationDelay: `${i * -2.4}s`,
            width: 42 + i * 8,
          }}
          viewBox="0 0 40 16"
          fill="currentColor"
          aria-hidden
        >
          <path d="M2 10 C10 2 14 2 20 10 C26 2 30 2 38 10 C28 8 24 12 20 12 C16 12 12 8 2 10Z" />
        </svg>
      ))}
    </>
  );
}

function Storm({ flash, day }: { flash: boolean; day: boolean }) {
  return (
    <>
      {flash ? <div className="scene-thunder pointer-events-none absolute inset-0 bg-white" /> : null}
      {Array.from({ length: 90 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "scene-rain-drop pointer-events-none absolute w-0.5",
            day ? "bg-slate-700/55" : "bg-white/50",
          )}
          style={{
            left: `${(i * 1.13) % 100}%`,
            height: `${22 + (i % 7) * 10}px`,
            animationDuration: `${0.55 + (i % 5) * 0.12}s`,
            animationDelay: `${(i % 9) * -0.18}s`,
            transform: "rotate(18deg)",
          }}
        />
      ))}
    </>
  );
}

function Aurora() {
  return (
    <>
      <div className="scene-aurora pointer-events-none absolute -left-1/4 -top-10 h-[70%] w-[80%] rounded-full bg-emerald-400/45 blur-3xl" />
      <div
        className="scene-aurora pointer-events-none absolute -right-10 top-0 h-[65%] w-[70%] rounded-full bg-violet-500/40 blur-3xl"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="scene-aurora pointer-events-none absolute left-1/4 top-0 h-[50%] w-[50%] rounded-full bg-cyan-300/30 blur-3xl"
        style={{ animationDelay: "-8s" }}
      />
    </>
  );
}

function Winter({ day }: { day: boolean }) {
  return (
    <>
      {Array.from({ length: 70 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "scene-snow pointer-events-none absolute rounded-full",
            day ? "bg-slate-500/70" : "bg-white/80",
          )}
          style={{
            left: `${(i * 1.47) % 100}%`,
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            animationDuration: `${7 + (i % 6)}s`,
            animationDelay: `${(i % 8) * -0.9}s`,
            opacity: 0.5 + (i % 4) * 0.12,
          }}
        />
      ))}
    </>
  );
}

function Clouds({ day }: { day: boolean }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={cn(
            "scene-cloud pointer-events-none absolute",
            day ? "text-slate-400/80" : "text-white/25",
          )}
          style={{
            top: `${6 + i * 14}%`,
            width: 180 + i * 36,
            animationDuration: `${26 + i * 7}s`,
            animationDelay: `${i * -6}s`,
          }}
          viewBox="0 0 180 80"
          fill="currentColor"
          aria-hidden
        >
          <path d="M146 48c-3-14-16-24-30-24-6 0-11 1-16 4C92 12 76 2 58 2 32 2 12 22 12 46c0 1 0 2 0 3C6 54 2 61 2 70c0 14 11 24 25 24h114c10 0 18-8 18-17 0-11-5-21-13-29Z" />
        </svg>
      ))}
    </>
  );
}

function Summer({ day }: { day: boolean }) {
  return (
    <>
      <div
        className={cn(
          "scene-sun pointer-events-none absolute top-10 right-[12%] size-28 rounded-full blur-sm",
          day ? "bg-amber-400/80" : "bg-amber-500/35",
        )}
      />
      <div
        className={cn(
          "scene-haze pointer-events-none absolute inset-x-0 top-0 h-1/2",
          day ? "bg-gradient-to-b from-amber-200/40 to-transparent" : "bg-gradient-to-b from-orange-900/20 to-transparent",
        )}
      />
      <Clouds day={day} />
    </>
  );
}

function Autumn({ day }: { day: boolean }) {
  const colors = day
    ? ["#c2410c", "#b45309", "#ca8a04", "#9a3412"]
    : ["#fb923c", "#fbbf24", "#f97316", "#eab308"];
  return (
    <>
      {Array.from({ length: 36 }).map((_, i) => (
        <svg
          key={i}
          className="scene-leaf pointer-events-none absolute"
          style={{
            left: `${(i * 2.7) % 100}%`,
            width: 14 + (i % 5) * 3,
            color: colors[i % colors.length],
            animationDuration: `${8 + (i % 6)}s`,
            animationDelay: `${(i % 9) * -0.8}s`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2c4 4 8 8 8 13a8 8 0 1 1-16 0C4 10 8 6 12 2Zm0 7v12" />
        </svg>
      ))}
    </>
  );
}

function SceneLayer({ scene, day, reduce }: { scene: AtmosphereScene; day: boolean; reduce: boolean }) {
  if (reduce) {
    if (scene === "storm") return <Storm flash={false} day={day} />;
    return null;
  }
  switch (scene) {
    case "birds":
      return <Birds day={day} />;
    case "storm":
      return <Storm flash={!day} day={day} />;
    case "aurora":
      return day ? <Clouds day /> : <Aurora />;
    case "winter":
      return <Winter day={day} />;
    case "clouds":
      return <Clouds day={day} />;
    case "summer":
      return <Summer day={day} />;
    case "autumn":
      return <Autumn day={day} />;
    default:
      return null;
  }
}

export function Atmosphere() {
  const { activeScene } = useWeather();
  const { resolvedTheme } = useTheme();
  const day = resolvedTheme === "light";
  const reduce = useSyncExternalStore(
    (cb) => {
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
      rm.addEventListener("change", cb);
      return () => rm.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  return (
    <div
      data-atmosphere
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        day
          ? "bg-gradient-to-b from-sky-200 via-amber-50 to-[#f4f4f2]"
          : "bg-[#0a0a0a]",
      )}
    >
      <Grid />
      {activeScene ? <SceneLayer scene={activeScene} day={day} reduce={reduce} /> : null}
    </div>
  );
}
