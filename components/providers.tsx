"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  resolveActiveScene,
  type AtmosphereScene,
  type ClimatePayload,
  type SceneMode,
} from "@/lib/climate";

const MODE_KEY = "omm-scene-mode";

type WeatherCtx = {
  sceneMode: SceneMode;
  setSceneMode: (m: SceneMode) => void;
  climate: ClimatePayload | null;
  activeScene: AtmosphereScene | null;
};

const WeatherContext = createContext<WeatherCtx | null>(null);

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather");
  return ctx;
}

function isSceneMode(v: string | null): v is SceneMode {
  return (
    v === "live" ||
    v === "off" ||
    v === "birds" ||
    v === "storm" ||
    v === "aurora" ||
    v === "winter" ||
    v === "clouds" ||
    v === "summer" ||
    v === "autumn"
  );
}

function subscribeMode(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getModeSnapshot(): SceneMode {
  const stored = localStorage.getItem(MODE_KEY);
  if (isSceneMode(stored)) return stored;
  if (localStorage.getItem("weather-on") === "1") return "live";
  return "off";
}

function WeatherProvider({ children }: { children: React.ReactNode }) {
  const sceneMode = useSyncExternalStore(subscribeMode, getModeSnapshot, () => "off" as SceneMode);
  const [climate, setClimate] = useState<ClimatePayload | null>(null);

  const setSceneMode = useCallback((m: SceneMode) => {
    localStorage.setItem(MODE_KEY, m);
    window.dispatchEvent(new Event("storage"));
    if (m !== "live") setClimate(null);
  }, []);

  useEffect(() => {
    if (sceneMode !== "live") {
      document.documentElement.removeAttribute("data-climate");
      return;
    }
    let cancelled = false;
    fetch("/api/climate")
      .then((r) => r.json())
      .then((data: ClimatePayload & { unavailable?: boolean }) => {
        if (cancelled || data.unavailable || !data.kind) return;
        setClimate(data);
        document.documentElement.setAttribute("data-climate", data.kind);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [sceneMode]);

  const activeScene = resolveActiveScene(sceneMode, climate);
  const value = useMemo(
    () => ({ sceneMode, setSceneMode, climate, activeScene }),
    [sceneMode, setSceneMode, climate, activeScene],
  );
  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <WeatherProvider>{children}</WeatherProvider>
    </ThemeProvider>
  );
}
