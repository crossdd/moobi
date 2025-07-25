export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get("q")
        const limit = searchParams.get("limit") || "20"
        const offset = searchParams.get("offset") || "0"

        if (!query) {
            return Response.json({ success: false, error: "Query parameter is required" }, { status: 400 })
        }

        const response = await fetch(
            `https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
            {
                headers: {
                    Accept: "application/json",
                },
            },
        )

        if (!response.ok) {
            throw new Error("Failed to search tracks")
        }

        const data = await response.json()

        // Transform Audius data to our format
        const tracks =
            data.data?.map((track: any) => ({
                id: track.id,
                title: track.title,
                artist: track.user?.name || "Unknown Artist",
                album: track.mood || "Single",
                duration: track.duration,
                albumArt: track.artwork?.["480x480"] || track.artwork?.["150x150"] || "",
                genre: track.genre || "Unknown",
                streamUrl: `https://discoveryprovider.audius.co/v1/tracks/${track.id}/stream`,
                permalink: track.permalink,
                playCount: track.play_count,
                favoriteCount: track.favorite_count,
                repostCount: track.repost_count,
            })) || []

        return Response.json({
            success: true,
            data: tracks,
            total: data.data?.length || 0,
            query,
        })
    } catch (error) {
        console.error("Error searching tracks:", error)
        return Response.json({ success: false, error: "Failed to search tracks" }, { status: 500 })
    }
}
