import { WeatherData } from "@/types";
import { create } from "zustand";

interface WeatherType {
  isLoading: boolean;
  error: string | null;
  weatherData: WeatherData | null;
  fetchWeather: (loc: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherType>((set) => ({
  isLoading: false,
  error: null,
  weatherData: null,

  fetchWeather: async (loc) => {
    set({
      isLoading: true,
      error: null
    })

    try {
      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(loc)}&days=7`,
      );
      const data = await response.json();

      if (data.success) {
        set({ weatherData: data.data })
      } else {
        set({ error: data.error || "Failed to fetch weather data" })
      }
    } catch (err) {
      set({ error: "Network error" })
      console.error("Weather fetch error:", err);
    } finally {
      set({ isLoading: false })
    }
  },
}))