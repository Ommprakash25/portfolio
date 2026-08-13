import { NextResponse } from "next/server";
import { mocks } from "@/lib/mocks";

export const revalidate = 300;

export async function GET() {
  const key = process.env.WAKATIME_API_KEY;
  if (!key) {
    return NextResponse.json(mocks.wakatime);
  }
  try {
    const auth = Buffer.from(`${key}:`).toString("base64");
    const res = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("waka");
    const json = (await res.json()) as { data?: { human_readable_total?: string } };
    const total = json.data?.human_readable_total ?? "0 hrs";
    return NextResponse.json({ placeholder: false, text: `${total} this week` });
  } catch {
    return NextResponse.json(mocks.wakatime);
  }
}
