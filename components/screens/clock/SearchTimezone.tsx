import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useClock } from "@/context/ClockContext";
import { Timezone } from "@/types";
import { IoRefresh } from "react-icons/io5";

interface TimezoneWithUtc extends Timezone {
  currentUtcOffset: any;
}

const SearchTimezone = ({
  setScreen,
}: {
  setScreen: Dispatch<SetStateAction<"search" | "clock">>;
}) => {
  const { timezones, setTimezones, setSelectedTimezones } = useClock();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (timezones.length === 0) {
      fetchTimezones();
    }
  }, [timezones]);

  const fetchTimezones = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/clock/timezones");

      const responseData: {
        success: boolean;
        error?: string;
        data?: TimezoneWithUtc[];
      } = await res.json();

      if (responseData.success && responseData.data) {
        const data: Timezone[] = responseData.data
          .filter((tz) => {
            const parts = tz.timezone.split("/");
            const region = parts[parts.length - 1];

            return (
              region !== "Eastern" &&
              region !== "Pacific" &&
              region !== "Mountain" &&
              region !== "Samoa" &&
              region !== "Central"
            );
          })
          .map((tz) => {
            const utcOffset = formatUtcOffset(tz.currentUtcOffset.seconds);
            return {
              timezone: tz.timezone,
              localTime: tz.localTime,
              utcOffset,
            };
          });

        setTimezones(data);
        return;
      }

      setError(responseData.error!);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimezoneSelect = (zone: Timezone) => {
    setSelectedTimezones((prev) => {
      if (prev.length === 0) {
        return [zone];
      }

      const exists = prev.findIndex((tz) => tz.timezone === zone.timezone);

      if (exists === -1) {
        return [zone, ...prev];
      } else {
        return [...prev];
      }
    });
    setScreen("clock");
  };

  const formatUtcOffset = (offsetSeconds: number) => {
    const sign = offsetSeconds >= 0 ? "+" : "-";
    const absOffset = Math.abs(offsetSeconds);
    const hours = Math.floor(absOffset / 3600);
    const minutes = Math.floor((absOffset % 3600) / 60);

    return `GMT${sign}${hours}${minutes > 0 ? ":" + String(minutes).padStart(2, "0") : ""}`;
  };

  const filteredTimezones = timezones?.filter((tz) =>
    tz.timezone.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative flex h-[30rem] flex-col gap-1 overflow-x-hidden overflow-y-scroll px-3">
      <div className="flex w-full items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-white"
          onClick={() => setScreen("clock")}
        >
          <FaArrowLeft />
        </Button>

        {/*{error && (*/}
        <Button
          variant="ghost"
          className="bg-transparent p-0 text-white"
          onClick={fetchTimezones}
        >
          <IoRefresh className="h-16 w-16" />
        </Button>
        {/*)}*/}
      </div>

      <div>
        <h1 className="text-xl text-white">Select City</h1>
        <p className="text-sm text-gray-500">Time zones</p>
      </div>

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for country or city"
        className="sticky top-0 mt-3 h-10 w-full rounded-3xl border-0 bg-gray-500 px-4 py-2 text-base text-white placeholder:text-gray-300 focus:outline-none focus-visible:ring-0"
      />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="flex-center h-48 text-center text-lg text-gray-300">
          {error}
        </div>
      ) : (
        <ul className="mb-8 mt-4 flex flex-col gap-1">
          {filteredTimezones.length > 0 ? (
            filteredTimezones.map((tz) => (
              <li
                key={tz.timezone}
                className="flex cursor-default flex-col rounded-xl px-2 py-1 text-base text-white transition-colors hover:bg-gray-700"
                onClick={() => handleTimezoneSelect(tz)}
              >
                <div className="text-base font-medium text-gray-100">
                  {tz.timezone.split("/")[1]}
                </div>
                <div className="text-sm font-light text-gray-500">
                  {tz.timezone.split("/")[0]} {tz.utcOffset}
                </div>
              </li>
            ))
          ) : (
            <div className="flex-center flex-1 text-center">
              No cities found
            </div>
          )}
        </ul>
      )}
    </div>
  );
};
export default SearchTimezone;
