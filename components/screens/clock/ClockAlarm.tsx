import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuBellOff, LuPlus } from "react-icons/lu";
import { CgMoreVertical } from "react-icons/cg";
import { useClock } from "@/context/ClockContext";
import AlarmModal from "@/components/screens/clock/AlarmModal";
import { cn } from "@/lib/utils";
import { type Alarm } from "@/types";

const ClockAlarm = () => {
  const { alarms, setAlarms } = useClock();
  const [alarmToEdit, setAlarmToEdit] = useState<Alarm | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  let pressTimer: NodeJS.Timeout;

  const toggleAlarm = (id: number) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    );
  };

  const deleteAlarm = (id: number) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  const handlePressStart = (id: number) => {
    pressTimer = setTimeout(() => {
      deleteAlarm(id);
    }, 500);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer);
  };

  const handleClick = (alarm: Alarm) => {
    clearTimeout(pressTimer);
    setAlarmToEdit(alarm);
  };

  return (
    <div className="relative h-[29rem] w-full overflow-hidden px-3">
      <div onClick={() => setIsAdding(false)} className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-end">
            <Button className="bg-transparent p-0 text-white">
              <CgMoreVertical />
            </Button>
          </div>

          <h1 className="text-2xl text-white">Alarm</h1>

          <Button
            size="lg"
            className="absolute bottom-0 right-2 h-10 w-10 rounded-full bg-neutral-900 p-0 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsAdding(true);
            }}
          >
            <LuPlus />
          </Button>
        </div>

        {/* ClockAlarm list */}
        {alarms.length === 0 ? (
          <div className="py-12 text-center text-white/60">
            <LuBellOff className="mx-auto mb-3 h-10 w-10" />
            No alarms yet
          </div>
        ) : (
          <div className="space-y-3">
            {alarms
              .slice()
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-white/20 bg-white/10 p-4"
                  onMouseDown={() => handlePressStart(a.id)}
                  onTouchStart={() => handlePressStart(a.id)}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onTouchEnd={handlePressEnd}
                  onClick={() => handleClick(a)}
                >
                  <div className="flex min-w-0 flex-1 items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-lg text-white">{a.time}</div>
                      <div className="text-sm capitalize text-gray-400">
                        {a.repeatMode} {a.label && `| ${a.label}`}
                      </div>
                    </div>

                    <div
                      className="flex h-2 w-8 transform items-center rounded-full bg-neutral-700 transition-opacity ease-in-out"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAlarm(a.id);
                      }}
                    >
                      <div
                        className={cn(
                          "h-4 w-1/2 rounded-full bg-blue-500",
                          a.enabled && "opacity-0",
                        )}
                      />
                      <div
                        className={cn(
                          "h-4 w-1/2 rounded-full bg-blue-500",
                          !a.enabled && "opacity-0",
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {(isAdding || alarmToEdit) && (
        <AlarmModal
          setIsAdding={setIsAdding}
          alarmToEdit={alarmToEdit!}
          setAlarmToEdit={setAlarmToEdit}
        />
      )}
    </div>
  );
};
export default ClockAlarm;
