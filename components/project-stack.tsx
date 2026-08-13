"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { TechPills } from "./glass-surface";

function firstSentence(text: string) {
  const i = text.search(/[.!?]/);
  return i === -1 ? text : text.slice(0, i + 1);
}

function bullets(project: Project) {
  return [project.problem, project.approach, project.outcome].map((text) => {
    const cut = firstSentence(text);
    return cut.length > 140 ? `${cut.slice(0, 137)}…` : cut;
  });
}

function StackMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaClass =
    "mt-8 h-56 w-full rounded-3xl border-2 border-white/20 object-cover lg:absolute lg:top-3 lg:mt-0 lg:mb-0 lg:h-full lg:w-auto lg:max-w-none lg:min-w-full";

  return (
    <div
      className="relative"
      onMouseEnter={() => videoRef.current?.play().catch(() => undefined)}
      onMouseLeave={() => {
        const el = videoRef.current;
        if (!el) return;
        el.pause();
        el.currentTime = 0;
      }}
    >
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className={mediaClass}
        />
      ) : (
        <div
          className={cn(mediaClass, "tape")}
          style={{
            backgroundImage: `linear-gradient(120deg, ${project.posterFrom} 0%, ${project.posterTo} 45%, #0a0a0a 100%)`,
          }}
        />
      )}
    </div>
  );
}

export function ProjectStack({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-10 flex flex-col gap-20 md:mt-20">
      {projects.map((project, index) => (
        <div
          key={project.slug}
          style={{ top: `calc(64px + ${index * 40}px)` }}
          onMouseMove={(e) => {
            const box = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - box.left) / box.width) * 100;
            const y = ((e.clientY - box.top) / box.height) * 100;
            e.currentTarget.style.setProperty("--gx", `${x}%`);
            e.currentTarget.style.setProperty("--gy", `${y}%`);
          }}
          className="group/stack sticky z-0 overflow-hidden rounded-3xl bg-panel px-8 pt-8 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-[''] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] md:px-10 md:pt-12 lg:px-20 lg:pt-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/stack:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), color-mix(in srgb, white 18%, transparent), transparent 42%)",
            }}
          />
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="lg:pb-16">
              <p className="font-mono text-[12px] font-bold tracking-widest text-cyan-400 uppercase">
                {project.stack.join(", ")}
              </p>
              <h3 className="font-display mt-2 text-2xl md:mt-5 md:text-4xl">{project.title}</h3>
              <hr className="mt-4 border-t-2 border-white/10 md:mt-5" />
              <p className="mt-3 text-sm text-muted">
                {project.year} · {firstSentence(project.outcome)}
              </p>
              <ul className="mt-4 flex flex-col gap-2 md:mt-5">
                {bullets(project).map((line) => (
                  <li key={line} className="flex gap-2 text-sm text-muted md:text-base">
                    <Check className="mt-0.5 size-5 shrink-0 text-cyan-400 md:size-6" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <TechPills tags={project.stack} />
              </div>
              <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-gray-950 md:w-auto"
                  >
                    Visit live
                    <ArrowUpRight className="size-5" />
                  </a>
                ) : null}
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-line px-6 text-sm font-medium"
                >
                  Case study
                </Link>
              </div>
            </div>
            <StackMedia project={project} />
          </div>
        </div>
      ))}
    </div>
  );
}
