"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Terminal } from "lucide-react";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Filters } from "./filters";

export function SiteNav() {
  const path = usePathname();
  if (path === "/cli") return null;

  return (
    <nav data-chrome className="print:hidden pointer-events-none fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href="/"
          aria-label="Home"
          className="pointer-events-auto rounded-lg p-2 text-muted transition-colors hover:bg-panel hover:text-ink"
        >
          <Home className="size-5" />
        </Link>

        <div className="pointer-events-auto hidden items-center gap-2 md:flex">
          <div className="relative flex items-center rounded-xl border border-line/70 bg-panel/50 p-0.5 backdrop-blur-md">
            {nav.map((item) => {
              const active = path === item.href || path.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-[10px] px-3 py-1.5 text-[13px] font-medium transition-colors",
                    active ? "bg-[#2563eb] text-white shadow-sm" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Link
            href="/cli"
            aria-label="Open CLI"
            className="rounded-lg p-2 text-muted hover:bg-panel hover:text-ink"
          >
            <Terminal className="size-4" />
          </Link>
          <Filters />
        </div>
        <div className="pointer-events-auto md:hidden">
          <Filters />
        </div>
      </div>
    </nav>
  );
}
