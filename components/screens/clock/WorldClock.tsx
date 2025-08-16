import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import AnalogClock from "@/components/screens/clock/AnalogClock";
import { Button } from "@/components/ui/button";
import { CgMoreVertical } from "react-icons/cg";
import SearchTimezone from "@/components/screens/clock/SearchTimezone";
import { useClock } from "@/context/ClockContext";
import { Timezone } from "@/types";

const WorldClock = () => {
  const { selectedTimezones, setSelectedTimezones } = useClock();
  const [screen, setScreen] = useState<"clock" | "search">("clock");

  const city = (tz: string) => {
    const parts = tz.split("/");
    return decodeURIComponent(parts[parts.length - 1]).replace(/_/g, " ");
  };

  const formatWorld = (iso: string) => {
    const d = new Date(iso);
    return {
      time: d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      date: d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  };
  const diffFromLocal = (iso: string) => {
    const remote = new Date(iso).getTime();
    const local = Date.now();
    const diffH = Math.round((remote - local) / 3_600_000);
    if (diffH === 0) return "Same time";
    return diffH > 0 ? `+${diffH}h` : `${diffH}h`;
  };

  if (screen === "search") {
    return (
      <div className="relative h-full w-full">
        <SearchTimezone setScreen={setScreen} />
      </div>
    );
  }

  const removeSelectedTimezone = (zone: Timezone) => {
    setSelectedTimezones((prev) =>
      prev.filter((tz) => tz.timezone !== zone.timezone),
    );
  };

  return (
    <div className="flex h-[30rem] w-full flex-col gap-2 px-3 text-white">
      <div className="flex items-end justify-end gap-1 text-white">
        <Button
          size="icon"
          variant="ghost"
          className="p-0"
          onClick={() => setScreen("search")}
        >
          <LuPlus />
        </Button>
        <Button size="icon" variant="ghost" className="p-0">
          <CgMoreVertical />
        </Button>
      </div>

      <h1 className="text-2xl">World clock</h1>

      <section className="no-visible-scrollbar relative flex min-h-0 flex-1 flex-col gap-4 overflow-y-scroll pb-12">
        <AnalogClock />

        {selectedTimezones.length === 0 ? (
          <div className="flex-center my-16 flex-1 text-center text-base text-gray-500">
            No clocks here
          </div>
        ) : (
          <>
            {selectedTimezones.map((w) => {
              const f = formatWorld(w.localTime);
              return (
                <div
                  key={w.timezone}
                  className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
                  onClick={() => removeSelectedTimezone(w)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-medium text-white">
                        {city(w.timezone)}
                      </div>
                      <div className="text-sm text-white/70">
                        {f.date} • {diffFromLocal(w.localTime)}
                      </div>
                    </div>
                    <div className="text-right font-mono text-2xl text-white">
                      {f.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </section>
    </div>
  );
};
export default WorldClock;
