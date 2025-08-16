"use client";

import React, { ReactNode } from "react";
import { LuAlarmClock, LuGlobe, LuHourglass, LuTimer } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useClock } from "@/context/ClockContext";
import { type ClockScreen } from "@/types";
import {
  ClockAlarm,
  WorldClock,
  Timer,
  Stopwatch,
} from "@/components/screens/clock";

const Clock = () => {
  const { currentClockScreen: tab, setCurrentClockScreen: setTab } = useClock();

  return (
    <div className="relative mt-10 h-full w-full">
      <div className="flex-1 overflow-y-auto pb-6">
        {tab === "alarm" && <ClockAlarm />}

        {tab === "world" && <WorldClock />}

        {tab === "timer" && <Timer />}

        {tab === "stopwatch" && <Stopwatch />}
      </div>

      <div className="absolute bottom-12 left-0 flex w-full items-center justify-between rounded-t-2xl border-t border-white/10 bg-black py-3">
        <TabTrigger
          tab={tab}
          setTab={setTab}
          icon={<LuAlarmClock />}
          title="Alarm"
        />
        <TabTrigger
          tab={tab}
          setTab={setTab}
          icon={<LuGlobe />}
          title="World"
        />
        <TabTrigger
          tab={tab}
          setTab={setTab}
          icon={<LuHourglass />}
          title="StopWatch"
        />
        <TabTrigger
          tab={tab}
          setTab={setTab}
          icon={<LuTimer />}
          title="Timer"
        />
      </div>
    </div>
  );
};

export default Clock;

const TabTrigger = ({
  icon,
  title,
  setTab,
  tab,
}: {
  tab: ClockScreen;
  setTab: React.Dispatch<React.SetStateAction<ClockScreen>>;
  icon: ReactNode;
  title: string;
}) => {
  return (
    <Button
      onClick={() => setTab(title.toLowerCase() as ClockScreen)}
      className={`flex flex-col items-center gap-1 border-0 bg-transparent text-sm font-medium hover:bg-transparent hover:text-white/80 ${
        tab === title.toLowerCase() ? "text-white" : "text-white/60"
      }`}
    >
      {icon}
      <span className="text-xs">{title}</span>
    </Button>
  );
};
