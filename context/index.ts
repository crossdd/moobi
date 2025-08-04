import { useMusic, MusicProvider } from "@/context/MusicContext";
import { usePhone, PhoneProvider } from "@/context/PhoneContext";
import { useBrowser, BrowserProvider } from "@/context/BrowserContext";
import { useWeather, WeatherProvider } from "@/context/WeatherContext";

export {
  useWeather,
  usePhone,
  useBrowser,
  useMusic,
  MusicProvider,
  PhoneProvider,
  BrowserProvider,
  WeatherProvider,
};
