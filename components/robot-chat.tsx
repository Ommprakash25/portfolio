"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { answerChat, chatStarters } from "@/lib/chat";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

function RobotDefs() {
  return (
    <defs>
      <linearGradient id="rb-helm" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="42%" stopColor="#f3f6fa" />
        <stop offset="100%" stopColor="#c5ced8" />
      </linearGradient>
      <radialGradient id="rb-spec" cx="32%" cy="26%" r="55%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#ffffff" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="rb-visor" x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0%" stopColor="#243044" />
        <stop offset="35%" stopColor="#05070c" />
        <stop offset="100%" stopColor="#102028" />
      </linearGradient>
      <linearGradient id="rb-visor-glow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5eead4" stopOpacity="0" />
        <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="rb-teal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#99f6e4" />
        <stop offset="45%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0f766e" />
      </linearGradient>
      <radialGradient id="rb-bead" cx="34%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="62%" stopColor="#e8eef4" />
        <stop offset="100%" stopColor="#9aa8b4" />
      </radialGradient>
      <linearGradient id="rb-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#d5dee6" />
      </linearGradient>
      <filter id="rb-shadow" x="-30%" y="-20%" width="160%" height="160%">
        <feDropShadow dx="0" dy="10" stdDeviation="8" floodOpacity="0.28" />
      </filter>
    </defs>
  );
}

