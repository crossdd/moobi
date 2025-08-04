import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

const screenPaths: Record<string, string> = {
  phone: "PhoneDialer",
  mail: "MailCompose",
  gallery: "gallery/Gallery",
  info: "InfoScreen",
  home: "HomeScreen",
  snake: "SnakeGame",
  guess: "GuessGame",
  chrome: "browser/Browser",
  itunes: "music-player/iTunes",
  weather: "weather-app/Weather",
  calculator: "calculator/Calculator",
};

export const loadScreen = (screen: string) =>
  dynamic(() => import(`@/components/screens/${screenPaths[screen]}`), {
    loading: () => <Loader />,
  });
