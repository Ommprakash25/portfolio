"use client";

import Link from "next/link";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GlassSurface, TechPills } from "./glass-surface";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    videoRef.current?.play().catch(() => undefined);
  };
  const onLeave = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <GlassSurface
      className={cn(
        "h-full overflow-hidden rounded-xl border border-white/15 bg-panel/50 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/30",
        className,
      )}
    >
      <article className="group relative z-1 flex h-full flex-col" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <Link href={`/work/${project.slug}`} className="relative block overflow-hidden">
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className={cn("tape h-44 w-full", project.posterTone)}
              style={{
                backgroundImage: `linear-gradient(120deg, ${project.posterFrom} 0%, ${project.posterTo} 45%, #0a0a0a 100%)`,
              }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
        </Link>
        <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold">{project.title}</h3>
            {project.url ? <ExternalLink className="mt-1 size-3.5 text-muted opacity-0 group-hover:opacity-100" /> : null}
          </div>
          <p className="mt-1 font-mono text-[10px] tracking-wide text-muted uppercase">
            {project.stack.join(" · ")} · {project.year}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{project.outcome.split(/[.!?]/)[0]}.</p>
          <div className="mt-3">
            <TechPills tags={project.stack} />
          </div>
          <div className="mt-auto flex gap-2 pt-4">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-3 py-1 text-[10px] font-medium text-paper"
              >
                Website
              </a>
            ) : null}
            <Link
              href={`/work/${project.slug}`}
              className="rounded-full border border-line px-3 py-1 text-[10px] font-medium"
            >
              Case study
            </Link>
          </div>
        </div>
      </article>
    </GlassSurface>
  );
}
