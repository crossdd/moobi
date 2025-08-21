"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { type ScreenOptions } from "@/types";

interface ContextType {
  currentScreen: ScreenOptions;
  setCurrentScreen: Dispatch<SetStateAction<ScreenOptions>>;
  lastScreen: ScreenOptions;
  setLastScreen: Dispatch<SetStateAction<ScreenOptions>>;
  showControlCenter: boolean;
  setShowControlCenter: Dispatch<SetStateAction<boolean>>;
  brightness: number[];
  setBrightness: Dispatch<SetStateAction<number[]>>;
  volume: number[];
  setVolume: Dispatch<SetStateAction<number[]>>;
}

const PhoneContext = createContext<ContextType | undefined>(undefined);

const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [lastScreen, setLastScreen] = useState<ScreenOptions>("home");
  const [currentScreen, setCurrentScreen] =
    useState<ScreenOptions>("screen-boot");
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [brightness, setBrightness] = useState([75]);
  const [volume, setVolume] = useState([60]);

  return (
    <PhoneContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        lastScreen,
        setLastScreen,
        showControlCenter,
        setShowControlCenter,
        brightness,
        setBrightness,
        volume,
        setVolume,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

const usePhone = () => {
  const context = useContext(PhoneContext);

  if (context === undefined) {
    throw new Error("usePhone must be used within a Phone Provider");
  }

  return context;
};

export { PhoneProvider, usePhone };
