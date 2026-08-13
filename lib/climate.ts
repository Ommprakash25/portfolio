export type ClimateKind =
  | "rain"
  | "snow"
  | "heat"
  | "clear"
  | "autumn"
  | "spring"
  | "mist";

export type ClimatePayload = {
  city: string;
  country: string | null;
  condition: string;
  kind: ClimateKind;
  isDay: boolean;
  temperatureC: number | null;
};

const WMO: Record<number, { condition: string; kind: ClimateKind }> = {
  0: { condition: "clear", kind: "clear" },
  1: { condition: "mainly clear", kind: "clear" },
  2: { condition: "partly cloudy", kind: "clear" },
  3: { condition: "overcast", kind: "mist" },
  45: { condition: "fog", kind: "mist" },
  48: { condition: "rime fog", kind: "mist" },
  51: { condition: "light drizzle", kind: "rain" },
  53: { condition: "drizzle", kind: "rain" },
  55: { condition: "dense drizzle", kind: "rain" },
  61: { condition: "light rain", kind: "rain" },
  63: { condition: "rain", kind: "rain" },
  65: { condition: "heavy rain", kind: "rain" },
  71: { condition: "light snow", kind: "snow" },
  73: { condition: "snow", kind: "snow" },
  75: { condition: "heavy snow", kind: "snow" },
  80: { condition: "rain showers", kind: "rain" },
  81: { condition: "rain showers", kind: "rain" },
  82: { condition: "violent rain", kind: "rain" },
  85: { condition: "snow showers", kind: "snow" },
  86: { condition: "snow showers", kind: "snow" },
  95: { condition: "thunderstorm", kind: "rain" },
  96: { condition: "hail storm", kind: "rain" },
  99: { condition: "hail storm", kind: "rain" },
};

export function mapWeatherCode(
  code: number,
  temperatureC: number | null,
  month: number,
): { condition: string; kind: ClimateKind } {
  const base = WMO[code] ?? { condition: "unknown", kind: "clear" as ClimateKind };
  if (base.kind === "clear" && temperatureC !== null && temperatureC >= 32) {
    return { condition: "hot", kind: "heat" };
  }
  if (base.kind === "clear" || base.kind === "mist") {
    if (month === 10 || month === 11) return { ...base, kind: "autumn" };
    if (month === 2 || month === 3) return { ...base, kind: "spring" };
  }
  return base;
}

export const BENGALURU = { lat: 12.9716, lon: 77.5946, city: "Bengaluru", country: "IN" };

export type AtmosphereScene =
  | "birds"
  | "storm"
  | "aurora"
  | "winter"
  | "clouds"
  | "summer"
  | "autumn";

export type SceneMode = "live" | "off" | AtmosphereScene;

export const MANUAL_SCENES: Array<{ id: Exclude<SceneMode, "live">; label: string }> = [
  { id: "storm", label: "Rain" },
  { id: "summer", label: "Summer" },
  { id: "autumn", label: "Autumn" },
  { id: "winter", label: "Winter" },
  { id: "off", label: "Off" },
];

export function climateToScene(c: ClimatePayload): AtmosphereScene {
  if (c.kind === "rain") return "storm";
  if (c.kind === "snow") return "winter";
  if (c.kind === "autumn") return "autumn";
  if (c.kind === "heat") return "summer";
  if (c.kind === "clear" && !c.isDay) return "aurora";
  if (c.kind === "clear") return "summer";
  if (c.kind === "mist") return "clouds";
  if (c.kind === "spring") return "birds";
  return "birds";
}

export function resolveActiveScene(
  mode: SceneMode,
  climate: ClimatePayload | null,
): AtmosphereScene | null {
  if (mode === "off") return null;
  if (mode === "live") return climate ? climateToScene(climate) : null;
  return mode;
}
