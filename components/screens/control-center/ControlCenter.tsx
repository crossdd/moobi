"use client";

import { Button } from "@/components/ui/button";
import { usePhone } from "@/context";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import {
  LuBluetooth,
  LuCalculator,
  LuMoon,
  LuPlane,
  LuSmartphone,
  LuSquare,
  LuSun,
  LuTimer,
  LuVolume2,
  LuWifi,
} from "react-icons/lu";
import { MdBattery3Bar } from "react-icons/md";
import CustomSlider from "./CustomSlider";
import MusicPlayerWidget from "../music-player/MusicPlayerWidget";
import { useTheme } from "next-themes";
import { ScreenOptions } from "@/types";
import { useSwipeable } from "react-swipeable";

interface ControlItem {
  id: string;
  icon: ReactNode;
  isActive: boolean;
  color?: string;
}

const ControlCenter = () => {
  const {
    showControlCenter,
    setShowControlCenter,
    brightness,
    setBrightness,
    volume,
    setVolume,
    setCurrentScreen,
  } = usePhone();
  const { theme, setTheme } = useTheme();

  const [connectivityControls, setConnectivityControls] = useState<
    ControlItem[]
  >([
    {
      id: "airplane",
      icon: <LuPlane className="h-6 w-6" />,
      isActive: false,
      color: "bg-orange-500",
    },
    {
      id: "wifi",
      icon: <LuWifi className="h-6 w-6" />,
      isActive: false,
      color: "bg-blue-500",
    },
    {
      id: "bluetooth",
      icon: <LuBluetooth className="h-6 w-6" />,
      isActive: false,
      color: "bg-blue-500",
    },
    {
      id: "cellular",
      icon: <LuSmartphone className="h-6 w-6" />,
      isActive: true,
      color: "bg-green-500",
    },
  ]);

  const quickActions = [
    {
      id: "clock",
      icon: <LuTimer className="h-8 w-8" />,
    },
    {
      id: "calculator",
      icon: <LuCalculator className="h-8 w-8" />,
    },
    {
      id: "screen-record",
      icon: <LuSquare className="h-8 w-8" />,
    },
    {
      id: "theme",
      icon: <LuMoon className="h-8 w-8" />,
    },
  ];

  const toggleConnectivityControl = (id: string) => {
    setConnectivityControls((prev) =>
      prev.map((control) =>
        control.id === id
          ? { ...control, isActive: !control.isActive }
          : control,
      ),
    );
  };

  const handleQuickActionClick = (id: string) => {
    if (id === "theme") {
      if (theme === "dark") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    } else {
      setShowControlCenter(false);
      setCurrentScreen(id as ScreenOptions);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      setShowControlCenter(false);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  return (
    <div
      className={cn(
        "no-visible-scrollbar absolute inset-0 z-40 overflow-y-scroll bg-white/20 backdrop-blur-lg transition-all duration-500 ease-out dark:bg-black/60",
        showControlCenter
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0",
      )}
    >
      <div className="flex h-full flex-col px-4 pb-8 pt-14">
        <div className="mb-4 grid max-h-32 grid-cols-2 gap-3">
          <div className="grid grid-cols-2 gap-3 rounded-xl bg-black/70 p-3">
            {connectivityControls.map((control) => (
              <Button
                key={control.id}
                onClick={() => toggleConnectivityControl(control.id)}
                className={`flex-center h-12 w-12 rounded-full border-0 transition-all duration-200 ${
                  control.isActive
                    ? `${control.color} scale-95 text-white shadow-lg`
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {control.icon}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl bg-black/70 p-3">
            {quickActions.slice(0, 3).map((action) => (
              <Button
                key={action.id}
                onClick={() => handleQuickActionClick(action.id)}
                className="flex-center h-10 w-10 rounded-full border-0 bg-white/10 text-white transition-all duration-200 hover:bg-white/20"
              >
                {action.icon}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-4 grid max-h-32 grid-cols-2 gap-3">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <CustomSlider
              icon={LuSun}
              value={brightness}
              onChange={setBrightness}
            />

            <CustomSlider
              icon={LuVolume2}
              value={volume}
              onChange={setVolume}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex-center h-10 gap-3 rounded-xl bg-black/70 text-white/90 backdrop-blur-xl">
              <MdBattery3Bar className="size-5 rotate-90" />
              <div className="text-xs">85%</div>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-black/70 p-3">
              {quickActions.slice(3).map((action) => (
                <Button
                  key={action.id}
                  onClick={() => handleQuickActionClick(action.id)}
                  className={cn(
                    "flex-center h-10 w-10 rounded-full border-0 !bg-white/10 text-white transition-all duration-100 ease-in-out",
                    action.id === "theme" &&
                      theme === "dark" &&
                      "!bg-white !text-black",
                  )}
                >
                  {action.icon}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <MusicPlayerWidget className="mt-4 w-full px-0" />

        <div className="h-8 w-full" {...swipeHandlers} />
      </div>
    </div>
  );
};

export default ControlCenter;
