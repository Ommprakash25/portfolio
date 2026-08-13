"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import {
  Folder,
  Gamepad2,
  Home,
  Moon,
  Newspaper,
  ShoppingBag,
  Sun,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/writing", label: "Writing", icon: Newspaper },
  { href: "/work", label: "Work", icon: Folder },
  { href: "/kit", label: "Kit", icon: ShoppingBag },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/cli", label: "CLI", icon: Terminal },
] as const;

const SLOT = 42;

export function SideDock() {
  const path = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mouseY = useMotionValue(Infinity);
  if (path === "/cli") return null;
  const dark = resolvedTheme !== "light";

  return (
    <aside
      data-dock
      className="print:hidden pointer-events-none fixed top-1/2 right-3 z-50 hidden -translate-y-1/2 md:block"
    >
      <div
        className="pointer-events-auto flex flex-col items-center rounded-full border border-line/80 bg-panel/55 px-1.5 py-2 shadow-lg backdrop-blur-xl"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseY.set(e.clientY - rect.top);
        }}
        onMouseLeave={() => mouseY.set(Infinity)}
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
          return (
            <DockIcon key={item.href} index={i} mouseY={mouseY} href={item.href} label={item.label} active={active}>
              <Icon className="size-4" />
            </DockIcon>
          );
        })}
        <button
          type="button"
          title={dark ? "Day" : "Night"}
          aria-label="Toggle day and night"
          className="mt-0.5 flex size-10 items-center justify-center rounded-full text-muted hover:text-ink"
          onClick={() => setTheme(dark ? "light" : "dark")}
        >
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>
      </div>
    </aside>
  );
}

function DockIcon({
  index,
  mouseY,
  href,
  label,
  active,
  children,
}: {
  index: number;
  mouseY: MotionValue<number>;
  href: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  const distance = useTransform(mouseY, (y) => y - (8 + index * SLOT + SLOT / 2));
  const scale = useTransform(distance, [-90, 0, 90], [1, 1.35, 1]);

  return (
    <motion.div style={{ scale }} className="relative flex size-10 items-center justify-center">
      <Link
        href={href}
        title={label}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex size-9 items-center justify-center rounded-full transition-colors",
          active ? "bg-[#2563eb] text-white" : "text-muted hover:text-ink",
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
