"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site, socials } from "@/lib/content";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.6s.8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .4.8.4 1.8.1 2.6a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M6.5 9H4V20h2.5V9ZM5.2 4A1.5 1.5 0 1 0 5.2 7a1.5 1.5 0 0 0 0-3ZM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1.1 0-1.7.7-2 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.4-1.8 3.4-1.8 2.5 0 4.2 1.6 4.2 5.1V20Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.5l-5.1-6.7L5.7 22H2.6l7.3-8.3L1 2h6.6l4.6 6.1L18.9 2Zm-1.1 18h1.8L6.3 3.9H4.4L17.8 20Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M19.3 5.2A18 18 0 0 0 14.8 4l-.2.4c1.5.4 2.3.9 3.1 1.5-2.6-1.4-6.2-1.5-8.7 0 .8-.6 1.7-1.1 3.1-1.5L12 4a18 18 0 0 0-4.5 1.2C4.7 8.2 4 11.4 4.2 14.6c1.7 1.3 3.4 2 5.1 2.2l.6-.9c-.7-.3-1.3-.6-1.9-1 2.2 1 4.7 1 6.9 0-.6.4-1.2.7-1.9 1l.6.9c1.7-.2 3.4-1 5.1-2.2.4-4.1-.7-7.2-2.5-9.4ZM9.4 13.4c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4Zm5.2 0c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4Z" />
    </svg>
  );
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const verbs = site.headlineVerbs;
  const [verbIndex, setVerbIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setVerbIndex((i) => (i + 1) % verbs.length);
    }, 2500);
    return () => window.clearInterval(id);
  }, [reduce, verbs.length]);

  const verb = verbs[verbIndex];

  return (
    <motion.header
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className="mx-auto max-w-4xl px-4 pt-28 pb-16 md:px-6 md:pt-32"
    >
      <motion.div
        variants={fade}
        className="flex flex-col items-start gap-8 sm:flex-row sm:items-center"
      >
        <button
          type="button"
          aria-label={`${site.name} portrait`}
          className="avatar-spin group relative shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span className="relative block size-28 md:size-32">
            <span className="avatar-coin relative block size-full">
              <span className="avatar-face avatar-face-front overflow-hidden rounded-full ring-2 ring-accent/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.avatar} alt="" className="size-full object-cover" />
              </span>
              <span className="avatar-face avatar-face-back overflow-hidden rounded-full ring-2 ring-accent/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.avatar} alt="" className="size-full scale-x-[-1] object-cover" />
              </span>
            </span>
          </span>
        </button>
        <div>
          <p className="text-sm text-muted">{site.location}</p>
          <p className="mt-2 text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
            {site.role}
          </p>
          <h1 className="mt-3 font-display text-4xl font-normal tracking-tight md:text-6xl">
            <span className="text-ink">I </span>
            <span className="relative inline-grid align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={verb}
                  initial={reduce ? false : { y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? undefined : { y: -18, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="col-start-1 row-start-1 bg-gradient-to-r from-accent to-[color-mix(in_srgb,var(--accent)_55%,white)] bg-clip-text text-transparent"
                >
                  {verb}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-ink"> {site.headlineObject}</span>
          </h1>
          <p className="mt-3 text-lg text-muted md:text-xl">{site.tagline}</p>
        </div>
      </motion.div>
      <motion.ul variants={fade} className="mt-8 flex flex-wrap gap-3">
        {site.stats.map((stat) => (
          <li
            key={stat.label}
            className="rounded-full border border-line/80 bg-panel/50 px-4 py-2"
          >
            <span className="font-display text-lg">{stat.value}</span>
            <span className="ml-2 text-xs text-muted">{stat.label}</span>
          </li>
        ))}
      </motion.ul>
      <motion.ul variants={fade} className="mt-8 flex flex-wrap gap-3">
        <li>
          <a
            href={socials.github}
            rel="me"
            aria-label="GitHub"
            className="flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
          >
            <GitHubIcon />
          </a>
        </li>
        <li>
          <a
            href={socials.linkedin}
            rel="me"
            aria-label="LinkedIn"
            className="flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-[#0a66c2]"
          >
            <LinkedInIcon />
          </a>
        </li>
        <li>
          <a href={socials.x} rel="me" aria-label="X" className="flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink">
            <XIcon />
          </a>
        </li>
        <li>
          <a
            href={socials.discord}
            rel="me"
            aria-label="Discord"
            className="flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-[#5865f2]"
          >
            <DiscordIcon />
          </a>
        </li>
      </motion.ul>
      <motion.a
        variants={fade}
        href="#work"
        className="mt-12 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <span className="inline-block size-1.5 rounded-full bg-accent" />
        Scroll to explore
      </motion.a>
    </motion.header>
  );
}
