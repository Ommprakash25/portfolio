import { NextResponse } from "next/server";
import { mocks } from "@/lib/mocks";

export const revalidate = 120;

type Day = { date: string; count: number };

export async function GET() {
  const user = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(mocks.github);
  }
  if (!user) {
    return NextResponse.json(mocks.github);
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "omm-portfolio",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=40`, {
      headers,
      next: { revalidate: 120 },
    });
    if (!res.ok) throw new Error("github");
    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
      repo?: { name: string };
      payload?: { commits?: Array<{ message?: string }> };
    }>;

    const push = events.find((e) => e.type === "PushEvent");
    const msg = push?.payload?.commits?.[0]?.message?.split("\n")[0];
    const latest = msg
      ? `${push?.repo?.name?.split("/")[1] ?? "repo"} · ${msg}`
      : events[0]
        ? `${events[0].repo?.name ?? "github"} · ${events[0].type}`
        : "No recent public events";

    const days: Day[] = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, count: 0 });
    }
    for (const e of events) {
      const key = e.created_at.slice(0, 10);
      const row = days.find((d) => d.date === key);
      if (row) row.count += 1;
    }

    return NextResponse.json({
      placeholder: false,
      latest,
      sparkline: days.map((d) => d.count),
    });
  } catch {
    return NextResponse.json(mocks.github);
  }
}