function Ear({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" fill="url(#rb-teal)" />
      <circle cx={cx} cy={cy} r="6.5" fill="#0f766e" />
      <circle cx={cx - 2} cy={cy - 2} r="2.2" fill="#ccfbf1" opacity="0.7" />
    </g>
  );
}

function BeadHand({
  x,
  y,
  rotate = 0,
}: {
  x: number;
  y: number;
  rotate?: number;
}) {
  const fingers = [
    { dx: -7, dy: -10 },
    { dx: 1, dy: -13 },
    { dx: 9, dy: -10 },
    { dx: 14, dy: -3 },
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <circle cx="4" cy="4" r="7" fill="url(#rb-teal)" />
      <circle cx="4" cy="4" r="4.2" fill="url(#rb-body)" />
      {fingers.map((f, i) => (
        <g key={i}>
          <circle cx={f.dx} cy={f.dy} r="3.2" fill="url(#rb-teal)" />
          <circle cx={f.dx} cy={f.dy - 0.4} r="4.4" fill="url(#rb-bead)" />
        </g>
      ))}
    </g>
  );
}

function Head({ cx, cy, look = 0 }: { cx: number; cy: number; look?: number }) {
  return (
    <g className="robot-head" style={{ transformOrigin: `${cx}px ${cy}px` }} transform={`rotate(${look} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy + 2} rx={38} ry={34} fill="url(#rb-helm)" />
      <ellipse cx={cx} cy={cy} rx={36} ry={32} fill="url(#rb-helm)" />
      <Ear cx={cx - 34} cy={cy + 2} />
      <Ear cx={cx + 34} cy={cy + 2} />
      <rect x={cx - 26} y={cy - 6} width={52} height={18} rx={9} fill="url(#rb-visor)" />
      <rect x={cx - 22} y={cy - 2} width={44} height={4} rx={2} fill="url(#rb-visor-glow)" />
      <ellipse cx={cx - 10} cy={cy + 2} rx={5} ry={3} fill="#5eead4" opacity={0.35} />
      <ellipse cx={cx - 8} cy={cy - 16} rx={16} ry={10} fill="url(#rb-spec)" />
      <ellipse cx={cx + 14} cy={cy - 10} rx={6} ry={3.5} fill="#ffffff" opacity={0.45} />
    </g>
  );
}

function PeekRobot() {
  return (
    <svg viewBox="0 0 168 210" className="h-[11.5rem] w-[9rem] overflow-visible" aria-hidden>
      <RobotDefs />
      <g filter="url(#rb-shadow)">
        <rect x="118" y="78" width="44" height="58" rx="16" fill="url(#rb-body)" />
        <circle cx="128" cy="92" r="6" fill="url(#rb-teal)" />
        <circle cx="148" cy="118" r="6" fill="url(#rb-teal)" />
        <Head cx={78} cy={78} look={-6} />
        <BeadHand x={18} y={64} rotate={-18} />
        <BeadHand x={22} y={118} rotate={12} />
      </g>
    </svg>
  );
}

function SitRobot() {
  return (
    <svg viewBox="0 0 150 188" className="h-[9.5rem] w-[7.75rem] overflow-visible" aria-hidden>
      <RobotDefs />
      <g filter="url(#rb-shadow)">
        <ellipse cx="54" cy="168" rx="16" ry="10" fill="url(#rb-body)" />
        <ellipse cx="96" cy="168" rx="16" ry="10" fill="url(#rb-body)" />
        <circle cx="54" cy="160" r="6" fill="url(#rb-teal)" />
        <circle cx="96" cy="160" r="6" fill="url(#rb-teal)" />
        <rect x="48" y="108" width="54" height="48" rx="16" fill="url(#rb-body)" />
        <rect x="58" y="118" width="34" height="18" rx="8" fill="#e8eef4" />
        <circle cx="42" cy="122" r="6" fill="url(#rb-teal)" />
        <circle cx="108" cy="122" r="6" fill="url(#rb-teal)" />
        <Head cx={75} cy={72} />
        <BeadHand x={28} y={138} rotate={-28} />
        <BeadHand x={108} y={138} rotate={24} />
      </g>
    </svg>
  );
}

export function RobotChat() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"peek" | "sit">(reduce ? "sit" : "peek");
  const [open, setOpen] = useState(false);
  const [hello, setHello] = useState(false);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<{ from: "bot" | "you"; text: string }[]>([
    { from: "bot", text: `Hi — I’m a local FAQ for ${site.name}. Ask about skills, projects, experience, or contact.` },
  ]);

  useEffect(() => {
    if (reduce) {
      setPhase("sit");
      return;
    }
    const show = window.setTimeout(() => setPhase("sit"), 2600);
    return () => window.clearTimeout(show);
  }, [reduce]);

  useEffect(() => {
    if (phase !== "sit" || open) {
      setHello(false);
      return;
    }
    const t = window.setTimeout(() => setHello(true), 450);
    return () => window.clearTimeout(t);
  }, [phase, open]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text) return;
    setLog((rows) => [...rows, { from: "you", text }, { from: "bot", text: answerChat(text) }]);
    setInput("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const reveal = () => {
    setPhase("sit");
    setOpen(true);
  };

  return (
    <motion.div
      data-robot
      className={cn(
        "fixed z-40",
        phase === "peek" ? "right-0 bottom-[22%]" : "right-5 bottom-5 md:right-6",
      )}
      initial={reduce ? false : { x: "80%" }}
      animate={{ x: phase === "peek" ? "36%" : 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      onMouseEnter={() => {
        if (!reduce && phase === "peek") setPhase("sit");
      }}
    >
      {open ? (
        <div className="mb-3 ml-auto w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line/80 bg-panel/95 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-line/70 px-3 py-2">
            <p className="text-sm font-medium">Ask {site.name}</p>
            <button type="button" className="text-xs text-muted" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto px-3 py-3 text-sm">
            {log.map((row, i) => (
              <p key={`${row.from}-${i}`} className={row.from === "you" ? "text-right text-muted" : ""}>
                {row.text}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 px-3 pb-2">
            {chatStarters.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted hover:text-ink"
              >
                {q}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="border-t border-line/70 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              className="w-full rounded-lg bg-paper/60 px-2 py-1.5 text-sm outline-none"
            />
          </form>
        </div>
      ) : hello ? (
        <p className="mb-1 ml-auto w-max rounded-full border border-line bg-panel/90 px-3 py-1 text-xs shadow-md">
          Hello
        </p>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-label={phase === "peek" ? "Robot peeking — open FAQ" : "Open FAQ robot"}
        onClick={reveal}
        className="robot-3d block origin-bottom-right"
      >
        <span className={cn("block", phase === "sit" && !reduce && !open && "robot-jump")}>
          {phase === "peek" ? <PeekRobot /> : <SitRobot />}
        </span>
      </button>
    </motion.div>
  );
}
