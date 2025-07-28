export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const location = searchParams.get("location") || "New York"
        const days = searchParams.get("days") || "7"

        // WeatherAPI configuration
        const API_KEY = process.env.WEATHER_API_SECRET_KEY

        if (!API_KEY) {
            return Response.json({ success: false, error: "Weather API key not configured" }, { status: 500 })
        }

        // Fetch current weather and forecast
        const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=yes&alerts=yes`

        const response = await fetch(weatherApiUrl, {
            headers: {
                Accept: "application/json",
            },
        })

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`)
        }

        const data = await response.json()

        // Transform the data to our format
        const weatherData = {
            location: {
                name: data.location.name,
                region: data.location.region,
                country: data.location.country,
                localtime: data.location.localtime,
            },
            current: {
                temp_c: data.current.temp_c,
                temp_f: data.current.temp_f,
                condition: {
                    text: data.current.condition.text,
                    icon: data.current.condition.icon,
                    code: data.current.condition.code,
                },
                wind_mph: data.current.wind_mph,
                wind_kph: data.current.wind_kph,
                wind_dir: data.current.wind_dir,
                pressure_mb: data.current.pressure_mb,
                pressure_in: data.current.pressure_in,
                precip_mm: data.current.precip_mm,
                precip_in: data.current.precip_in,
                humidity: data.current.humidity,
                cloud: data.current.cloud,
                feelslike_c: data.current.feelslike_c,
                feelslike_f: data.current.feelslike_f,
                vis_km: data.current.vis_km,
                vis_miles: data.current.vis_miles,
                uv: data.current.uv,
                gust_mph: data.current.gust_mph,
                gust_kph: data.current.gust_kph,
            },
            forecast: {
                forecastday: data.forecast.forecastday.map((day: any) => ({
                    date: day.date,
                    date_epoch: day.date_epoch,
                    day: {
                        maxtemp_c: day.day.maxtemp_c,
                        maxtemp_f: day.day.maxtemp_f,
                        mintemp_c: day.day.mintemp_c,
                        mintemp_f: day.day.mintemp_f,
                        avgtemp_c: day.day.avgtemp_c,
                        avgtemp_f: day.day.avgtemp_f,
                        maxwind_mph: day.day.maxwind_mph,
                        maxwind_kph: day.day.maxwind_kph,
                        totalprecip_mm: day.day.totalprecip_mm,
                        totalprecip_in: day.day.totalprecip_in,
                        totalsnow_cm: day.day.totalsnow_cm,
                        avgvis_km: day.day.avgvis_km,
                        avgvis_miles: day.day.avgvis_miles,
                        avghumidity: day.day.avghumidity,
                        daily_will_it_rain: day.day.daily_will_it_rain,
                        daily_chance_of_rain: day.day.daily_chance_of_rain,
                        daily_will_it_snow: day.day.daily_will_it_snow,
                        daily_chance_of_snow: day.day.daily_chance_of_snow,
                        condition: {
                            text: day.day.condition.text,
                            icon: day.day.condition.icon,
                            code: day.day.condition.code,
                        },
                        uv: day.day.uv,
                    },
                    astro: {
                        sunrise: day.astro.sunrise,
                        sunset: day.astro.sunset,
                        moonrise: day.astro.moonrise,
                        moonset: day.astro.moonset,
                        moon_phase: day.astro.moon_phase,
                        moon_illumination: day.astro.moon_illumination,
                    },
                    hour: day.hour.map((hour: any) => ({
                        time_epoch: hour.time_epoch,
                        time: hour.time,
                        temp_c: hour.temp_c,
                        temp_f: hour.temp_f,
                        is_day: hour.is_day,
                        condition: {
                            text: hour.condition.text,
                            icon: hour.condition.icon,
                            code: hour.condition.code,
                        },
                        wind_mph: hour.wind_mph,
                        wind_kph: hour.wind_kph,
                        wind_dir: hour.wind_dir,
                        pressure_mb: hour.pressure_mb,
                        pressure_in: hour.pressure_in,
                        precip_mm: hour.precip_mm,
                        precip_in: hour.precip_in,
                        humidity: hour.humidity,
                        cloud: hour.cloud,
                        feelslike_c: hour.feelslike_c,
                        feelslike_f: hour.feelslike_f,
                        windchill_c: hour.windchill_c,
                        windchill_f: hour.windchill_f,
                        heatindex_c: hour.heatindex_c,
                        heatindex_f: hour.heatindex_f,
                        dewpoint_c: hour.dewpoint_c,
                        dewpoint_f: hour.dewpoint_f,
                        will_it_rain: hour.will_it_rain,
                        chance_of_rain: hour.chance_of_rain,
                        will_it_snow: hour.will_it_snow,
                        chance_of_snow: hour.chance_of_snow,
                        vis_km: hour.vis_km,
                        vis_miles: hour.vis_miles,
                        gust_mph: hour.gust_mph,
                        gust_kph: hour.gust_kph,
                        uv: hour.uv,
                    })),
                })),
            },
            alerts: data.alerts?.alert || [],
            air_quality: data.current.air_quality || null,
        }

        return Response.json({
            success: true,
            data: weatherData,
        })
    } catch (error) {
        console.error("Error fetching weather:", error)
        return Response.json({ success: false, error: "Failed to fetch weather data" }, { status: 500 })
    }
}
