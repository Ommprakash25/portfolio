# Omm

Editorial software portfolio — systems, writing, and a climate-tinted canvas.

Live demo: set `NEXT_PUBLIC_SITE_URL` after deploy.

![Home screenshot](docs/screenshot-home.png.txt)

## Stack

![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-38BDF8?logo=tailwindcss&logoColor=white)

Next.js App Router, TypeScript, Tailwind, Framer Motion, Lenis, next-themes, MDX.

## Features

- Day / Night and independent Weather wash (IP + Open-Meteo, no GPS prompt)
- Signals rail: GitHub, WakaTime, Steam, Spotify, Trakt, availability, uptime, presence
- Writing (MDX), games (external hosts), work case studies, printable resume, building changelog
- Command palette (⌘K) and full `/cmd` terminal
- Random load atmospheres (birds, storm, aurora, winter) + right glass dock
- SEO: canonical URLs, JSON-LD, Open Graph, sitemap, robots, `llms.txt`

## Structure

```
app/           routes, API, metadata
components/    chrome, signals, motion
content/writing  MDX posts
lib/content.ts   swap placeholders here
lib/mocks.ts     demo Signals payloads
```

## Env

Copy `.env.example` to `.env.local`. **Do not invent API secrets.** Demo Signals come from `lib/mocks.ts` while Steam / Spotify / WakaTime / Trakt keys stay empty. `GITHUB_USERNAME=octocat` is a public calendar user, not a secret.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin |
| `GITHUB_USERNAME` | Calendar user (`octocat` for demo) |
| `GITHUB_TOKEN` | Live commit ticker (blank = mock ticker) |
| `STEAM_API_KEY` / `STEAM_VANITY_URL` | Playing / last game |
| `WAKATIME_API_KEY` | Hours this week |
| `SPOTIFY_*` | Now / last track |
| `TRAKT_CLIENT_ID` / `TRAKT_USERNAME` | Watching / last |

## Scripts

```
npm run dev
npm run build
npm start
npm run lint
```

## License

MIT. See [LICENSE](LICENSE).
