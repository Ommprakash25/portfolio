"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
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

export function Filters() {
  const { resolvedTheme, setTheme } = useTheme();
  const { sceneMode, setSceneMode, climate } = useWeather();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const dark = resolvedTheme !== "light";
  const liveText = climate ? `${climate.city} · ${climate.condition}` : null;

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
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setTheme(dark ? "light" : "dark")}
        className={cn(
          "rounded-lg px-2.5 py-1.5 text-[11px] font-medium tracking-wide",
          "border border-line/70 bg-panel/50 text-muted backdrop-blur-md hover:text-ink",
        )}
        aria-label="Toggle day and night"
      >
        {dark ? "Night" : "Day"}
      </button>
      <div ref={wrap} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "max-w-[11rem] truncate rounded-lg px-2.5 py-1.5 text-[11px] font-medium tracking-wide",
            "border border-line/70 bg-panel/50 text-muted backdrop-blur-md hover:text-ink",
            sceneMode !== "off" && "text-ink",
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label="Climate scene"
        >
          {modeLabel(sceneMode, liveText)}
        </button>
        {open ? (
          <ul
            role="listbox"
            className="absolute right-0 mt-1 min-w-[9.5rem] overflow-hidden rounded-lg border border-line/70 bg-panel/95 py-1 text-[11px] shadow-lg backdrop-blur-md"
          >
            {options.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  className={cn(
                    "w-full px-3 py-1.5 text-left hover:bg-paper/80",
                    sceneMode === opt.id && "text-[#2563eb]",
                  )}
                  onClick={() => {
                    setSceneMode(opt.id);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
