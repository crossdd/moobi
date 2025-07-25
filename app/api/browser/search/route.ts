export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get("q")
        const start = searchParams.get("start") || "1"

        if (!query) {
            return Response.json({ success: false, error: "Query parameter is required" }, { status: 400 })
        }

        const API_KEY = process.env.GOOGLE_SEARCH_API_KEY!
        const SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID!

        if (!API_KEY || !SEARCH_ENGINE_ID) {
            return Response.json(
                { success: false, error: "Google Search API not configured" },
                { status: 500 }
            )
        }

        // Make request to Google Custom Search API
        const googleApiUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}&start=${start}&num=10`

        const response = await fetch(googleApiUrl, {
            headers: {
                Accept: "application/json",
            },
        })

        if (!response.ok) {
            throw new Error(`Google API error: ${response.status}`)
        }

        const data = await response.json()

        // Transform Google API response to our format
        const searchResults = {
            query: query,
            totalResults: data.searchInformation?.totalResults || "0",
            searchTime: data.searchInformation?.searchTime || "0",
            results: data.items?.map((item: any) => ({
                title: item.title,
                link: item.link,
                displayLink: item.displayLink,
                snippet: item.snippet,
                htmlSnippet: item.htmlSnippet,
                formattedUrl: item.formattedUrl,
                pagemap: item.pagemap,
            })) || [],
            nextPage: data.queries?.nextPage?.[0],
            previousPage: data.queries?.previousPage?.[0],
        }

        return Response.json({
            success: true,
            data: searchResults,
        })
    } catch (error) {
        console.error("Error searching:", error)
        return Response.json(
            { success: false, error: "Failed to perform search" },
            { status: 500 }
        )
    }
}
