function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Omm",
  role: "Software Engineer",
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  workHours: { start: 10, end: 19 },
  tagline: "Editorial software — systems, interfaces, and the quiet work between them.",
  description:
    "Omm is a software engineer in Bengaluru. Portfolio of shipped work, writing, and experiments.",
  email: "omm@example.com",
  url: resolveSiteUrl(),
  avatar: "/avatar.svg",
  headlineVerbs: ["build", "ship", "design", "edit"],
  headlineObject: "operator tools that stay quiet",
  stats: [
    { value: "4+", label: "years shipping" },
    { value: "6", label: "case studies" },
    { value: "4000", label: "presence seed" },
  ],
} as const;

export const socials = {
  github: "https://github.com/octocat",
  x: "https://x.com/omm",
  discord: "https://discord.com/users/000000000000000000",
  linkedin: "https://www.linkedin.com/in/omm",
} as const;

export const nav = [
  { href: "/writing", label: "Writing" },
  { href: "/work", label: "Work" },
  { href: "/kit", label: "Kit" },
  { href: "/games", label: "Games" },
] as const;

export type Project = {
  slug: string;
  title: string;
  year: string;
  stack: string[];
  summary: string;
  featured: boolean;
  url?: string;
  video?: string;
  poster?: string;
  posterFrom: string;
  posterTo: string;
  posterTone: string;
  problem: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "ledger-lane",
    title: "Ledger Lane",
    year: "2025",
    stack: ["TypeScript", "Next.js", "Postgres"],
    summary: "A quiet operations console for reconciling messy invoices into a single timeline.",
    featured: true,
    url: "https://example.com/ledger-lane",
    posterFrom: "#1d4e4a",
    posterTo: "#c6e07a",
    posterTone: "",
    problem:
      "Finance teams were stitching CSVs, email threads, and three dashboards to answer one question: what is still unpaid?",
    approach:
      "We modeled invoices as a linear event log, then built a keyboard-first console that treats exceptions as first-class rows instead of modal hell.",
    outcome:
      "Month-end close dropped from days of tab-switching to a single pass. Placeholder metrics until a real case study lands.",
  },
  {
    slug: "signal-garden",
    title: "Signal Garden",
    year: "2025",
    stack: ["Go", "React", "ClickHouse"],
    summary: "Live product telemetry with editorial density — charts that read like captions.",
    featured: true,
    url: "https://example.com/signal-garden",
    posterFrom: "#312e81",
    posterTo: "#67e8f9",
    posterTone: "",
    problem:
      "Existing analytics drowned operators in widgets. Nobody could tell which spike mattered.",
    approach:
      "A typed event schema, a thin query layer, and a UI that privileges one sentence per chart over dashboard wallpaper.",
    outcome:
      "On-call started quoting the garden instead of screenshots. Placeholder until production numbers replace this copy.",
  },
  {
    slug: "harbor-board",
    title: "Harbor Board",
    year: "2025",
    stack: ["TypeScript", "Node", "Redis"],
    summary: "A dispatch board for logistics desks — one column per exception, not a kanban costume.",
    featured: true,
    url: "https://example.com/harbor-board",
    posterFrom: "#1e3a5f",
    posterTo: "#fb923c",
    posterTone: "",
    problem: "Dispatchers lived in Slack threads. The board of record was a screenshot.",
    approach:
      "Events in, lanes out. Keyboard to claim a row. Presence as a number, not a stack of avatars.",
    outcome: "Handoffs stopped needing a standup. Placeholder until a real ops story replaces this.",
  },
  {
    slug: "north-index",
    title: "North Index",
    year: "2024",
    stack: ["Python", "FastAPI", "Elasticsearch"],
    summary: "Internal search that ranks by operator intent, not page views.",
    featured: true,
    url: "https://example.com/north-index",
    posterFrom: "#3f1d2e",
    posterTo: "#f9a8d4",
    posterTone: "",
    problem: "Docs search returned the onboarding wiki for every query about refunds.",
    approach: "Query classes, a small ranking file, and captions on every hit.",
    outcome: "Support started linking hits instead of writing the same paragraph. Placeholder copy.",
  },
  {
    slug: "paper-route",
    title: "Paper Route",
    year: "2024",
    stack: ["Python", "FastAPI", "SQLite"],
    summary: "Local-first publishing pipeline: markdown in, typeset pages out.",
    featured: false,
    posterFrom: "#7c2d12",
    posterTo: "#fbbf24",
    posterTone: "",
    problem:
      "Small editorial teams needed print-ready layouts without a CMS that wanted to be a social network.",
    approach:
      "A CLI that compiles MDX into paginated HTML, with print CSS as the source of truth.",
    outcome:
      "Weekly packets shipped from a laptop. This case study is a stand-in for a real shipping story.",
  },
  {
    slug: "quiet-room",
    title: "Quiet Room",
    year: "2023",
    stack: ["React", "WebAudio", "Vite"],
    summary: "A focus timer that refuses notifications. Sound is optional; silence is the product.",
    featured: false,
    url: "https://example.com/quiet-room",
    posterFrom: "#111827",
    posterTo: "#a3e635",
    posterTone: "",
    problem: "Every timer app wanted to be a social network with streaks.",
    approach: "One duration, one bell, local storage. No accounts.",
    outcome: "People used it. That was enough. Placeholder until a real write-up.",
  },
];

