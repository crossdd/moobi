"use client"

import { useState, useEffect } from "react"
import {
    LuMapPin,
    LuWind,
    LuDroplets,
    LuEye,
    LuThermometer,
    LuCloudRain,
    LuLoader,
    LuRefreshCw,
    LuSearch
} from "react-icons/lu"
import { Button } from "@/components/ui/button"
import {WeatherData} from "@/types";

const Weather = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // const [location, setLocation] = useState("New York")
    const [searchLocation, setSearchLocation] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [isCelsius, setIsCelsius] = useState(true)
    const [selectedView, setSelectedView] = useState<"hourly" | "daily">("hourly")

    const fetchWeather = async (loc: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/weather?location=${encodeURIComponent(loc)}&days=7`)
            const data = await response.json()

            if (data.success) {
                setWeatherData(data.data)
                // setLocation(loc)
            } else {
                setError(data.error || "Failed to fetch weather data")
            }
        } catch (err) {
            setError("Network error occurred")
            console.error("Weather fetch error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleRefresh()
    }, []);


    const handleSearch = async () => {
        if (!searchLocation.trim()) return

        setIsSearching(true)
        await fetchWeather(searchLocation)
        setSearchLocation("")
        setIsSearching(false)
    }

    const handleRefresh = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(`${latitude},${longitude}`);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    // Fallback if user denies location
                    fetchWeather("Atalanta");
                }
            );
        } else {
            // Geolocation not supported
            fetchWeather("New York");
        }
    }

    const formatTime = (timeString: string) => {
        const date = new Date(timeString)
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (date.toDateString() === today.toDateString()) {
            return "Today"
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow"
        } else {
            return date.toLocaleDateString("en-US", { weekday: "short" })
        }
    }

    const getWeatherBackground = (condition: string, isDay = true) => {
        const conditionLower = condition.toLowerCase()

        if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
            return isDay
                ? "linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)"
                : "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #3b82f6 100%)"
        } else if (conditionLower.includes("cloud")) {
            return "linear-gradient(135deg, #74b9ff 0%, #81ecec 50%, #a29bfe 100%)"
        } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
            return "linear-gradient(135deg, #4b6cb7 0%, #182848 50%, #2c3e50 100%)"
        } else if (conditionLower.includes("snow")) {
            return "linear-gradient(135deg, #e6f3ff 0%, #cce7ff 50%, #b3daff 100%)"
        } else if (conditionLower.includes("thunder") || conditionLower.includes("storm")) {
            return "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #4a6741 100%)"
        } else {
            return "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
        }
    }

    const getTemperature = (tempC: number, tempF: number) => {
        return isCelsius ? `${Math.round(tempC)}°` : `${Math.round(tempF)}°`
    }

    if (isLoading && !weatherData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="relative">
                    <div className="w-[375px] h-[812px] bg-black rounded-[60px] p-2 shadow-2xl">
                        <div className="w-full h-full bg-blue-500 rounded-[50px] overflow-hidden relative flex items-center justify-center">
                            <div className="text-center text-white">
                                <LuLoader className="w-12 h-12 animate-spin mx-auto mb-4" />
                                <p className="text-lg">Loading Weather...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="relative">
                    <div className="w-[375px] h-[812px] bg-black rounded-[60px] p-2 shadow-2xl">
                        <div className="w-full h-full bg-red-500 rounded-[50px] overflow-hidden relative flex items-center justify-center">
                            <div className="text-center text-white px-8">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h2 className="text-xl font-bold mb-2">Weather Error</h2>
                                <p className="text-sm mb-4">{error}</p>
                                <Button onClick={handleRefresh} className="bg-white text-red-500 hover:bg-gray-100">
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!weatherData) return null

    const currentHour = new Date().getHours()
    const todayHours =
        weatherData.forecast.forecastday[0]?.hour.filter((hour) => {
            const hourTime = new Date(hour.time).getHours()
            return hourTime >= currentHour
        }) || []

    const tomorrowHours = weatherData.forecast.forecastday[1]?.hour.slice(0, 24 - todayHours.length) || []
    const next24Hours = [...todayHours, ...tomorrowHours].slice(0, 24)

    return (
        <div
            className="flex-1 flex flex-col px-4 py-4 mt-10"
             style={{
            background: getWeatherBackground(weatherData.current.condition.text, true),
        }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <LuMapPin className="w-5 h-5 text-white" />
                    <span className="text-white text-lg font-medium">{weatherData.location.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => setIsCelsius(!isCelsius)}
                        className="bg-white/20 hover:bg-white/30 text-white border-0 text-sm px-3 py-1 h-8"
                    >
                        {isCelsius ? "°C" : "°F"}
                    </Button>
                    <Button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="bg-white/20 hover:bg-white/30 text-white border-0 p-2 h-8 w-8"
                    >
                        <LuRefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="flex gap-1">
                    <div className="relative flex-1 bg-gray-500/50 py-2 rounded-lg">
                        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <input
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search location..."
                            className="pl-10 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
                        />
                    </div>
                    <Button
                        onClick={handleSearch}
                        disabled={isSearching || !searchLocation.trim()}
                        className="bg-white/20 hover:bg-white/30 text-white border-0 px-4"
                    >
                        {isSearching ? <LuLoader className="w-4 h-4 animate-spin" /> : "Go"}
                    </Button>
                </div>
            </div>

            {/* Current Weather */}
            <div className="text-center mb-8">
                <div className="text-7xl font-thin text-white mb-2">
                    {getTemperature(weatherData.current.temp_c, weatherData.current.temp_f)}
                </div>
                <div className="text-base text-white/90 mb-2">{weatherData.current.condition.text}</div>
                <div className="text-base text-white/80">
                    H:
                    {getTemperature(
                        weatherData.forecast.forecastday[0].day.maxtemp_c,
                        weatherData.forecast.forecastday[0].day.maxtemp_f,
                    )}{" "}
                    L:
                    {getTemperature(
                        weatherData.forecast.forecastday[0].day.mintemp_c,
                        weatherData.forecast.forecastday[0].day.mintemp_f,
                    )}
                </div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-white/20 rounded-xl p-1 mb-4">
                <Button
                    onClick={() => setSelectedView("hourly")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg border-0 ${
                        selectedView === "hourly"
                            ? "bg-white/30 text-white"
                            : "bg-transparent text-white/70 hover:bg-white/10"
                    }`}
                >
                    Hourly
                </Button>
                <Button
                    onClick={() => setSelectedView("daily")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg border-0 ${
                        selectedView === "daily"
                            ? "bg-white/30 text-white"
                            : "bg-transparent text-white/70 hover:bg-white/10"
                    }`}
                >
                    7-Day
                </Button>
            </div>

            {/* Hourly/Daily Forecast */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 flex-1">
                {selectedView === "hourly" ? (
                    <div className="space-y-3">
                        <h3 className="text-white font-medium text-sm mb-3">Next 24 Hours</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto no-visible-scrollbar">
                            {next24Hours.map((hour, index) => (
                                <div key={index} className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-3">
                            <span className="text-white/80 text-sm w-12">
                              {index === 0 ? "Now" : formatTime(hour.time)}
                            </span>
                                        <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} className="w-6 h-6" />
                                        <span className="text-white/70 text-xs flex-1">{hour.condition.text}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {hour.chance_of_rain > 0 && (
                                            <div className="flex items-center gap-1">
                                                <LuCloudRain className="w-3 h-3 text-blue-300" />
                                                <span className="text-blue-300 text-xs">{hour.chance_of_rain}%</span>
                                            </div>
                                        )}
                                        <span className="text-white font-medium text-sm">
                              {getTemperature(hour.temp_c, hour.temp_f)}
                            </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <h3 className="text-white font-medium text-sm mb-3">7-Day Forecast</h3>
                        <div className="space-y-2 no-visible-scrollbar">
                            {weatherData.forecast.forecastday.map((day, index) => (
                                <div key={index} className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-white/80 text-sm w-16">{formatDate(day.date)}</span>
                                        <img
                                            src={`https:${day.day.condition.icon}`}
                                            alt={day.day.condition.text}
                                            className="w-6 h-6"
                                        />
                                        <span className="text-white/70 text-xs flex-1">{day.day.condition.text}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {day.day.daily_chance_of_rain > 0 && (
                                            <div className="flex items-center gap-1">
                                                <LuCloudRain className="w-3 h-3 text-blue-300" />
                                                <span className="text-blue-300 text-xs">{day.day.daily_chance_of_rain}%</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                              <span className="text-white/60 text-sm">
                                {getTemperature(day.day.mintemp_c, day.day.mintemp_f)}
                              </span>
                                            <span className="text-white font-medium text-sm">
                                {getTemperature(day.day.maxtemp_c, day.day.maxtemp_f)}
                              </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <LuWind className="w-4 h-4 text-white/80" />
                        <span className="text-white/80 text-xs">WIND</span>
                    </div>
                    <div className="text-white text-lg font-medium">{Math.round(weatherData.current.wind_mph)} mph</div>
                    <div className="text-white/60 text-xs">{weatherData.current.wind_dir}</div>
                </div>

                <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <LuDroplets className="w-4 h-4 text-white/80" />
                        <span className="text-white/80 text-xs">HUMIDITY</span>
                    </div>
                    <div className="text-white text-lg font-medium">{weatherData.current.humidity}%</div>
                </div>

                <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <LuEye className="w-4 h-4 text-white/80" />
                        <span className="text-white/80 text-xs">VISIBILITY</span>
                    </div>
                    <div className="text-white text-lg font-medium">{Math.round(weatherData.current.vis_miles)} mi</div>
                </div>

                <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <LuThermometer className="w-4 h-4 text-white/80" />
                        <span className="text-white/80 text-xs">FEELS LIKE</span>
                    </div>
                    <div className="text-white text-lg font-medium">
                        {getTemperature(weatherData.current.feelslike_c, weatherData.current.feelslike_f)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather