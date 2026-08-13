import { NextResponse } from "next/server";
import { mocks } from "@/lib/mocks";

export const revalidate = 60;

export async function GET() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) {
    return NextResponse.json(mocks.spotify);
  }
  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
    });
    const tokenJson = (await tokenRes.json()) as { access_token?: string };
    if (!tokenJson.access_token) throw new Error("token");
    const headers = { Authorization: `Bearer ${tokenJson.access_token}` };

    const nowRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers });
    if (nowRes.status === 200) {
      const now = (await nowRes.json()) as {
        item?: { name?: string; artists?: Array<{ name?: string }> };
      };
      const name = now.item?.name;
      const artist = now.item?.artists?.[0]?.name;
      if (name) {
        return NextResponse.json({
          placeholder: false,
          text: `Now · ${name}${artist ? ` — ${artist}` : ""}`,
        });
      }
    }

    const lastRes = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers,
    });
    const last = (await lastRes.json()) as {
      items?: Array<{ track?: { name?: string; artists?: Array<{ name?: string }> } }>;
    };
    const track = last.items?.[0]?.track;
    const text = track?.name
      ? `Last · ${track.name}${track.artists?.[0]?.name ? ` — ${track.artists[0].name}` : ""}`
      : "Spotify idle";
    return NextResponse.json({ placeholder: false, text });
  } catch {
    return NextResponse.json(mocks.spotify);
  }
}
