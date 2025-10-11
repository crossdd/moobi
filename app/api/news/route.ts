import { NewsArticle } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  try {
    const res = await fetch(
      `https://gnews.io/api/v4/search?q=${keyword}&lang=en&max=5&apikey=${process.env.GNEWS_API_KEY!}`,
      {
        headers: { Accept: "application/json" },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
    }

    const data = await res.json();

    return Response.json({
      success: true,
      data: data.articles as NewsArticle[],
    });
  } catch (error) {
    console.error("Error fetching timezones", error);
    return Response.json(
      { success: false, error: "Failed to fetch timezones" },
      { status: 500 },
    );
  }
}
