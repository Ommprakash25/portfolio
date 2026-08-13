import { NextResponse } from "next/server";
import { presenceCount } from "@/lib/presence";

export const revalidate = 30;

export async function GET() {
  return NextResponse.json({ count: presenceCount() });
}
