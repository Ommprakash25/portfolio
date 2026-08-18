"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { experience, projects, site, socials, tech } from "@/lib/content";
import { useWeather } from "@/components/providers";

const ASCII = `
 ██████╗ ███╗   ███╗███╗   ███╗
██╔═══██╗████╗ ████║████╗ ████║
██║   ██║██╔████╔██║██╔████╔██║
██║   ██║██║╚██╔╝██║██║╚██╔╝██║
╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝
`;

const HELP = `commands
  help              this list
  about             whoami
  projects          list work
  skills            tech
  exp               experience
  social            links
  open <route>      blogs | projects | games | resume | building | home
  day | night
  weather live|off|rain|summer|autumn|winter
  gui               leave the terminal
  clear
`;

export default function CliPage() {
  const [lines, setLines] = useState<string[]>([
    "Welcome to OMM CLI.",
    "Type 'help' or '?' for commands.",
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const histIdx = useRef(-1);
  const bottom = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme } = useTheme();
  const { setSceneMode } = useWeather();

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      const out: string[] = [`dev@omm:~$ ${raw}`];
      if (!cmd || cmd === "help" || cmd === "?") out.push(HELP);
      else if (cmd === "about" || cmd === "whoami") {
        out.push(`${site.name} · ${site.role} · ${site.location}`);
        out.push(site.tagline);
      } else if (cmd === "projects") {
        projects.forEach((p) => out.push(`${p.title}  (${p.year})  ${p.stack.join(", ")}`));
      } else if (cmd === "skills") out.push(tech.join(", "));
      else if (cmd === "exp") {
        experience.forEach((e) => out.push(`${e.period}  ${e.role} @ ${e.org}`));
      } else if (cmd === "social") {
        out.push(`github   ${socials.github}`);
        out.push(`linkedin ${socials.linkedin}`);
        out.push(`x        ${socials.x}`);
        out.push(`discord  ${socials.discord}`);
        out.push(`email    ${site.email}`);
      } else if (cmd === "day") {
        setTheme("light");
        out.push("day");
      } else if (cmd === "night") {
        setTheme("dark");
        out.push("night");
      } else if (cmd === "weather live" || cmd === "weather on") {
        setSceneMode("live");
        out.push("climate live");
      } else if (cmd === "weather off") {
        setSceneMode("off");
        out.push("climate off");
      } else if (cmd === "weather rain") {
        setSceneMode("storm");
        out.push("rain");
      } else if (cmd === "weather summer") {
        setSceneMode("summer");
        out.push("summer");
      } else if (cmd === "weather autumn") {
        setSceneMode("autumn");
        out.push("autumn");
      } else if (cmd === "weather winter") {
        setSceneMode("winter");
        out.push("winter");
      } else if (cmd === "gui" || cmd === "exit") {
        router.push("/");
        return;
      } else if (cmd === "clear") {
        setLines([]);
        return;
      } else if (cmd.startsWith("open ")) {
        const dest = cmd.slice(5).trim();
        const map: Record<string, string> = {
          projects: "/projects",
          blogs: "/blogs",
          games: "/games",
          resume: "/resume",
          building: "/building",
          home: "/",
        };
        if (map[dest]) {
          router.push(map[dest]);
          return;
        }
        out.push("unknown route");
      } else out.push("not found — try help");
      setLines((prev) => [...prev, ...out]);
    },
    [router, setTheme, setSceneMode],
  );

  return (
    <main className="cli-root flex min-h-screen flex-col bg-black px-4 py-6 font-mono text-sm text-zinc-200">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white">
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>
      <pre className="overflow-x-auto text-[10px] leading-tight text-white md:text-xs">{ASCII}</pre>
      <div className="mt-6 flex-1 space-y-1 whitespace-pre-wrap">
        {lines.map((l, i) => (
          <p key={`${i}-${l.slice(0, 12)}`} className="text-zinc-400">
            {l}
          </p>
        ))}
        <form
          className="flex gap-2 pt-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) setHistory((h) => [...h, input]);
            histIdx.current = -1;
            run(input);
            setInput("");
          }}
        >
          <span className="text-fuchsia-400">dev@omm</span>
          <span className="text-zinc-500">:~$</span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const next = history.length + histIdx.current - 1;
                if (next >= 0) {
                  histIdx.current -= 1;
                  setInput(history[history.length + histIdx.current] ?? "");
                }
              }
            }}
            className="flex-1 bg-transparent text-white outline-none"
            aria-label="CLI"
          />
        </form>
        <div ref={bottom} />
      </div>
    </main>
  );
}
