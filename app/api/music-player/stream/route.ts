export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const trackId = searchParams.get("id")

        if (!trackId) {
            return Response.json({ success: false, error: "Track ID is required" }, { status: 400 })
        }

        // Get the stream URL from Audius
        const streamUrl = `https://discoveryprovider.audius.co/v1/tracks/${trackId}/stream`

        // Fetch the audio stream
        const response = await fetch(streamUrl, {
            headers: {
                Accept: "audio/*",
            },
        })

        if (!response.ok) {
            throw new Error("Failed to get stream")
        }

        // Return the stream URL for client-side audio playback
        return Response.json({
            success: true,
            streamUrl: response.url,
            trackId: trackId,
        })
    } catch (error) {
        console.error("Error getting stream:", error)
        return Response.json({ success: false, error: "Failed to get stream" }, { status: 500 })
    }
}
