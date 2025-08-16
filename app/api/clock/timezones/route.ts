export async function GET() {
  try {
    const res = await fetch(
      "https://timeapi.io/api/timezone/availabletimezones",
      {
        headers: { Accept: "application/json" },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch timezones: ${res.status}`);
    }

    const data: string[] = await res.json();

    const updatedData = await Promise.all(
      data
        .filter(
          (timezone) =>
            !timezone.startsWith("Etc/") &&
            !timezone.startsWith("GMT") &&
            !timezone.startsWith("MST") &&
            !timezone.startsWith("NZ") &&
            timezone !== "ROC",
        )
        .map(async (zone) => {
          const res = await fetch(
            `https://timeapi.io/api/timezone/zone?timeZone=${zone}`,
            {
              headers: { Accept: "application/json" },
            },
          );

          if (!res.ok) {
            throw new Error(
              `Failed to get info about ${zone} - ${res.statusText} - ${res.status}`,
            );
          }

          const data = await res.json();

          return {
            timezone: data.timeZone,
            localTime: data.currentLocalTime,
            currentUtcOffset: data.currentUtcOffset,
          };
        }),
    );

    return Response.json({
      success: true,
      data: updatedData,
    });
  } catch (error) {
    console.error("Error fetching timezones", error);
    return Response.json(
      { success: false, error: "Failed to fetch timezones" },
      { status: 500 },
    );
  }
}
