"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Cloud,
  Copy,
  FileText,
  Folder,
  Gamepad2,
  Hammer,
  Home,
  MessageCircle,
  Moon,
  Newspaper,
  Search,
  Sun,
  Terminal,
} from "lucide-react";
import { site, socials } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useWeather } from "./providers";

type Item = {
  id: string;
  label: string;
  description: string;
  keywords: string[];
  group: "Pages" | "Social" | "Actions";
  icon: ReactNode;
  run: () => void;
};

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M6.94 8.5H3.75V20h3.19V8.5ZM5.34 3.5a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7ZM20.25 20h-3.18v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.45-2.16 2.96V20H9.87V8.5h3.05v1.57h.04c.42-.8 1.46-1.65 3.01-1.65 3.22 0 3.81 2.12 3.81 4.87V20Z"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.8 7.8L22.6 22h-6.5l-5.1-6.7L5.4 22H2.3l7.3-8.3L1.6 2h6.6l4.6 6.1L18.9 2Zm-1.1 18h1.8L6.4 3.9H4.5L17.8 20Z"
      />
    </svg>
  );
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { setSceneMode } = useWeather();
  const dark = resolvedTheme !== "light";

  const close = useCallback(() => {
    onOpenChange(false);
    setQ("");
    setSelected(0);
    setCopied(false);
  }, [onOpenChange]);

  const go = useCallback(
    (href: string) => {
      router.push(href);
      close();
    },
    [close, router],
  );

  const items: Item[] = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        description: "Go to homepage",
        keywords: ["home", "main"],
        group: "Pages",
        icon: <Home className="size-4" />,
        run: () => go("/"),
      },
      {
        id: "projects",
        label: "Projects",
        description: "View all projects",
        keywords: ["work", "projects", "portfolio"],
        group: "Pages",
        icon: <Folder className="size-4" />,
        run: () => go("/projects"),
      },
      {
        id: "blogs",
        label: "Blogs",
        description: "View all posts",
        keywords: ["writing", "blog", "posts", "blogs"],
        group: "Pages",
        icon: <Newspaper className="size-4" />,
        run: () => go("/blogs"),
      },
      {
        id: "games",
        label: "Games",
        description: "Play hosted games",
        keywords: ["games", "play"],
        group: "Pages",
        icon: <Gamepad2 className="size-4" />,
        run: () => go("/games"),
      },
      {
        id: "resume",
        label: "Resume",
        description: "Printable CV",
        keywords: ["resume", "cv"],
        group: "Pages",
        icon: <FileText className="size-4" />,
        run: () => go("/resume"),
      },
      {
        id: "building",
        label: "Building",
        description: "Changelog of shipped notes",
        keywords: ["building", "changelog"],
        group: "Pages",
        icon: <Hammer className="size-4" />,
        run: () => go("/building"),
      },
      {
        id: "cmd",
        label: "CMD",
        description: "Open the terminal page",
        keywords: ["cli", "cmd", "terminal", "omm"],
        group: "Pages",
        icon: <Terminal className="size-4" />,
        run: () => go("/cmd"),
      },
      {
        id: "github",
        label: "Open GitHub",
        description: "Visit GitHub profile",
        keywords: ["github", "open", "code"],
        group: "Social",
        icon: <GithubIcon className="size-4" />,
        run: () => {
          window.open(socials.github, "_blank", "noreferrer");
          close();
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        description: "Visit LinkedIn profile",
        keywords: ["linkedin", "open"],
        group: "Social",
        icon: <LinkedinIcon className="size-4" />,
        run: () => {
          window.open(socials.linkedin, "_blank", "noreferrer");
          close();
        },
      },
      {
        id: "x",
        label: "Open X",
        description: "Visit X profile",
        keywords: ["x", "twitter", "open"],
        group: "Social",
        icon: <XIcon className="size-4" />,
        run: () => {
          window.open(socials.x, "_blank", "noreferrer");
          close();
        },
      },
      {
        id: "discord",
        label: "Open Discord",
        description: "Visit Discord profile",
        keywords: ["discord", "open"],
        group: "Social",
        icon: <MessageCircle className="size-4" />,
        run: () => {
          window.open(socials.discord, "_blank", "noreferrer");
          close();
        },
      },
      {
        id: "theme",
        label: dark ? "Switch to Day" : "Switch to Night",
        description: dark ? "Light canvas" : "Near-black canvas",
        keywords: ["theme", "day", "night", "dark", "light"],
        group: "Actions",
        icon: dark ? <Sun className="size-4" /> : <Moon className="size-4" />,
        run: () => {
          setTheme(dark ? "light" : "dark");
          close();
        },
      },
      {
        id: "climate-live",
        label: "Climate Live",
        description: "IP weather drives the scene",
        keywords: ["weather", "climate", "live"],
        group: "Actions",
        icon: <Cloud className="size-4" />,
        run: () => {
          setSceneMode("live");
          close();
        },
      },
      {
        id: "climate-rain",
        label: "Rain",
        description: "Manual storm scene",
        keywords: ["rain", "storm", "climate"],
        group: "Actions",
        icon: <Cloud className="size-4" />,
        run: () => {
          setSceneMode("storm");
          close();
        },
      },
      {
        id: "climate-summer",
        label: "Summer",
        description: "Sun and haze",
        keywords: ["summer", "heat", "climate"],
        group: "Actions",
        icon: <Sun className="size-4" />,
        run: () => {
          setSceneMode("summer");
          close();
        },
      },
      {
        id: "climate-autumn",
        label: "Autumn",
        description: "Falling leaves",
        keywords: ["autumn", "fall", "climate"],
        group: "Actions",
        icon: <Cloud className="size-4" />,
        run: () => {
          setSceneMode("autumn");
          close();
        },
      },
      {
        id: "climate-winter",
        label: "Winter",
        description: "Snow drift",
        keywords: ["winter", "snow", "climate"],
        group: "Actions",
        icon: <Cloud className="size-4" />,
        run: () => {
          setSceneMode("winter");
          close();
        },
      },
      {
        id: "climate-off",
        label: "Climate Off",
        description: "Calm grid only",
        keywords: ["climate", "off"],
        group: "Actions",
        icon: <Cloud className="size-4" />,
        run: () => {
          setSceneMode("off");
          close();
        },
      },
      {
        id: "email",
        label: copied ? "Copied" : "Copy email",
        description: site.email,
        keywords: ["copy", "email", "contact"],
        group: "Actions",
        icon: <Copy className="size-4" />,
        run: () => {
          void navigator.clipboard.writeText(site.email).then(() => {
            setCopied(true);
            window.setTimeout(() => close(), 700);
          });
        },
      },
    ],
    [close, copied, dark, go, setTheme, setSceneMode],
  );

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return items;
    return items.filter((i) => {
      const hay = `${i.label} ${i.description} ${i.keywords.join(" ")}`.toLowerCase();
      return hay.includes(s);
    });
  }, [items, q]);

  const grouped = useMemo(() => {
    const order: Item["group"][] = ["Pages", "Social", "Actions"];
    return order
      .map((group) => ({ group, cmds: filtered.filter((i) => i.group === group) }))
      .filter((g) => g.cmds.length > 0);
  }, [filtered]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((prev) => Math.min(prev + 1, Math.max(0, filtered.length - 1)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[selected]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, filtered, open, selected]);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  if (!open) return null;

  let index = 0;

  return (
    <div
      data-palette
      className="print:hidden fixed inset-0 z-[70] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#141414] text-[#f4f4f4] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-3">
          <Search className="size-4 shrink-0 opacity-50" />
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSelected(0);
            }}
            placeholder="Type a command or search…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-500">No results found.</p>
          ) : (
            grouped.map(({ group, cmds }) => (
              <div key={group} className="mb-2">
                <p className="px-3 py-1.5 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">
                  {group}
                </p>
                {cmds.map((cmd) => {
                  const current = index;
                  const isSelected = current === selected;
                  index += 1;
                  return (
                    <button
                      key={cmd.id}
                      ref={isSelected ? selectedRef : undefined}
                      type="button"
                      onMouseEnter={() => setSelected(current)}
                      onClick={cmd.run}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm",
                        isSelected ? "bg-white/10" : "hover:bg-white/5",
                      )}
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center text-zinc-400">
                        {cmd.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{cmd.label}</span>
                        <span className="block truncate text-xs text-zinc-500">{cmd.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-3 py-2 text-[11px] text-zinc-500">
          <p className="flex gap-4">
            <span>
              <kbd className="rounded border border-white/15 px-1.5 font-mono">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="rounded border border-white/15 px-1.5 font-mono">↵</kbd> select
            </span>
          </p>
          <span>
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </span>
        </div>
      </div>
    </div>
  );
}
