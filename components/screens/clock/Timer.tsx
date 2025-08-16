import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuPause, LuPlay, LuSquare } from "react-icons/lu";
import Picker from "react-mobile-picker";
import { CgMoreVertical } from "react-icons/cg";
import { useClock } from "@/context/ClockContext";

const Timer = () => {
  const {
    timerTotal,
    setTimerTotal,
    timerIsRunning,
    setTimerIsRunning,
    timerIsPaused,
    setTimerIsPaused,
  } = useClock();
  const [timer, setTimer] = useState({
    hour: "00",
    minute: "10",
    seconds: "10",
  });

  const startTimer = () => {
    if (timerTotal === 0) {
      const hoursToSeconds = parseInt(timer.hour) * 60 * 60;
      const minutesToSeconds = parseInt(timer.minute) * 60;
      const seconds = parseInt(timer.seconds);
      setTimerTotal(hoursToSeconds + minutesToSeconds + seconds);
    }
    setTimerIsRunning(true);
    setTimerIsPaused(false);
  };
  const pauseTimer = () => setTimerIsPaused(true);
  const resetTimer = () => {
    setTimerIsRunning(false);
    setTimerIsPaused(false);
    setTimerTotal(0);
  };
  const formatTimer = (total: number) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0"),
  );
  const seconds = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0"),
  );

  return (
    <div className="flex h-[30rem] w-full flex-col gap-2 px-3 text-white">
      <div className="flex items-end justify-end text-white">
        <Button size="icon" variant="ghost" className="p-0">
          <CgMoreVertical />
        </Button>
      </div>

      <h1 className="text-2xl">Timer</h1>
      <div className="my-4 text-center font-mono text-6xl text-white">
        {(timerIsRunning || timerIsPaused) && formatTimer(timerTotal)}
      </div>

      {!timerIsRunning && !timerIsPaused && (
        <div className="flex-center w-full flex-col text-white">
          <Picker
            value={timer}
            onChange={setTimer}
            height={220}
            itemHeight={39}
            className="flex-center relative w-full text-3xl"
            wheelMode="natural"
          >
            <Picker.Column name="hour">
              {hours.map((h) => (
                <Picker.Item key={h} value={h}>
                  {({ selected }) => (
                    <div style={{ color: selected ? "blueviolet" : "white" }}>
                      {h}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>

            <div className="text-white">:</div>
            <Picker.Column name="minute">
              {minutes.map((m) => (
                <Picker.Item key={m} value={m}>
                  {({ selected }) => (
                    <div style={{ color: selected ? "blueviolet" : "white" }}>
                      {m}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>

            <div className="text-white">:</div>
            <Picker.Column name="seconds">
              {seconds.map((s) => (
                <Picker.Item key={s} value={s}>
                  {({ selected }) => (
                    <div style={{ color: selected ? "blueviolet" : "white" }}>
                      {s}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}

      {/* Controls */}
      <div className="flex-center gap-4">
        {!timerIsRunning && !timerIsPaused && (
          <Button
            onClick={startTimer}
            className="h-16 w-16 rounded-full border-0 bg-green-500 hover:bg-green-600"
          >
            <LuPlay className="h-8 w-8 text-white" />
          </Button>
        )}
        {timerIsRunning && !timerIsPaused && (
          <Button
            onClick={pauseTimer}
            className="h-16 w-16 rounded-full border-0 bg-orange-500 hover:bg-orange-600"
          >
            <LuPause className="h-8 w-8 text-white" />
          </Button>
        )}
        {timerIsPaused && (
          <Button
            onClick={startTimer}
            className="h-16 w-16 rounded-full border-0 bg-green-500 hover:bg-green-600"
          >
            <LuPlay className="h-8 w-8 text-white" />
          </Button>
        )}
        {(timerIsRunning || timerIsPaused) && (
          <Button
            onClick={resetTimer}
            className="h-16 w-16 rounded-full border-0 bg-red-500 hover:bg-red-600"
          >
            <LuSquare className="h-8 w-8 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};
export default Timer;
