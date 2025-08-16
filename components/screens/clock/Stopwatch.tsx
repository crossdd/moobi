import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuPause, LuPlay, LuRotateCcw } from "react-icons/lu";
import { useClock } from "@/context/ClockContext";
import { CgMoreVertical } from "react-icons/cg";

type Lap = {
  id: number;
  timeMs: number;
  lapMs: number;
};

const Stopwatch = () => {
  const {
    elapsedSwTime,
    setElapsedSwTime,
    stopwatchIsRunning,
    setStopwatchIsRunning,
  } = useClock();

  const [laps, setLaps] = useState<Lap[]>([]);

  const formatMs = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${cs.toString().padStart(2, "0")}`;
  };

  const addLap = () => {
    if (!stopwatchIsRunning) return;
    const last = laps[0];
    const lapMs = last ? elapsedSwTime - last.timeMs : elapsedSwTime;
    const id = laps.length > 0 ? laps[0].id + 1 : 1;
    setLaps((prev) => [{ id, timeMs: elapsedSwTime, lapMs }, ...prev]);
  };

  const resetStopwatch = () => {
    setStopwatchIsRunning(false);
    setElapsedSwTime(0);
    setLaps([]);
  };

  return (
    <div className="flex h-[30rem] w-full flex-col gap-2 px-3 text-white">
      <div className="flex items-end justify-end text-white">
        <Button size="icon" variant="ghost" className="p-0">
          <CgMoreVertical />
        </Button>
      </div>

      <h1 className="text-2xl">Timer</h1>
      <div className="my-4 text-center font-mono text-6xl text-white">
        {formatMs(elapsedSwTime)}
      </div>
      <div className="flex-center gap-4">
        {!stopwatchIsRunning && elapsedSwTime === 0 && (
          <Button
            onClick={() => setStopwatchIsRunning(true)}
            className="h-16 w-16 rounded-full border-0 bg-green-500 hover:bg-green-600"
          >
            <LuPlay className="h-8 w-8 text-white" />
          </Button>
        )}
        {stopwatchIsRunning && (
          <>
            <Button
              onClick={addLap}
              className="h-16 w-16 rounded-full border-0 bg-blue-500 hover:bg-blue-600"
            >
              <span className="text-sm font-bold text-white">LAP</span>
            </Button>
            <Button
              onClick={() => setStopwatchIsRunning(false)}
              className="h-16 w-16 rounded-full border-0 bg-orange-500 hover:bg-orange-600"
            >
              <LuPause className="h-8 w-8 text-white" />
            </Button>
          </>
        )}
        {!stopwatchIsRunning && elapsedSwTime > 0 && (
          <>
            <Button
              onClick={resetStopwatch}
              className="h-16 w-16 rounded-full border-0 bg-red-500 hover:bg-red-600"
            >
              <LuRotateCcw className="h-8 w-8 text-white" />
            </Button>
            <Button
              onClick={() => setStopwatchIsRunning(true)}
              className="h-16 w-16 rounded-full border-0 bg-green-500 hover:bg-green-600"
            >
              <LuPlay className="h-8 w-8 text-white" />
            </Button>
          </>
        )}
      </div>

      {laps.length > 0 && (
        <div className="max-h-64 w-full overflow-y-auto">
          <div className="rounded-xl border border-white/20 bg-white/10">
            {laps.map((lap, idx) => (
              <div
                key={lap.id}
                className={`flex items-center justify-between p-4 ${
                  idx < laps.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className="text-white/70">{lap.id}</span>
                <div className="text-right">
                  <div className="font-mono text-white">
                    {formatMs(lap.timeMs)}
                  </div>
                  <div className="font-mono text-xs text-white/50">
                    +{formatMs(lap.lapMs)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Stopwatch;
