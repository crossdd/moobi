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

const INIT_STATE: ContextType = {
  currentScreen: "boot",
  setCurrentScreen: () => {},
  lastScreen: "lock",
  setLastScreen: () => {},
  showControlCenter: false,
  setShowControlCenter: () => {},
};

const PhoneContext = createContext<ContextType>(INIT_STATE);

const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [lastScreen, setLastScreen] = useState<ScreenOptions>("home");
  const [currentScreen, setCurrentScreen] = useState<ScreenOptions>("boot");
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

const usePhone = () => useContext(PhoneContext);

export { PhoneProvider, usePhone };
