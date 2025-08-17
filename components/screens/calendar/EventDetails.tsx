import React, { Dispatch, SetStateAction } from "react";
import { LuTrash2, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { CalendarEvent, CalendarScreen } from "@/types";
import { cn } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/components/screens/calendar/CalendarApp";
import { RiEdit2Line } from "react-icons/ri";
import { FaBirthdayCake } from "react-icons/fa";

interface EventDetailsProps {
  event: CalendarEvent;
  setEventToEdit: Dispatch<SetStateAction<CalendarEvent | null>>;
  setScreen: Dispatch<SetStateAction<CalendarScreen>>;
  setAllEvents: Dispatch<SetStateAction<CalendarEvent[]>>;
}

const EventDetails = ({
  event,
  setEventToEdit,
  setScreen,
  setAllEvents,
}: EventDetailsProps) => {
  const handleEditEvent = (event: CalendarEvent) => {
    if (event.isGlobal) return;
    setEventToEdit(event);
    setScreen("add-edit");
  };

  const handleDeleteEvent = (eventId: string) => {
    setAllEvents((prev) => {
      const event = prev.find((event) => event.id === eventId);

      if (!event) {
        return prev;
      } else if (event.isGlobal) {
        return prev;
      } else {
        return prev.filter((event) => event.id !== eventId);
      }
    });
    setScreen("home");
    setEventToEdit(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formattedDate = formatDate(new Date(event.date));

  return (
    <div className="relative flex w-full flex-col gap-8">
      <div className="flex items-end justify-end">
        <Button
          className="bg-transparent text-white hover:bg-transparent"
          onClick={() => setScreen("home")}
        >
          <LuX className="h-10 w-10" />
        </Button>
      </div>

      {event.category === "birthday" ? (
        <BirthdayCard event={event} date={formattedDate} />
      ) : (
        <EventCard event={event} formattedDate={formattedDate} />
      )}

      {!event.isGlobal && (
        <div className="flex-center gap-8">
          <Button
            className="h-10 w-10 rounded-full bg-neutral-700 text-white hover:bg-neutral-800"
            onClick={() => handleEditEvent(event)}
          >
            <RiEdit2Line />
          </Button>
          <Button
            className="h-10 w-10 rounded-full bg-neutral-700 text-white hover:bg-neutral-800"
            onClick={() => handleDeleteEvent(event.id)}
          >
            <LuTrash2 />
          </Button>
        </div>
      )}
    </div>
  );
};
export default EventDetails;

const EventCard = ({
  event,
  formattedDate,
}: {
  event: CalendarEvent;
  formattedDate: string;
}) => (
  <div className="flex-center flex-1">
    <div className="flex w-full flex-col">
      <div
        className={cn(
          "rounded-t-2xl px-4 py-5 leading-normal tracking-wide text-white",
          CATEGORY_COLORS[event.category],
        )}
      >
        <h1 className="text-2xl font-semibold">{event.title}</h1>
        <p className="mt-2 text-sm font-light">{formattedDate}</p>
      </div>

      <div className="flex flex-col gap-4 rounded-b-2xl bg-neutral-700 px-4 py-5 text-white">
        <div>
          <div className="text-base font-light">Category</div>
          <div className="mt-1.5 text-sm capitalize text-gray-300">
            {event?.category || "-"}
          </div>
        </div>

        <div>
          <div className="text-base font-light">Description</div>
          <div className="mt-1.5 text-sm capitalize text-gray-300">
            {event?.description || "-"}
          </div>
        </div>

        <div>
          <div className="text-base font-light">Time</div>
          <div className="mt-1.5 text-sm capitalize text-gray-300">
            {event?.time || "All Day"}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BirthdayCard = ({
  event,
  date,
}: {
  event: CalendarEvent;
  date: string;
}) => {
  const daysDiff = (targetDate: Date) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffMs = targetDate.getTime() - today.getTime();

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `${diffDays} ${diffDays > 1 ? "days" : "day"} until`;
    } else if (diffDays < 0) {
      const value = Math.abs(diffDays);

      return `${value} day${value > 1 ? "days" : "day"} since`;
    } else {
      return "Today is";
    }
  };

  return (
    <div className="flex-center flex-1">
      <div className="flex w-full flex-col rounded-2xl bg-neutral-900 p-3">
        <div
          className={cn(
            "flex-center flex flex-col gap-12 rounded-t-2xl py-2 pb-12 text-center leading-normal tracking-wide text-white",
            CATEGORY_COLORS[event.category],
          )}
        >
          <p className="mt-2 text-sm font-light">{date}</p>

          <div className="flex-center flex-1 flex-col gap-2">
            <h1 className="text-2xl font-semibold">
              {event.title}&apos;s <br /> Birthday
            </h1>

            <FaBirthdayCake size={48} className="text-white" />
          </div>
        </div>

        <div className="flex-center mx-auto h-5 w-24 rounded-b bg-orange-500" />

        <div className="flex-center gap-1 rounded-b-2xl px-4 py-5">
          <div className={cn("h-0.5 w-4", CATEGORY_COLORS[event.category])} />

          <span className="text-xs text-orange-500">
            {daysDiff(new Date(event.date))} {`${event.title}'s Birth date`}
          </span>

          <div className={cn("h-0.5 w-4", CATEGORY_COLORS[event.category])} />
        </div>
      </div>
    </div>
  );
};
