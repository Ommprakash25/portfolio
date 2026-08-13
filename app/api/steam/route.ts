import { NextResponse } from "next/server";
import { mocks } from "@/lib/mocks";

export const revalidate = 180;

export async function GET() {
  const key = process.env.STEAM_API_KEY;
  const vanity = process.env.STEAM_VANITY_URL;
  if (!key || !vanity) {
    return NextResponse.json(mocks.steam);
  }
  try {
    const idRes = await fetch(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${key}&vanityurl=${vanity}`,
      { next: { revalidate: 86400 } },
    );
    const idJson = (await idRes.json()) as { response?: { steamid?: string } };
    const steamid = idJson.response?.steamid;
    if (!steamid) throw new Error("id");

    const [sumRes, recRes] = await Promise.all([
      fetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamid}`,
        { next: { revalidate: 180 } },
      ),
      fetch(
        `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${key}&steamid=${steamid}&count=1`,
        { next: { revalidate: 180 } },
      ),
    ]);
    const sum = (await sumRes.json()) as {
      response?: { players?: Array<{ gameextrainfo?: string }> };
    };
    const rec = (await recRes.json()) as {
      response?: { games?: Array<{ name?: string }> };
    };
    const playing = sum.response?.players?.[0]?.gameextrainfo;
    const last = rec.response?.games?.[0]?.name;
    const text = playing ? `Playing · ${playing}` : last ? `Last · ${last}` : "Steam idle";
    return NextResponse.json({ placeholder: false, text });
  } catch {
    return NextResponse.json(mocks.steam);
  }
}
