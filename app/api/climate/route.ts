import { NextResponse } from "next/server";
import { BENGALURU, mapWeatherCode, type ClimatePayload } from "@/lib/climate";
import { mocks } from "@/lib/mocks";

export const revalidate = 600;

async function resolveCoords(request: Request) {
  const latH = request.headers.get("x-vercel-ip-latitude");
  const lonH = request.headers.get("x-vercel-ip-longitude");
  const cityH = request.headers.get("x-vercel-ip-city");
  const countryH = request.headers.get("x-vercel-ip-country");
  if (latH && lonH) {
    return {
      lat: Number(latH),
      lon: Number(lonH),
      city: cityH ? decodeURIComponent(cityH) : "Nearby",
      country: countryH,
    };
  }

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded && forwarded !== "::1" && forwarded !== "127.0.0.1") {
    try {
      const res = await fetch(`https://ipapi.co/${forwarded}/json/`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = (await res.json()) as {
          latitude?: number;
          longitude?: number;
          city?: string;
          country_code?: string;
        };
        if (json.latitude && json.longitude) {
          return {
            lat: json.latitude,
            lon: json.longitude,
            city: json.city ?? "Nearby",
            country: json.country_code ?? null,
          };
        }
      }
    } catch {
      /* fall through */
    }
  }

  return BENGALURU;
}

export async function GET(request: Request) {
  try {
    const loc = await resolveCoords(request);
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(loc.lat));
    url.searchParams.set("longitude", String(loc.lon));
    url.searchParams.set("current", "temperature_2m,weather_code,is_day");
    url.searchParams.set("timezone", "auto");
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error("meteo");
    const data = (await res.json()) as {
      current?: { temperature_2m?: number; weather_code?: number; is_day?: number };
    };
    const code = data.current?.weather_code ?? 0;
    const temp = data.current?.temperature_2m ?? null;
    const month = new Date().getMonth() + 1;
    const mapped = mapWeatherCode(code, temp, month);
    const payload: ClimatePayload = {
      city: loc.city,
      country: loc.country,
      condition: mapped.condition,
      kind: mapped.kind,
      isDay: data.current?.is_day === 1,
      temperatureC: temp,
    };
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(mocks.climate);
  }
}
