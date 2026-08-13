import type { ClimatePayload } from "@/lib/climate";

export const mocks = {
  github: {
    placeholder: true,
    latest: "portfolio · feat: denser project cards",
    sparkline: [3, 5, 2, 8, 4, 6, 7],
  },
  wakatime: {
    placeholder: true,
    text: "28 hrs 41 mins this week",
  },
  steam: {
    placeholder: true,
    text: "Playing · Hades II",
  },
  spotify: {
    placeholder: true,
    text: "Now · Midnight City — M83",
  },
  trakt: {
    placeholder: true,
    text: "Watching · Severance S02E03",
  },
  climate: {
    city: "Bengaluru",
    country: "IN",
    condition: "partly cloudy",
    kind: "clear",
    isDay: true,
    temperatureC: 27,
  } satisfies ClimatePayload,
  uptime: {
    checks: [
      { name: "This site", ok: true },
      { name: "Ledger Lane", ok: true },
      { name: "Signal Garden", ok: true },
    ],
  },
};
