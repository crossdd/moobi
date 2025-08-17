"use client";

import type React from "react";
import { useState } from "react";
import { CalendarEvent, CalendarEventCategory, CalendarScreen } from "@/types";
import { globalEvents } from "@/constants";
import CalendarEventForm from "@/components/screens/calendar/CalendarEventForm";
import CalendarHome from "@/components/screens/calendar/CalendarHome";
import EventDetails from "@/components/screens/calendar/EventDetails";

export const CATEGORY_COLORS: Record<CalendarEventCategory, string> = {
  event: "bg-blue-500",
  birthday: "bg-orange-500",
  anniversary: "bg-yellow-500",
  holiday: "bg-orange-700",
  other: "bg-gray-500",
};

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>(globalEvents);
  const [screen, setScreen] = useState<CalendarScreen>("home");
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  return (
    <div className="no-visible-scrollbar relative mt-12 flex h-[32rem] flex-1 flex-col overflow-y-scroll px-3">
      {screen === "home" && (
        <CalendarHome
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          allEvents={allEvents}
          setScreen={setScreen}
          setSelectedEvent={setSelectedEvent}
        />
      )}

      {screen === "add-edit" && (
        <CalendarEventForm
          eventToEdit={eventToEdit}
          setEventToEdit={setEventToEdit}
          setAllEvents={setAllEvents}
          selectedDate={selectedDate}
          setScreen={setScreen}
        />
      )}

      {screen === "event" && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          setEventToEdit={setEventToEdit}
          setScreen={setScreen}
          setAllEvents={setAllEvents}
        />
      )}
    </div>
  );
};

export default CalendarApp;
