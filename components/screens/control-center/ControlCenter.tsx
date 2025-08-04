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
  LuWifi
} from "react-icons/lu";
import { MdBattery3Bar } from "react-icons/md";
import CustomSlider from "./CustomSlider";
import MusicPlayerWidget from "../music-player/MusicPlayerWidget";

interface ControlItem {
  id: string;
  icon: ReactNode;
  isActive: boolean;
  color?: string;
}

const ControlCenter = () => {
  const { showControlCenter, setShowControlCenter } = usePhone();
  const [brightness, setBrightness] = useState([75]);
  const [volume, setVolume] = useState([60]);

  // Connectivity Controls
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

  // Quick Action Controls
  const [quickActions, setQuickActions] = useState([
    {
      id: "timer",
      icon: <LuTimer className="h-8 w-8" />,
      isActive: false,
      color: "bg-orange-500",
    },
    {
      id: "calculator",
      icon: <LuCalculator className="h-8 w-8" />,
      isActive: false,
      color: "bg-gray-700",
    },
    {
      id: "screen-record",
      icon: <LuSquare className="h-8 w-8" />,
      isActive: false,
      color: "bg-red-500",
    },
    {
      id: "theme",
      icon: <LuMoon className="h-8 w-8" />,
      activeIcon: <LuSun className="h-8 w-8" />,
      isActive: true,
      color: "bg-red-500",
    },
  ]);

  const toggleConnectivityControl = (id: string) => {
    setConnectivityControls((prev) =>
      prev.map((control) =>
        control.id === id
          ? { ...control, isActive: !control.isActive }
          : control,
      ),
    );
  };

  const toggleQuickAction = (id: string) => {
    setQuickActions((prev) =>
      prev.map((action) =>
        action.id === id ? { ...action, isActive: !action.isActive } : action,
      ),
    );
  };

  return (
    <div
      className={cn("no-visible-scrollbar absolute inset-0 z-40 overflow-y-scroll transition-all duration-500 ease-out bg-black/60 backdrop-blur-lg",
        showControlCenter
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
    >
      <div className="flex h-full flex-col px-4 pb-8 pt-14">
        <div className="mb-4 grid grid-cols-2 gap-3 max-h-32">
          <div className="grid grid-cols-2 gap-3 bg-black/70 p-3 rounded-xl">
            {connectivityControls.map((control) => (
              <Button
                key={control.id}
                onClick={() => toggleConnectivityControl(control.id)}
                className={`flex-center w-12 h-12 rounded-full border-0 transition-all duration-200 ${control.isActive
                  ? `${control.color} scale-95 text-white shadow-lg`
                  : "bg-white/20 text-white hover:bg-white/30"
                  }`}
              >
                {control.icon}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 bg-black/70 p-3 rounded-xl">
            {quickActions.slice(0, 3).map((action) => (
              <Button
                key={action.id}
                onClick={() => toggleQuickAction(action.id)}
                className={`flex-center w-10 h-10 rounded-full border-0 transition-all duration-200 ${action.isActive
                  ? `${action.color} scale-95 text-white shadow-lg`
                  : "bg-white/10 text-white hover:bg-white/20"
                  }`}
              >
                {action.icon}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 max-h-32">
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
            <div className="h-10 rounded-xl bg-black/30 backdrop-blur-xl flex-center gap-3 text-white/90">
              <MdBattery3Bar className="rotate-90 size-5" />
              <div className="text-xs ">85%</div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-black/70 p-3 rounded-xl">
              {quickActions.slice(3, 10).map((action) => (
                <Button
                  key={action.id}
                  onClick={() => toggleQuickAction(action.id)}
                  className={`flex-center w-10 h-10 rounded-full border-0 transition-all duration-200 ${action.isActive
                    ? `${action.color} scale-95 text-white shadow-lg`
                    : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                >

                  {action.id === 'theme' ? (action.isActive ? action.activeIcon : action.icon) : action.icon}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <MusicPlayerWidget className="w-full mt-4 px-0" />

        <div className="py-3 flex justify-center">
          <Button
            onClick={() => setShowControlCenter(false)}
            className="rounded-full border-0 bg-white/20 px-6 py-2 text-white hover:bg-white/30"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;

