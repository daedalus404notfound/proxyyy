import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url)
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", // Required by some sources
        Accept: "*/*",
      },
    });
    const body = await response.text();
    const contentType = response.headers.get("content-type") || "text/plain";

    return new NextResponse(body, {
      status: response.status,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Fetch failed", details: err },
      { status: 500 }
    );
  }
}
