import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ status: "error", message: "Missing URL" }, { status: 400 });
    }

    try {
        const res = await fetch(url, {
            method: "HEAD", // lightweight request — just checks headers
            redirect: "follow",
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; MoobiBot/1.0)"
            }
        });

        // Most iframe-denied sites will return a status or include headers like X-Frame-Options
        const xFrameOptions = res.headers.get("x-frame-options");
        const contentSecurityPolicy = res.headers.get("content-security-policy");

        const embeddingDenied =
            xFrameOptions?.toLowerCase().includes("deny") ||
            xFrameOptions?.toLowerCase().includes("sameorigin") ||
            contentSecurityPolicy?.toLowerCase().includes("frame-ancestors");

        if (embeddingDenied) {
            return NextResponse.json({
                status: "blocked",
                reason: "Site prevents iframe embedding via headers"
            });
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Error searching:", error)
        return NextResponse.json(
            { status: "error", message: "Site is unreachable or invalid" },
            { status: 500 }
        );
    }
}
