"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function GlassSurface({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    ref.current?.style.setProperty("--gx", `${x}%`);
    ref.current?.style.setProperty("--gy", `${y}%`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={cn("glass-glaze", className)} style={style}>
      {children}
    </div>
  );
}

export function TechPills({ tags }: { tags: string[] }) {
  const [hot, setHot] = useState<string | null>(null);

  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const active = hot === tag;
        const dim = hot !== null && !active;
        return (
          <li key={tag}>
            <span
              onMouseEnter={() => setHot(tag)}
              onMouseLeave={() => setHot(null)}
              className={cn(
                "inline-block cursor-default rounded-full border border-line/80 bg-paper/40 px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted uppercase transition",
                active &&
                  "border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.45)]",
                dim && "opacity-40",
              )}
            >
              {tag}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
