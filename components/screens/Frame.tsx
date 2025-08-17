"use client";

import StatusBar from "@/components/screens/StatusBar";
import { LuPower, LuPowerOff } from "react-icons/lu";
import { TbSmartHome, TbTriangle } from "react-icons/tb";
import React, { useState } from "react";
import { usePhone } from "@/context/PhoneContext";
import { useBrowser } from "@/context/BrowserContext";
import { useMusic } from "@/context/MusicContext";
import { MusicPlayerScreen } from "@/types";
import ControlCenter from "@/components/screens/control-center/ControlCenter";
import { useClock } from "@/context/ClockContext";
import AlarmRingOverlay from "@/components/screens/clock/AlarmRingOverlay";
import HomeIndicator from "@/components/screens/HomeIndicator";

const Frame = ({ children }: { children: React.ReactNode }) => {
  const [isOn, setIsOn] = useState(true);
  const {
    currentScreen,
    setCurrentScreen,
    lastScreen,
    setLastScreen,
    showControlCenter,
  } = usePhone();
  const { currentBrowserScreen, setCurrentBrowserScreen } = useBrowser();
  const { currentPlayerScreen, setCurrentPlayerScreen } = useMusic();
  const { ringingAlarmId } = useClock();

  let pressTimer: NodeJS.Timeout;

  const handlePressStart = () => {
    pressTimer = setTimeout(() => {
      togglePhoneState();
    }, 1000);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer);
  };

  const handleClick = () => {
    clearTimeout(pressTimer);

    if (currentScreen === "shutdown" || currentScreen === "boot") return;

    toggleScreenOnOff();
  };

  const toggleScreenOnOff = () => {
    if (isOn) {
      if (currentScreen !== "lock") {
        setLastScreen(currentScreen);
      }

      setIsOn(false);
    } else {
      setIsOn(true);
      setCurrentScreen("lock");
    }
  };

  const togglePhoneState = () => {
    if (currentScreen !== "shutdown") {
      setLastScreen("home");
      setCurrentScreen("shutdown");
    } else {
      setCurrentScreen("boot");
    }
  };

  const isCurrentlyOn = currentScreen !== "shutdown" && isOn;

  const backAction = () => {
    switch (currentScreen) {
      case "home":
        break;
      case "chrome":
        if (currentBrowserScreen === "browser-frame") {
          setCurrentBrowserScreen("browser-search-results");
        } else if (currentBrowserScreen !== "browser-home") {
          setCurrentBrowserScreen("browser-home");
        } else {
          setCurrentScreen("home");
        }
        break;
      case "itunes":
        if (currentPlayerScreen === "nowPlaying") {
          setCurrentPlayerScreen(lastScreen as MusicPlayerScreen);
        } else {
          setCurrentScreen("home");
        }
        break;
      default:
        setCurrentScreen("home");
        break;
    }
  };

  return (
    <div className="flex-center relative h-full gap-4">
      {/* iPhone 16 Body */}
      <div className="relative h-[600px] w-80 rounded-[3rem] bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900 p-2 shadow-2xl">
        {/* Power Button */}
        <div className="absolute -right-1 top-24 h-16 w-1 rounded-l-sm bg-gray-700"></div>

        {/* Volume Buttons */}
        <div className="absolute -left-1 top-20 h-8 w-1 rounded-r-sm bg-gray-700"></div>
        <div className="absolute -left-1 top-32 h-12 w-1 rounded-r-sm bg-gray-700"></div>

        {/* Action Button (new in iPhone 15/16) */}
        <div className="absolute -left-1 top-48 h-6 w-1 rounded-r-sm bg-orange-500"></div>

        {/* Screen */}
        <div
          className={`relative h-full w-full overflow-hidden rounded-[2.5rem] bg-black transition-all duration-300`}
        >
          {/* Status Bar */}
          {isOn && (
            <div className="absolute -top-6 z-50 w-full">
              <StatusBar />
            </div>
          )}

          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2 z-50 flex h-8 w-32 -translate-x-1/2 transform items-center justify-center rounded-full bg-black">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-800"></div>
              <div className="h-3 w-3 rounded-full bg-gray-800"></div>
            </div>
          </div>

          {/* Screen Content */}
          {isOn && (
            <div className="relative h-full w-full overflow-hidden">
              {showControlCenter && <ControlCenter />}
              {children}

              {ringingAlarmId && <AlarmRingOverlay />}
            </div>
          )}

          <HomeIndicator />
        </div>
      </div>

      {/* Power Button Toggle */}
      <div className="flex flex-col gap-5 rounded-md bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900">
        <button
          onMouseDown={handlePressStart}
          onTouchStart={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchEnd={handlePressEnd}
          onClick={handleClick}
          className="rounded-lg p-2 text-sm text-white transition-colors hover:bg-gray-700"
        >
          {isCurrentlyOn ? <LuPowerOff size={19} /> : <LuPower size={19} />}
        </button>

        <button
          onClick={() => setCurrentScreen("home")}
          disabled={!isOn || currentScreen === "home"}
          className="rounded-lg p-2 text-sm text-white transition-colors hover:bg-gray-700"
        >
          <TbSmartHome size={19} />
        </button>

        <button
          disabled={
            !isOn ||
            currentScreen === "home" ||
            currentScreen === "lock" ||
            currentScreen === "shutdown" ||
            currentScreen === "boot"
          }
          onClick={backAction}
          className="-rotate-90 rounded-lg p-2 text-sm text-white transition-colors hover:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          <TbTriangle size={19} />
        </button>
      </div>
    </div>
  );
};
export default Frame;
