"use client";

import React from "react";
import { LuAlarmClock, LuGlobe, LuHourglass, LuTimer } from "react-icons/lu";
import { useClock } from "@/context/ClockContext";
import {
  ClockAlarm,
  Stopwatch,
  Timer,
  WorldClock,
} from "@/components/screens/clock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ClockScreen } from "@/types";

const Clock = () => {
  const { currentClockScreen: tab, setCurrentClockScreen: setTab } = useClock();

  const tabTriggerStyle =
    "flex flex-col items-center gap-1 border-0 bg-transparent text-sm font-medium hover:bg-transparent hover:text-white/80";

  return (
    <div className="relative mt-10 h-full w-full">
      <Tabs
        defaultValue={tab}
        onValueChange={(value) => setTab(value as ClockScreen)}
      >
        <TabsList className="absolute bottom-12 left-0 flex h-14 w-full items-center justify-between rounded-t-2xl border-t border-white/10 bg-black py-3">
          <TabsTrigger className={tabTriggerStyle} value="alarm">
            <LuAlarmClock />
            <span className="text-xs">Alarm</span>
          </TabsTrigger>
          <TabsTrigger className={tabTriggerStyle} value="world">
            <LuGlobe />
            <span className="text-xs">World Clock</span>
          </TabsTrigger>
          <TabsTrigger className={tabTriggerStyle} value="timer">
            <LuHourglass />
            <span className="text-xs">Timer</span>
          </TabsTrigger>
          <TabsTrigger className={tabTriggerStyle} value="stopwatch">
            <LuTimer />
            <span className="text-xs">Stopwatch</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alarm">
          <ClockAlarm />
        </TabsContent>
        <TabsContent value="world">
          <WorldClock />
        </TabsContent>
        <TabsContent value="timer">
          <Timer />
        </TabsContent>
        <TabsContent value="stopwatch">
          <Stopwatch />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Clock;
