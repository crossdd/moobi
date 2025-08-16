"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { type Alarm, type ClockScreen, type Timezone } from "@/types";

interface ContextType {
  currentClockScreen: ClockScreen;
  setCurrentClockScreen: Dispatch<SetStateAction<ClockScreen>>;
  timezones: Timezone[];
  setTimezones: Dispatch<SetStateAction<Timezone[]>>;
  selectedTimezones: Timezone[];
  setSelectedTimezones: Dispatch<SetStateAction<Timezone[]>>;
  alarms: Alarm[];
  setAlarms: Dispatch<SetStateAction<Alarm[]>>;
  ringingAlarmId: number | null;
  setRingingAlarmId: Dispatch<SetStateAction<number | null>>;
  alarmAudioRef: RefObject<HTMLAudioElement | null>;

  // STOPWATCH
  elapsedSwTime: number;
  setElapsedSwTime: Dispatch<SetStateAction<number>>;
  stopwatchIsRunning: boolean;
  setStopwatchIsRunning: Dispatch<SetStateAction<boolean>>;

  // TIMER
  timerIsRunning: boolean;
  setTimerIsRunning: Dispatch<SetStateAction<boolean>>;
  timerIsPaused: boolean;
  setTimerIsPaused: Dispatch<SetStateAction<boolean>>;
  timerTotal: number;
  setTimerTotal: Dispatch<SetStateAction<number>>;
}

const ClockContext = createContext<ContextType | undefined>(undefined);

const ClockProvider = ({ children }: { children: ReactNode }) => {
  const [currentClockScreen, setCurrentClockScreen] =
    useState<ClockScreen>("alarm");
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [selectedTimezones, setSelectedTimezones] = useState<Timezone[]>([]);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [ringingAlarmId, setRingingAlarmId] = useState<number | null>(null);
  const [elapsedSwTime, setElapsedSwTime] = useState(0);
  const [stopwatchIsRunning, setStopwatchIsRunning] = useState(false);

  // TIMER
  const [timerTotal, setTimerTotal] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timerIsPaused, setTimerIsPaused] = useState(false);

  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ALARM
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const checkAlarms = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const hhmm = `${hh}:${mm}`;
      const key = fmtTodayKey(d, hhmm);

      setAlarms((prev) => {
        let updated = prev;
        for (const a of prev) {
          if (!a.enabled) continue;

          // Snooze check
          if (a.snoozeUntil && Date.now() >= a.snoozeUntil) {
            if (ringingAlarmId !== a.id) {
              setRingingAlarmId(a.id);
              tryPlayAlarm();
              updated = updated.map((x) =>
                x.id === a.id
                  ? { ...x, snoozeUntil: undefined, lastTriggerKey: key }
                  : x,
              );
              break;
            }
          }

          if (a.time === hhmm) {
            if (a.lastTriggerKey !== key) {
              setRingingAlarmId(a.id);
              tryPlayAlarm();
              updated = updated.map((x) =>
                x.id === a.id ? { ...x, lastTriggerKey: key } : x,
              );
              break;
            }
          }
        }
        return updated;
      });

      const now = new Date();
      const msUntilNextMinute =
        60_000 - (now.getSeconds() * 1000 + now.getMilliseconds());
      timeout = setTimeout(checkAlarms, msUntilNextMinute);
    };

    checkAlarms();
    return () => clearTimeout(timeout);
  }, [ringingAlarmId]);

  // STOPWATCH
  useEffect(() => {
    if (stopwatchIsRunning) {
      stopwatchRef.current = setInterval(
        () => setElapsedSwTime((v) => v + 10),
        10,
      );
    } else if (stopwatchRef.current) {
      clearInterval(stopwatchRef.current);
    }
    return () => {
      if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    };
  }, [stopwatchIsRunning]);

  // TIMER
  useEffect(() => {
    if (timerIsRunning && !timerIsPaused) {
      timerRef.current = setInterval(() => {
        setTimerTotal((prev) => {
          if (prev <= 1) {
            setTimerIsRunning(false);
            setTimerIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerIsRunning, timerIsPaused]);

  const fmtTodayKey = (date: Date, hhmm: string) => {
    const iso = date.toISOString().slice(0, 10);
    return `${iso}T${hhmm}`;
  };

  const tryPlayAlarm = async () => {
    if (alarmAudioRef.current) {
      alarmAudioRef.current.loop = true;
      alarmAudioRef.current.currentTime = 0;
      try {
        await alarmAudioRef.current.play();
      } catch (err: any) {
        console.warn("Autoplay blocked; user interaction required", err);
      }
    }
  };

  return (
    <ClockContext.Provider
      value={{
        timezones,
        selectedTimezones,
        currentClockScreen,
        setTimezones,
        setSelectedTimezones,
        setCurrentClockScreen,
        alarms,
        setAlarms,
        ringingAlarmId,
        setRingingAlarmId,
        alarmAudioRef,
        elapsedSwTime,
        setElapsedSwTime,
        stopwatchIsRunning,
        setStopwatchIsRunning,
        timerIsRunning,
        setTimerIsRunning,
        timerIsPaused,
        setTimerIsPaused,
        timerTotal,
        setTimerTotal,
      }}
    >
      <audio
        ref={alarmAudioRef}
        src="/sounds/alarm.wav"
        preload="auto"
        className="hidden"
      />
      {children}
    </ClockContext.Provider>
  );
};

const useClock = () => {
  const context = useContext(ClockContext);

  if (context === undefined) {
    throw new Error("useClock must be used within a Clock Provider");
  }

  return context;
};

export { ClockProvider, useClock };
