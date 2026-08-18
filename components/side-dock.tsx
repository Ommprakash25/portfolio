"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import { Folder, Gamepad2, Home, Newspaper, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Filters } from "./filters";

const items = [
  { href: "/", label: "Home", icon: Home, section: "home" },
  { href: "/projects", label: "Projects", icon: Folder, section: "projects" },
  { href: "/blogs", label: "Blogs", icon: Newspaper, section: "blogs" },
  { href: "/games", label: "Games", icon: Gamepad2, section: "games" },
  { href: "/cmd", label: "CMD", icon: Terminal, section: null },
] as const;

const SLOT = 36;
const PAD = 6;
const BLOB = 32;
const INSET = 2;

function blobPos(index: number) {
  return PAD + index * SLOT + INSET;
}

function indexFromPath(path: string) {
  if (path.startsWith("/projects")) return 1;
  if (path.startsWith("/blogs")) return 2;
  if (path.startsWith("/games")) return 3;
  if (path.startsWith("/cmd")) return 4;
  return 0;
}

function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return desktop;
}

export function SideDock() {
  const path = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const desktop = useDesktop();
  const mouse = useMotionValue(Infinity);
  const [active, setActive] = useState(() => indexFromPath(path));
  const [hot, setHot] = useState(-1);
  const [gooey, setGooey] = useState(false);
  const along = useMotionValue(blobPos(indexFromPath(path)));
  const thick = useMotionValue(BLOB);
  const squash = useMotionValue(1);
  const flowGen = useRef(0);
  const spyLock = useRef(false);
  const spyLockTimer = useRef<number>(0);
  const desktopRef = useRef(desktop);
  desktopRef.current = desktop;

  const flowTo = async (from: number, to: number) => {
    const id = ++flowGen.current;
    const a = blobPos(from);
    const b = blobPos(to);
    const start = Math.min(a, b);
    const size = Math.abs(b - a) + BLOB;
    setGooey(true);
    await Promise.all([
      animate(along, start, { duration: 0.18, ease: [0.33, 1, 0.68, 1] }),
      animate(thick, size, { duration: 0.18, ease: [0.33, 1, 0.68, 1] }),
      animate(squash, 0.78, { duration: 0.18, ease: [0.33, 1, 0.68, 1] }),
    ]);
    if (id !== flowGen.current) return;
    await Promise.all([
      animate(along, b, { duration: 0.34, ease: [0.22, 1, 0.36, 1] }),
      animate(thick, BLOB, { duration: 0.34, ease: [0.22, 1, 0.36, 1] }),
      animate(squash, 1, { duration: 0.34, ease: [0.22, 1, 0.36, 1] }),
    ]);
    if (id !== flowGen.current) return;
    setGooey(false);
  };

  const lockSpy = (ms = 1100) => {
    spyLock.current = true;
    window.clearTimeout(spyLockTimer.current);
    spyLockTimer.current = window.setTimeout(() => {
      spyLock.current = false;
    }, ms);
  };

  const scrollPage = (href: (typeof items)[number]["href"], section: string | null) => {
    if (href === "/cmd") {
      router.push("/cmd");
      return;
    }
    if (path === "/") {
      if (href === "/" || section === "home") {
        lenis?.scrollTo(0, { duration: 1.05 });
        return;
      }
      const el = section ? document.getElementById(section) : null;
      if (el) {
        lenis?.scrollTo(el, { offset: -20, duration: 1.05 });
        return;
      }
    }
    if (path !== href) router.push(href);
    lenis?.scrollTo(0, { duration: 0.85 });
  };

  const select = (index: number, href: (typeof items)[number]["href"], section: string | null) => {
    lockSpy();
    if (index !== active) void flowTo(active, index);
    setActive(index);
    scrollPage(href, section);
  };

  useEffect(() => {
    const next = indexFromPath(path);
    setActive(next);
    if (spyLock.current) return;
    along.set(blobPos(next));
    thick.set(BLOB);
    squash.set(1);
    setGooey(false);
  }, [path, along, thick, squash]);

  useEffect(() => {
    along.set(blobPos(active));
    thick.set(BLOB);
    squash.set(1);
    setGooey(false);
    // Only re-snap when the layout axis flips (mobile ↔ desktop).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desktop]);

  useEffect(() => {
    if (path !== "/") return;
    const nodes = items
      .map((item) => (item.section ? document.getElementById(item.section) : null))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;
    const onScroll = () => {
      if (spyLock.current) return;
      const mid = window.innerHeight * 0.35;
      let next = 0;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].getBoundingClientRect().top <= mid) next = i;
      }
      setActive((prev) => {
        if (prev === next) return prev;
        queueMicrotask(() => {
          void flowTo(prev, next);
        });
        return next;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  if (path === "/cmd") return null;

  return (
    <aside
      data-dock
      className="print:hidden pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:top-1/2 md:right-3 md:bottom-auto md:left-auto md:-translate-y-1/2 md:translate-x-0"
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <filter id="dock-goo" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
        </filter>
      </svg>
      <div
        className="dock-glass pointer-events-auto relative flex h-12 w-max flex-row items-end overflow-visible px-1.5 py-1.5 md:h-auto md:w-12 md:flex-col md:items-center"
        onMouseMove={(e) => {
          mouse.set(desktopRef.current ? e.clientY : e.clientX);
          const list = e.currentTarget.querySelectorAll<HTMLElement>("[data-dock-item]");
          let best = -1;
          let bestDist = Infinity;
          list.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const d = desktopRef.current
              ? Math.abs(e.clientY - (r.top + r.height / 2))
              : Math.abs(e.clientX - (r.left + r.width / 2));
            if (d < bestDist) {
              bestDist = d;
              best = i;
            }
          });
          setHot(bestDist < 22 ? best : -1);
        }}
        onMouseLeave={() => {
          mouse.set(Infinity);
          setHot(-1);
        }}
      >
        <div className={cn("dock-blob-layer pointer-events-none", gooey && "dock-goo")}>
          <motion.div
            className="absolute rounded-full bg-[#2563eb]"
            style={
              desktop
                ? { top: along, height: thick, width: BLOB, left: 0, right: 0, marginInline: "auto", scaleX: squash }
                : { left: along, width: thick, height: BLOB, top: 0, bottom: 0, marginBlock: "auto", scaleY: squash }
            }
          />
        </div>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <DockIcon
              key={item.href}
              mouse={mouse}
              desktop={desktop}
              href={item.href}
              label={item.label}
              active={active === i}
              showTip={hot === i}
              onSelect={(e) => {
                if (item.href === "/cmd") return;
                e.preventDefault();
                select(i, item.href, item.section);
              }}
            >
              <Icon className="block size-4" strokeWidth={1.75} />
            </DockIcon>
          );
        })}
        <span aria-hidden className="mx-1 mb-2 h-5 w-px shrink-0 bg-white/20 md:mx-0 md:my-1.5 md:h-px md:w-5" />
        <Filters />
      </div>
    </aside>
  );
}

