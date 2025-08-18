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
}

const PhoneContext = createContext<ContextType | undefined>(undefined);

const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [lastScreen, setLastScreen] = useState<ScreenOptions>("home");
  const [currentScreen, setCurrentScreen] =
    useState<ScreenOptions>("screen-boot");
  const [showControlCenter, setShowControlCenter] = useState(false);

  return (
    <PhoneContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        lastScreen,
        setLastScreen,
        showControlCenter,
        setShowControlCenter,
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
