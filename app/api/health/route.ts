import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  if (process.env.PORTFOLIO_API_URL) {
    try {
      const response = await fetch(`${process.env.PORTFOLIO_API_URL}/api/cms-health`, { cache: "no-store", signal: AbortSignal.timeout(3000) });
      if (!response.ok) throw new Error("CMS unavailable");
    } catch {
      return NextResponse.json({ status: "unavailable" }, { status: 503 });
    }
  }
  return NextResponse.json({ status: "ok" });
}
