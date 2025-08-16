import React from "react";
import { LuBellRing } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { BiAlarmSnooze } from "react-icons/bi";
import { useClock } from "@/context/ClockContext";

const AlarmRingOverlay = () => {
  const {
    setAlarms,
    setRingingAlarmId,
    alarmAudioRef,
    ringingAlarmId,
    alarms,
  } = useClock();

  const now = new Date();
  const snoozeAlarm = (minutes = 9) => {
    setAlarms((prev) =>
      prev.map((a) =>
        a.id === ringingAlarmId
          ? { ...a, snoozeUntil: Date.now() + minutes * 60_000 }
          : a,
      ),
    );
    stopAlarm();
  };

  const stopAlarm = () => {
    if (alarmAudioRef.current) {
      try {
        alarmAudioRef.current.pause();
      } catch {}
    }
    setRingingAlarmId(null);
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/40 bg-red-500/20">
          <LuBellRing className="h-10 w-10 text-red-400" />
        </div>
        <div className="mb-1 text-3xl font-semibold text-white">
          {alarms.find((a) => a.id === ringingAlarmId)?.label || "ClockAlarm"}
        </div>
        <div className="text-sm text-white/70">
          {now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => snoozeAlarm(9)}
          className="h-12 w-28 rounded-full border-0 bg-white/20 text-white hover:bg-white/30"
        >
          <BiAlarmSnooze className="mr-2 h-4 w-4" />
          Snooze
        </Button>
        <Button
          onClick={stopAlarm}
          className="h-12 w-28 rounded-full border-0 bg-red-500 hover:bg-red-600"
        >
          Stop
        </Button>
      </div>
    </div>
  );
};
export default AlarmRingOverlay;
