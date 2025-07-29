"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { WeatherData } from "@/types";

interface ContextType {
  isLoading: boolean;
  error: string | null;
  weatherData: WeatherData | null;
  fetchWeather: (loc: string) => Promise<void>;
}

const INIT_STATE: ContextType = {
  isLoading: false,
  error: null,
  weatherData: null,
  fetchWeather: async () => {},
};

const WeatherContext = createContext<ContextType>(INIT_STATE);

const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeather("New York");
  }, []);

  const fetchWeather = async (loc: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(loc)}&days=7`,
      );
      const data = await response.json();

      if (data.success) {
        setWeatherData(data.data);
      } else {
        setError(data.error || "Failed to fetch weather data");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Weather fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        isLoading,
        weatherData,
        error,
        fetchWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => useContext(WeatherContext);

export { WeatherProvider, useWeather };
