"use client";

import Loader from "@/components/Loader";
import BootScreen from "@/components/screens/BootScreen";
import Frame from "@/components/screens/Frame";
import LockScreen from "@/components/screens/LockScreen";
import { usePhone } from "@/context/PhoneContext";
import dynamic from "next/dynamic";
import React from "react";

const HomeScreen = dynamic(() => import("@/components/screens/HomeScreen"), {
  loading: () => <Loader />,
});
const PhoneDialer = dynamic(() => import("@/components/screens/PhoneDialer"), {
  loading: () => <Loader />,
});
const MailCompose = dynamic(() => import("@/components/screens/MailCompose"), {
  loading: () => <Loader />,
});
const Gallery = dynamic(() => import("@/components/screens/gallery/Gallery"), {
  loading: () => <Loader />,
});
const About = dynamic(() => import("@/components/screens/InfoScreen"), {
  loading: () => <Loader />,
});
const Browser = dynamic(() => import("@/components/screens/browser/Browser"), {
  loading: () => <Loader />,
});
const SnakeGame = dynamic(() => import("@/components/screens/SnakeGame"), {
  loading: () => <Loader />,
});
const GuessGame = dynamic(() => import("@/components/screens/GuessGame"), {
  loading: () => <Loader />,
});
const MusicPlayer = dynamic(
  () => import("@/components/screens/music-player/iTunes"),
  {
    loading: () => <Loader />,
  },
);
const WeatherApp = dynamic(
  () => import("@/components/screens/weather-app/Weather"),
  {
    loading: () => <Loader />,
  },
);
const Calculator = dynamic(
  () => import("@/components/screens/calculator/Calculator"),
  {
    loading: () => <Loader />,
  },
);
const Clock = dynamic(() => import("@/components/screens/clock/Clock"), {
  loading: () => <Loader />,
});
const Calendar = dynamic(
  () => import("@/components/screens/calendar/CalendarApp"),
  {
    loading: () => <Loader />,
  },
);
const Notes = dynamic(() => import("@/components/screens/notes/NotesApp"), {
  loading: () => <Loader />,
});
const AppStore = dynamic(
  () => import("@/components/screens/app-store/MiStore"),
  {
    loading: () => <Loader />,
  },
);
const Chess = dynamic(() => import("@/components/screens/chess/Home"), {
  loading: () => <Loader />,
});

const Phone = () => {
  const { currentScreen } = usePhone();

  const renderScreen = () => {
    switch (currentScreen) {
      case "gallery": return <Gallery />;
      case "phone-dialer": return <PhoneDialer />;
      case "mail-composer": return <MailCompose />;
      case "info": return <About />;
      case "home": return <HomeScreen />;
      case "snake": return <SnakeGame />;
      case "guess": return <GuessGame />;
      case "screen-boot":
      case "screen-shutdown":
        return <BootScreen />;
      case "screen-lock": return <LockScreen />;
      case "chrome-browser": return <Browser />;
      case "music-player": return <MusicPlayer />;
      case "weather": return <WeatherApp />;
      case "calculator": return <Calculator />;
      case "clock": return <Clock />;
      case "calendar": return <Calendar />;
      case "notes": return <Notes />;
      case "app-store": return <AppStore />;
      case "camera": return <HomeScreen />;
      case "chess": return <Chess />
      case "chess": return <Chess />;
    }
  }

  // const screen: { [key: string]: React.JSX.Element } = {
  //   gallery: <Gallery />,
  //   "phone-dialer": <PhoneDialer />,
  //   "mail-composer": <MailCompose />,
  //   info: <About />,
  //   home: <HomeScreen />,
  //   snake: <SnakeGame />,
  //   guess: <GuessGame />,
  //   "screen-boot": <BootScreen />,
  //   "screen-shutdown": <BootScreen />,
  //   "screen-lock": <LockScreen />,
  //   "chrome-browser": <Browser />,
  //   "music-player": <MusicPlayer />,
  //   weather: <WeatherApp />,
  //   calculator: <Calculator />,
  //   clock: <Clock />,
  //   calendar: <Calendar />,
  //   notes: <Notes />,
  //   "app-store": <AppStore />,
  //   camera: <HomeScreen />,
  //   // camera: <Camera />,
  //   chess: <Chess />
  // };

  return (
    <div className="flex-center h-full flex-1 py-2">
      <Frame>{renderScreen()}</Frame>
    </div>
  );
};

export default Phone;
