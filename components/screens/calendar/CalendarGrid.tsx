import { CalendarEvent } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  currentDate: Date;
  getEventsForDate: (date: string) => CalendarEvent[];
  selectedDate: string | null;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

const CalendarGrid = ({
  currentDate,
  getEventsForDate,
  selectedDate,
  setSelectedDate,
}: CalendarGridProps) => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const handleDateClick = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    setSelectedDate(dateString);
  };

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 35; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const calendarDays = getCalendarDays();
  return (
    <div className="mb-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
      <div className="mb-2 grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-white/70"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const dateString = day.toISOString().split("T")[0];
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = dateString === todayString;
          const isSelected = dateString === selectedDate;
          const dayEvents = getEventsForDate(dateString);
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={cn(
                "relative aspect-square rounded-lg text-sm font-medium transition-all duration-200",
                isCurrentMonth
                  ? isToday && !isSelected
                    ? "text-blue-500 shadow-lg"
                    : isSelected
                      ? "bg-blue-500 py-px text-white"
                      : "text-white hover:bg-white/20"
                  : "text-white/40",
              )}
            >
              {day.getDate()}
              {hasEvents && (
                <div className="absolute left-1/2 top-1 flex -translate-x-1/2 transform gap-0.5">
                  <div className="h-1 w-1 rounded-full bg-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default CalendarGrid;
