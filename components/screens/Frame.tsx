"use client";

import StatusBar from "@/components/screens/StatusBar";
import React, { useState } from "react";
import { usePhoneStore } from "@/stores";
import ControlCenter from "@/components/screens/ControlCenter";
import { useClock } from "@/context/ClockContext";
import AlarmRingOverlay from "@/components/screens/clock/AlarmRingOverlay";
import HomeIndicator from "@/components/screens/HomeIndicator";
import AppSwitcher from "@/components/screens/AppSwitcher";
import ActionButtons from "@/components/ActionButtons";

const Frame = ({ children }: { children: React.ReactNode }) => {
  const [isOn, setIsOn] = useState(true);
  const { currentScreen, showControlCenter, brightness, showAppSwitcher } =
    usePhoneStore();
  const { ringingAlarmId } = useClock();

  const brightnessValue = 0.3 + (brightness / 100) * 0.9;

  const indicatorInvisible = ["screen-lock", "screen-shutdown", "screen-boot"];

  return (
    <div className="flex-center relative h-full gap-4">
      {/* iPhone 16 Body */}
      <div className="relative h-[600px] w-80 rounded-[3rem] bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900 p-2 shadow-2xl">
        {/* Power Button */}
        <div className="absolute -right-1 top-24 h-16 w-1 rounded-l-sm bg-gray-700"></div>

        {/* Volume Buttons */}
        <div className="absolute -left-1 top-20 h-8 w-1 rounded-r-sm bg-gray-700"></div>
        <div className="absolute -left-1 top-32 h-12 w-1 rounded-r-sm bg-gray-700"></div>

        {/* Action Button */}
        <div className="absolute -left-1 top-48 h-6 w-1 rounded-r-sm bg-orange-500"></div>

        {/* Screen */}
        <div
          className={`relative h-full w-full overflow-hidden rounded-[2.5rem] bg-black transition-all duration-300`}
          style={{
            transition: "filter 0.3s ease",
            filter: `brightness(${brightnessValue})`,
          }}
        >
          {/* Status Bar */}
          {isOn && (
            <div className="absolute -top-6 z-50 w-full">
              <StatusBar />
            </div>
          )}

          {/* Dynamic Island */}
          <div className="flex-center absolute left-1/2 top-4 z-50 h-8 w-32 -translate-x-1/2 transform rounded-full bg-white/5 backdrop-blur-lg">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-600"></div>
              <div className="h-3 w-3 rounded-full bg-gray-600"></div>
            </div>
          </div>

          {/* Screen Content */}
          {isOn && (
            <div
              id="phone-frame"
              className="relative h-full w-full overflow-hidden"
            >
              {showControlCenter && <ControlCenter />}
              {showAppSwitcher && <AppSwitcher />}
              {children}

              {ringingAlarmId && <AlarmRingOverlay />}
            </div>
          )}

          {isOn && !indicatorInvisible.includes(currentScreen) && (
            <HomeIndicator />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <ActionButtons isOn={isOn} setIsOn={setIsOn} />
    </div>
  );
};
export default Frame;
