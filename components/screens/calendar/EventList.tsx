import { CalendarEvent, CalendarScreen } from "@/types";
import { CATEGORY_COLORS } from "./CalendarApp";
import { LuClock } from "react-icons/lu";
import { Dispatch, SetStateAction } from "react";

interface EventsListProps {
  getEventsForDate: (date: string) => CalendarEvent[];
  selectedDate: string;
  setSelectedEvent: Dispatch<SetStateAction<CalendarEvent | null>>;
  setScreen: Dispatch<SetStateAction<CalendarScreen>>;
}

const EventList = ({
  selectedDate,
  getEventsForDate,
  setSelectedEvent,
  setScreen,
}: EventsListProps) => {
  const handleClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setScreen("event");
  };

  return (
    <div className="flex-1 pb-6">
      <div className="w-full space-y-2">
        <div className="flex-center pb-6 pt-2">
          <div className="h-1 w-6 rounded-full bg-white/30" />
        </div>

        {getEventsForDate(selectedDate).map((event) => (
          <div
            key={event.id}
            className="cursor-default rounded-xl bg-white/10 p-4 backdrop-blur-xl"
            onClick={() => handleClick(event)}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-1 items-center justify-between">
                <div className="mb-1 flex w-[85%] flex-col gap-2">
                  <h4 className="truncate font-medium text-white">
                    {event.title}
                  </h4>
                  {event.time && (
                    <div className="flex items-center gap-1 text-xs text-white/70">
                      <LuClock className="h-3 w-3" />
                      {event.time}
                    </div>
                  )}
                </div>

                <div
                  className={`h-3 w-3 rounded-full ${CATEGORY_COLORS[event.category]} mt-1`}
                />
              </div>
            </div>
          </div>
        ))}

        {getEventsForDate(selectedDate).length === 0 && (
          <div className="flex-center pb-6 pt-2">
            <p className="text-center text-neutral-400">No events today</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default EventList;
