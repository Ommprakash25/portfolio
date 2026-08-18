"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  Check,
  CloudOff,
  CloudRain,
  CloudSun,
  Leaf,
  Moon,
  Snowflake,
  Sun,
} from "lucide-react";
import { MANUAL_SCENES, type SceneMode } from "@/lib/climate";
import { cn } from "@/lib/utils";
import { useWeather } from "./providers";

function modeLabel(mode: SceneMode, liveText: string | null) {
  if (mode === "live") return liveText ?? "Live";
  if (mode === "off") return "Climate";
  if (mode === "storm") return "Rain";
  if (mode === "summer") return "Summer";
  if (mode === "autumn") return "Autumn";
  if (mode === "winter") return "Winter";
  return "Climate";
}

function WeatherIcon({ mode }: { mode: SceneMode }) {
  const cls = "block size-4";
  if (mode === "storm") return <CloudRain className={cls} strokeWidth={1.7} />;
  if (mode === "summer") return <Sun className={cls} strokeWidth={1.7} />;
  if (mode === "autumn") return <Leaf className={cls} strokeWidth={1.7} />;
  if (mode === "winter") return <Snowflake className={cls} strokeWidth={1.7} />;
  if (mode === "off") return <CloudOff className={cls} strokeWidth={1.7} />;
  return <CloudSun className={cls} strokeWidth={1.7} />;
}

export function Filters() {
  const { resolvedTheme, setTheme } = useTheme();
  const { sceneMode, setSceneMode, climate } = useWeather();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const dark = resolvedTheme !== "light";
  const liveText = climate ? `${climate.city} · ${climate.condition}` : null;

  useEffect(() => {
    setOpen(false);
  }, [resolvedTheme]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const options: Array<{ id: SceneMode; label: string }> = [
    { id: "live", label: liveText ?? "Live" },
    ...MANUAL_SCENES,
  ];

  return (
    <div ref={wrap} className="relative z-10 flex flex-row items-center gap-1 md:flex-col">
      <button
        type="button"
        title={modeLabel(sceneMode, liveText)}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex size-8 items-center justify-center rounded-full",
          sceneMode !== "off"
            ? "bg-[#2563eb] text-white"
            : "text-ink/70 hover:text-ink dark:text-white/80 dark:hover:text-white",
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Climate scene"
      >
        <WeatherIcon mode={sceneMode} />
      </button>
      <button
        type="button"
        title={dark ? "Day" : "Night"}
        onClick={() => setTheme(dark ? "light" : "dark")}
        className="flex size-8 items-center justify-center rounded-full text-ink/70 hover:text-ink dark:text-white/80 dark:hover:text-white"
        aria-label="Toggle day and night"
      >
        {dark ? <Moon className="size-4" strokeWidth={1.7} /> : <Sun className="size-4" strokeWidth={1.7} />}
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute bottom-full left-1/2 z-50 mb-3 w-40 -translate-x-1/2 rounded-xl border border-white/15 bg-neutral-950/95 py-1 text-[11px] text-white shadow-xl backdrop-blur-md md:top-auto md:right-full md:bottom-0 md:left-auto md:mb-0 md:mr-3 md:translate-x-0"
        >
          {options.map((opt) => (
            <li key={opt.id} role="option" aria-selected={sceneMode === opt.id}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between px-3 py-1.5 text-left text-white/80 hover:bg-white/10 hover:text-white",
                  sceneMode === opt.id && "bg-[#2563eb] text-white hover:bg-[#2563eb] hover:text-white",
                )}
                onClick={() => {
                  setSceneMode(opt.id);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {sceneMode === opt.id ? <Check className="size-3.5" strokeWidth={2.2} /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
