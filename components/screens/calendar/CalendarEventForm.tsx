import { Dispatch, SetStateAction, useState } from "react";
import { LuX } from "react-icons/lu";
import {
  type CalendarEvent,
  CalendarScreen,
  CalendarEventCategory,
} from "@/types";
import { Button } from "@/components/ui/button";
import { uid } from "uid/secure";

interface CalendarEventModalProps {
  eventToEdit: CalendarEvent | null;
  setEventToEdit: Dispatch<SetStateAction<CalendarEvent | null>>;
  setScreen: Dispatch<SetStateAction<CalendarScreen>>;
  setAllEvents: Dispatch<SetStateAction<CalendarEvent[]>>;
  selectedDate: string | null;
}

const CalendarEventForm = ({
  eventToEdit,
  setAllEvents,
  selectedDate,
  setScreen,
  setEventToEdit,
}: CalendarEventModalProps) => {
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: eventToEdit?.title ?? "",
    category: eventToEdit?.category ?? "personal",
    description: eventToEdit?.description ?? "",
    time: eventToEdit?.time ?? "",
  });

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title?.trim()) return;

    const event: CalendarEvent = {
      id: uid(),
      title: newEvent.title.trim(),
      date: selectedDate,
      category: newEvent.category || "personal",
      description: newEvent.description?.trim() || undefined,
      time: newEvent.time?.trim() || undefined,
      isGlobal: false,
    };

    setAllEvents((prev) => [...prev, event]);
    closeModal();
  };

  const closeModal = () => {
    setScreen("home");
    setEventToEdit(null);
    setNewEvent({ title: "", category: "personal", description: "", time: "" });
  };

  const handleUpdateEvent = () => {
    if (!eventToEdit || !newEvent.title?.trim()) return;

    setAllEvents((prev) =>
      prev.map((event) =>
        event.id === eventToEdit.id
          ? {
              ...event,
              title: newEvent.title!.trim(),
              category: newEvent.category || "personal",
              description: newEvent.description?.trim() || undefined,
              time: newEvent.time?.trim() || undefined,
            }
          : event,
      ),
    );

    closeModal();
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {eventToEdit ? "Edit Event" : "Add Event"}
        </h3>
        <Button
          onClick={closeModal}
          className="border-0 bg-transparent p-2 text-white hover:bg-transparent"
        >
          <LuX />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm text-white/70">Title</label>
          <input
            type="text"
            value={newEvent.title || ""}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            placeholder="Enter title"
            className="w-full rounded-lg bg-neutral-700 p-2 text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="relative flex w-full items-center justify-between rounded-xl bg-neutral-700 p-2">
          <label className="text-base text-white/70">Category</label>
          <select
            className="ml-2 w-full max-w-24 appearance-none rounded-lg bg-neutral-700 text-right text-white focus:outline-none"
            value={newEvent.category || "personal"}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                category: e.target.value as CalendarEventCategory,
              })
            }
          >
            <option value="event" className="text-white">
              Event
            </option>
            <option value="birthday" className="text-white">
              Birthday
            </option>
            <option value="anniversary" className="text-white">
              Anniversary
            </option>
            <option value="other" className="text-white">
              Other
            </option>
          </select>
        </div>

        {/* Time */}
        <div>
          <label className="mb-2 block text-sm text-white/70">Time</label>
          <input
            type="time"
            value={newEvent.time || ""}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            className="w-full rounded-lg bg-neutral-700 p-2 text-white focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Description
          </label>
          <textarea
            value={newEvent.description || ""}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                description: e.target.value,
              })
            }
            placeholder="Event description"
            rows={3}
            className="w-full resize-none rounded-lg bg-neutral-700 p-2 text-white placeholder:text-white/50"
          />
        </div>

        {/* Actions */}
        <div className="flex items-end justify-end pt-2">
          <Button
            onClick={eventToEdit ? handleUpdateEvent : handleAddEvent}
            disabled={!newEvent.title?.trim()}
            className="flex-1 border-0 bg-blue-500 text-white hover:bg-blue-600 disabled:cursor-not-allowed"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};
export default CalendarEventForm;
