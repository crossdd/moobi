import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuCheck, LuX } from "react-icons/lu";
import Picker from "react-mobile-picker";
import { useClock } from "@/context/ClockContext";
import { type Alarm } from "@/types";

type AlarmRepeatMode = "once" | "daily" | "weekday";

const AlarmModal = ({
  setIsAdding,
  alarmToEdit: data,
  setAlarmToEdit,
}: {
  setIsAdding: Dispatch<SetStateAction<boolean>>;
  alarmToEdit?: Alarm;
  setAlarmToEdit: Dispatch<SetStateAction<Alarm | null>>;
}) => {
  const { setAlarms } = useClock();

  const [title, setTitle] = useState(data?.label ?? "");
  const [repeatMode, setRepeatMode] = useState<AlarmRepeatMode>(
    data?.repeatMode ?? "once",
  );
  const [time, setTime] = useState(
    data
      ? { hour: data.time.split(":")[0], minute: data.time.split(":")[1] }
      : { hour: "16", minute: "32" },
  );

  const hours = Array.from({ length: 25 }, (_, i) =>
    String(i).padStart(2, "0"),
  );
  const minutes = Array.from({ length: 61 }, (_, i) =>
    String(i).padStart(2, "0"),
  );

  const getTimeInterval = (hour: number, minute: number) => {
    const now = new Date();

    let target = new Date();
    target.setHours(hour, minute, 0, 0);

    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const diffMs = target.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;

    return { hours: diffHours, minutes: remainingMinutes };
  };

  const addAlarm = () => {
    setAlarms((prev) => {
      if (data) {
        return prev.map((alarm) =>
          alarm.id === data.id
            ? {
                ...alarm,
                time: `${time.hour}:${time.minute}`,
                label: title,
                repeatMode,
              }
            : alarm,
        );
      } else {
        return [
          ...prev,
          {
            id: prev.length === 0 ? 1 : prev[prev.length - 1].id + 1,
            time: `${time.hour}:${time.minute}`,
            label: title,
            enabled: true,
            repeatMode,
          },
        ];
      }
    });

    setTitle("");
    setTime({ hour: "16", minute: "32" });
    setRepeatMode("once");

    closeModal();
  };

  const { hours: hourInterval, minutes: minuteInterval } = getTimeInterval(
    parseInt(time.hour),
    parseInt(time.minute),
  );

  const closeModal = () => {
    setAlarmToEdit(null);
    setIsAdding(false);
  };

  return (
    <div className="absolute left-0 top-16 flex h-[26rem] w-full flex-col items-center rounded-t-xl bg-neutral-900 px-3">
      <div className="flex-center my-1.5 h-1 w-10 rounded-full bg-neutral-700" />

      <div className="flex w-full items-center justify-between">
        <Button
          className="bg-transparent p-0 text-white hover:bg-transparent"
          onClick={closeModal}
        >
          <LuX />
        </Button>

        <div className="text-center">
          <h2 className="text-lg text-gray-200">Add Alarm</h2>
          <p className="text-xs text-gray-400">
            Alarm in {hourInterval} hours {minuteInterval} minutes
          </p>
        </div>

        <Button
          className="bg-transparent p-0 text-white hover:bg-transparent"
          onClick={addAlarm}
        >
          <LuCheck />
        </Button>
      </div>

      <div className="mt-4 w-full">
        <div className="flex-center mx-auto w-full max-w-36 flex-col text-white">
          <div className="flex items-center gap-12 text-white/40">
            <div>H</div>
            <div>M</div>
          </div>
          <Picker
            value={time}
            onChange={setTime}
            height={180}
            itemHeight={36}
            className="flex-center relative w-full gap-12"
            wheelMode="natural"
          >
            <Picker.Column name="hour">
              {hours.slice(1).map((h) => (
                <Picker.Item key={h} value={h} className="text-lg">
                  {({ selected }) => (
                    <div style={{ color: selected ? "red" : "white" }}>{h}</div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="minute">
              {minutes.slice(1).map((m) => (
                <Picker.Item key={m} value={m} className="text-lg">
                  {({ selected }) => (
                    <div style={{ color: selected ? "red" : "white" }}>{m}</div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>

        <div className="relative flex w-full items-center justify-between rounded-xl bg-neutral-700 p-2">
          <label className="text-base text-white">Repeat</label>
          <select
            className="ml-2 w-full max-w-24 appearance-none rounded-lg bg-neutral-700 text-right text-white/70 focus:outline-none"
            value={repeatMode}
            onChange={(e) => setRepeatMode(e.target.value as AlarmRepeatMode)}
          >
            <option value="once" className="text-white">
              Once
            </option>
            <option value="daily" className="text-white">
              Daily
            </option>
            <option value="weekday" className="text-white">
              Mon - Fri
            </option>
          </select>
        </div>

        <div className="relative mt-4 flex w-full items-center justify-between rounded-xl bg-neutral-700 p-2">
          <label className="text-base text-white">Label</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter label"
            className="ml-2 w-full rounded-lg bg-transparent text-right text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
export default AlarmModal;
