"use client";

import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import { usePhone } from "@/context/PhoneContext";
import LockScreen from "@/components/screens/LockScreen";
import Frame from "@/components/screens/Frame";
import BootScreen from "@/components/screens/BootScreen";

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

const Phone = () => {
  const { currentScreen } = usePhone();

  const screen: { [key: string]: React.JSX.Element } = {
    gallery: <Gallery />,
    phone: <PhoneDialer />,
    mail: <MailCompose />,
    info: <About />,
    home: <HomeScreen />,
    snake: <SnakeGame />,
    guess: <GuessGame />,
    boot: <BootScreen />,
    shutdown: <BootScreen />,
    chrome: <Browser />,
    itunes: <MusicPlayer />,
    lock: <LockScreen />,
    weather: <WeatherApp />,
    calculator: <Calculator />,
    clock: <Clock />,
    calendar: <Calendar />,
  };

  return (
    <div className="flex-center h-full flex-1 py-2">
      <Frame>{screen[currentScreen]}</Frame>
    </div>
  );
};

export default Phone;
