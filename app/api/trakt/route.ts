import { NextResponse } from "next/server";
import { mocks } from "@/lib/mocks";

export const revalidate = 90;

export async function GET() {
  const client = process.env.TRAKT_CLIENT_ID;
  const user = process.env.TRAKT_USERNAME;
  if (!client || !user) {
    return NextResponse.json(mocks.trakt);
  }
  const headers = {
    "Content-Type": "application/json",
    "trakt-api-version": "2",
    "trakt-api-key": client,
  };
  try {
    const watchingRes = await fetch(`https://api.trakt.tv/users/${user}/watching`, { headers });
    if (watchingRes.status === 200) {
      const watching = (await watchingRes.json()) as {
        show?: { title?: string };
        episode?: { season?: number; number?: number };
        movie?: { title?: string };
      };
      if (watching.show?.title) {
        const s = watching.episode?.season?.toString().padStart(2, "0");
        const e = watching.episode?.number?.toString().padStart(2, "0");
        const ep = s && e ? ` S${s}E${e}` : "";
        return NextResponse.json({
          placeholder: false,
          text: `Watching · ${watching.show.title}${ep}`,
        });
      }
      if (watching.movie?.title) {
        return NextResponse.json({ placeholder: false, text: `Watching · ${watching.movie.title}` });
      }
    }

    const histRes = await fetch(`https://api.trakt.tv/users/${user}/history?limit=1`, { headers });
    const hist = (await histRes.json()) as Array<{
      type?: string;
      show?: { title?: string };
      movie?: { title?: string };
    }>;
    const item = hist[0];
    const title = item?.show?.title ?? item?.movie?.title;
    const prefix = item?.type === "movie" || item?.movie ? "Last ·" : "Last ·";
    return NextResponse.json({
      placeholder: false,
      text: title ? `${prefix} ${title}` : "Trakt idle",
    });
  } catch {
    return NextResponse.json(mocks.trakt);
  }
}
