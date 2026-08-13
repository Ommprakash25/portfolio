"use client";

import { useEffect, useRef } from "react";
import type { AtmosphereScene } from "@/lib/climate";
import { useWeather } from "./providers";

function Glyph({ scene }: { scene: AtmosphereScene | null }) {
  if (scene === "winter") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <circle cx="11" cy="11" r="7" fill="#e8f1f8" stroke="#9ab0c4" strokeWidth="1.2" />
        <circle cx="8" cy="9" r="1.2" fill="#c5d5e4" />
      </svg>
    );
  }
  if (scene === "autumn") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <path d="M11 3c3 3 6 6 6 10a6 6 0 1 1-12 0C5 9 8 6 11 3Z" fill="#c2410c" />
        <path d="M11 8v10" stroke="#7c2d12" strokeWidth="1.2" />
      </svg>
    );
  }
  if (scene === "summer") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <circle cx="11" cy="11" r="5" fill="#f59e0b" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={11 + Math.cos(a) * 7}
              y1={11 + Math.sin(a) * 7}
              x2={11 + Math.cos(a) * 10}
              y2={11 + Math.sin(a) * 10}
              stroke="#d97706"
              strokeWidth="1.4"
            />
          );
        })}
      </svg>
    );
  }
  if (scene === "storm") {
    return (
      <svg width="18" height="22" viewBox="0 0 18 22" aria-hidden>
        <path d="M9 2C5 8 4 12 9 20c5-8 4-12 0-18Z" fill="#38bdf8" />
      </svg>
    );
  }
  if (scene === "birds") {
    return (
      <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden>
        <path d="M1 9 C6 2 9 2 11 9 C13 2 16 2 21 9 C16 8 13 11 11 11 C9 11 6 8 1 9Z" fill="#3d6b4a" />
      </svg>
    );
  }
  if (scene === "clouds") {
    return (
      <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden>
        <path d="M19 10c-.4-2.2-2.2-4-4.4-4-.8 0-1.6.2-2.3.6C11 3.6 8.6 2 5.8 2 2.6 2 .5 4.4.5 7.4.2 8.3 0 9.3 0 10.4 0 13 2 15 4.6 15h14C20.6 15 22 13.6 22 12s-1.2-2.5-3-2Z" fill="#94a3b8" />
      </svg>
    );
  }
  if (scene === "aurora") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path d="M14 13a6.5 6.5 0 1 1-7.6-9.4A7 7 0 0 0 14 13Z" fill="#c4b5fd" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="3" fill="none" stroke="var(--cursor)" strokeWidth="1.2" />
    </svg>
  );
}

export function EditorialCursor() {
  const { activeScene } = useWeather();
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("cursor-none");
    document.body.style.cursor = "none";

    let x = 0;
    let y = 0;
    let tight = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      tight = Boolean(t?.closest("a, button, [role='button']"));
    };

    const loop = () => {
      if (mark.current) {
        const s = tight ? 1.28 : 1;
        mark.current.style.transform = `translate(${x - 11}px, ${y - 11}px) scale(${s})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.body.style.cursor = "";
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  return (
    <div data-cursor className="pointer-events-none fixed inset-0 z-[60] hidden print:hidden md:block">
      <div ref={mark} className="absolute drop-shadow-sm">
        <Glyph scene={activeScene} />
      </div>
    </div>
  );
}
