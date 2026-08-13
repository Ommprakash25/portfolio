"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, socials } from "@/lib/content";

export function SiteFooter() {
  const path = usePathname();
  if (path === "/cli") return null;

  return (
    <footer className="print:hidden mt-auto border-t border-line/70">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8 text-sm text-muted md:flex-row md:items-end md:justify-between md:px-6 md:pr-24">
        <p>
          {site.name} · {site.location}
        </p>
        <ul className="flex flex-wrap gap-4">
          <li>
            <a href={socials.github} rel="me">
              GitHub
            </a>
          </li>
          <li>
            <a href={socials.x} rel="me">
              X
            </a>
          </li>
          <li>
            <a href={socials.discord} rel="me">
              Discord
            </a>
          </li>
          <li>
            <a href={socials.linkedin} rel="me">
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="text-xs">
          Colophon: Next.js, Instrument Sans, Instrument Serif, Framer Motion.{" "}
          <Link href="/building">Building</Link>
          {" · "}
          <Link href="/resume">Resume</Link>
        </p>
      </div>
    </footer>
  );
}