function DockIcon({
  mouse,
  desktop,
  href,
  label,
  active,
  showTip,
  onSelect,
  children,
}: {
  mouse: MotionValue<number>;
  desktop: boolean;
  href: string;
  label: string;
  active: boolean;
  showTip: boolean;
  onSelect: (e: MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scaleSync = useTransform(mouse, (val) => {
    const node = ref.current;
    if (!node || !Number.isFinite(val)) return 1;
    const bounds = node.getBoundingClientRect();
    const d = desktop
      ? Math.abs(val - (bounds.top + bounds.height / 2))
      : Math.abs(val - (bounds.left + bounds.width / 2));
    if (d >= 72) return 1;
    const t = 1 - d / 72;
    return 1 + 0.22 * (0.5 - 0.5 * Math.cos(Math.PI * t));
  });
  const scale = useSpring(scaleSync, { mass: 0.12, stiffness: 260, damping: 18 });

  return (
    <motion.div
      ref={ref}
      data-dock-item
      style={{ scale }}
      className="relative z-10 flex size-9 items-center justify-center"
    >
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        onClick={onSelect}
        className={cn(
          "relative flex size-8 items-center justify-center rounded-full",
          active ? "text-white" : "text-ink/70 hover:text-ink dark:text-white/80 dark:hover:text-white",
        )}
      >
        {children}
      </Link>
      {showTip ? (
        <motion.span
          initial={{ opacity: 0, y: desktop ? "-50%" : 6, x: desktop ? 6 : "-50%" }}
          animate={{ opacity: 1, y: desktop ? "-50%" : 0, x: desktop ? 0 : "-50%" }}
          transition={{ duration: 0.14 }}
          className="pointer-events-none absolute z-30 rounded-md bg-neutral-950 px-2 py-0.5 text-[11px] font-medium text-white whitespace-nowrap shadow-lg max-md:-top-9 max-md:left-1/2 md:top-1/2 md:right-full md:mr-2.5"
        >
          {label}
        </motion.span>
      ) : null}
    </motion.div>
  );
}
