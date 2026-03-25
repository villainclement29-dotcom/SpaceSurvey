import { NextRequest, NextResponse } from "next/server";
import { fetchAndStoreArticles } from "@/lib/fetchers";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await fetchAndStoreArticles();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[CRON] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