export const experience = [
  {
    org: "North Desk",
    role: "Software Engineer",
    period: "2024 — present",
    notes:
      "Product engineering across billing surfaces, internal tools, and the glue that keeps them honest.",
  },
  {
    org: "Harbor Lab",
    role: "Engineer",
    period: "2022 — 2024",
    notes: "Shipped data pipelines and operator consoles for a logistics research group.",
  },
  {
    org: "Field Note",
    role: "Frontend Engineer",
    period: "2021 — 2022",
    notes: "Design systems and dense tables for a field-ops product. Lots of print CSS.",
  },
  {
    org: "Independent",
    role: "Contract",
    period: "2020 — 2021",
    notes: "Web apps, typesetting experiments, and the occasional CLI that stuck around.",
  },
] as const;

export const tech = [
  "TypeScript",
  "React",
  "Next.js",
  "Go",
  "Postgres",
  "Python",
  "Tailwind",
  "Node",
  "Redis",
  "ClickHouse",
  "FastAPI",
  "SQLite",
  "Framer Motion",
  "MDX",
] as const;

export const games = [
  {
    slug: "orbit-pocket",
    title: "Orbit Pocket",
    blurb: "A tiny gravity puzzle. Hosted off-site — Play opens the live build.",
    coverFrom: "#0f172a",
    coverTo: "#38bdf8",
    playUrl: "https://example.com/games/orbit-pocket",
  },
  {
    slug: "signal-sprint",
    title: "Signal Sprint",
    blurb: "Catch the spike before the graph lies. Placeholder until a real itch.io link lands.",
    coverFrom: "#14532d",
    coverTo: "#bef264",
    playUrl: "https://example.com/games/signal-sprint",
  },
  {
    slug: "paper-planes",
    title: "Paper Planes",
    blurb: "Fold, throw, miss. A one-screen toy for when the compiler is thinking.",
    coverFrom: "#4c1d95",
    coverTo: "#f0abfc",
    playUrl: "https://example.com/games/paper-planes",
  },
  {
    slug: "dock-dodge",
    title: "Dock Dodge",
    blurb: "Slide a glass pill up the right edge. Do not hit the cursor.",
    coverFrom: "#1c1917",
    coverTo: "#f59e0b",
    playUrl: "https://example.com/games/dock-dodge",
  },
  {
    slug: "night-shift",
    title: "Night Shift",
    blurb: "Toggle day and night until the wash matches the weather. A joke with a high score.",
    coverFrom: "#0c0a09",
    coverTo: "#818cf8",
    playUrl: "https://example.com/games/night-shift",
  },
] as const;

export const kit = [
  {
    slug: "keyboard",
    name: "Keyboard",
    detail: "Low-profile board, quiet switches — for long copy and longer diffs.",
    image: "/kit/keyboard.svg",
  },
  {
    slug: "notebook",
    name: "Notebook",
    detail: "A5 ruled. Specs start on paper; code is the second draft.",
    image: "/kit/notebook.svg",
  },
  {
    slug: "display",
    name: "Display",
    detail: "One large panel. No second monitor religion.",
    image: "/kit/display.svg",
  },
  {
    slug: "editor",
    name: "Editor",
    detail: "Cursor. Terminal nearby. Browser last.",
    image: "/kit/editor.svg",
  },
  {
    slug: "headphones",
    name: "Headphones",
    detail: "Closed-back for offices. Open-back at home. Midnight City is not a requirement.",
    image: "/kit/headphones.svg",
  },
  {
    slug: "lamp",
    name: "Lamp",
    detail: "Warm, dimmable, aimed at the desk — not the webcam.",
    image: "/kit/lamp.svg",
  },
] as const;

export const building = [
  {
    date: "2026-08-12",
    title: "Shipped grouped ⌘K",
    note: "Pages, social, actions. Arrow keys. Result count. Still not Spotlight.",
  },
  {
    date: "2026-08-01",
    title: "Shipped climate wash",
    note: "IP-based atmosphere on the canvas. Day/Night stays a human choice.",
  },
  {
    date: "2026-07-22",
    title: "Shipped /games",
    note: "External play URLs. No YouTube route.",
  },
  {
    date: "2026-07-12",
    title: "Shipped writing index",
    note: "MDX posts with canonical URLs and a typeset reading column.",
  },
  {
    date: "2026-06-20",
    title: "Shipped Signals rail",
    note: "One status bar instead of a widget pile. Mocks until keys land.",
  },
  {
    date: "2026-05-18",
    title: "Shipped /cli",
    note: "ASCII OMM, dev@omm:~$, dock terminal icon.",
  },
  {
    date: "2026-05-04",
    title: "Shipped case studies",
    note: "Work pages with unique titles for project-name queries.",
  },
  {
    date: "2026-04-18",
    title: "Opened the site",
    note: "First public cut of the editorial portfolio.",
  },
] as const;

export const resume = {
  summary:
    "Software engineer focused on operator tools, typed backends, and interfaces that stay out of the way. Comfortable from schema to print CSS.",
  skills: [
    "TypeScript",
    "React",
    "Go",
    "Postgres",
    "Python",
    "System design",
    "Technical writing",
    "Design systems",
  ],
  education: [
    {
      school: "Placeholder University",
      credential: "B.E. Computer Science",
      period: "2016 — 2020",
    },
  ],
} as const;

export const uptimeTargets = [
  { name: "This site", url: resolveSiteUrl() },
  { name: "Ledger Lane", url: "https://example.com" },
  { name: "Signal Garden", url: "https://example.com" },
] as const;
