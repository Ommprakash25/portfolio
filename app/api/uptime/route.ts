import { NextResponse } from "next/server";
import { mocks } from "@/lib/mocks";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(mocks.uptime);
}
