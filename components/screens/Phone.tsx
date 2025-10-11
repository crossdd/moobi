"use client";

import Loader from "@/components/Loader";
import Index from "@/components/screens/boot";
import Frame from "@/components/screens/Frame";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo } from "react";
import { ScreenOptions } from "@/types";
import { usePhoneStore } from "@/stores/usePhoneStore";

const screens: Record<ScreenOptions, () => Promise<any>> = {
  "screen-boot": () => import("@/components/screens/boot"),
  "screen-shutdown": () => import("@/components/screens/boot"),
  "screen-lock": () => import("@/components/screens/lock-screen/LockScreen"),
  home: () => import("@/components/screens/home/HomeScreen"),
  "phone-dialer": () => import("@/components/screens/phone-dialer/PhoneDialer"),
  "mail-composer": () => import("@/components/screens/mail/MailCompose"),
  info: () => import("@/components/screens/info/InfoScreen"),
  gallery: () => import("@/components/screens/gallery/Gallery"),
  "chrome-browser": () => import("@/components/screens/browser"),
  snake: () => import("@/components/screens/snake/SnakeGame"),
  guess: () => import("@/components/screens/guess/GuessGame"),
  "music-player": () => import("@/components/screens/music-player/iTunes"),
  weather: () => import("@/components/screens/weather-app/Weather"),
  calculator: () => import("@/components/screens/calculator"),
  clock: () => import("@/components/screens/clock/Clock"),
  calendar: () => import("@/components/screens/calendar"),
  notes: () => import("@/components/screens/notes/NotesApp"),
  "app-store": () => import("@/components/screens/app-store/MiStore"),
  chess: () => import("@/components/screens/chess/Home"),
  "live-dev": () => import("@/components/screens/live-dev/DevHome"),
  "file-manager": () => import("@/components/screens/home/HomeScreen"),
  camera: () => import("@/components/screens/home/HomeScreen"),
};

const dynamicScreens = Object.entries(screens).reduce(
  (acc, [key, importer]) => {
    acc[key as ScreenOptions] = dynamic(importer, {
      loading: () => <Loader />,
      ssr: false,
    });
    return acc;
  },
  {} as Record<ScreenOptions, React.ComponentType>,
);

const Phone = () => {
  const currentScreen = usePhoneStore((state) => state.currentScreen);

  const Screen = useMemo(() => dynamicScreens[currentScreen], [currentScreen]);
  const bootScreens = ["screen-boot", "screen-shutdown"];

  useEffect(() => {
    screens.home?.();
  }, []);

  return (
    <div className="flex-center h-full flex-1 py-2">
      <Frame>
        {bootScreens.includes(currentScreen) ? <Index /> : <Screen />}
      </Frame>
    </div>
  );
};

export default Phone;
