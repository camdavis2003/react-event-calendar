import { useState } from "react";

interface CalendarEvent {
  date: string; // "YYYY-MM-DD"
  title: string;
}

const events: CalendarEvent[] = [
  { date: "2025-07-05", title: "Independence Day (Observed)" },
  { date: "2025-07-10", title: "Team Meeting" },
  { date: "2025-07-20", title: "Project Deadline" },
];

function isSameDate(d1: Date, d2: Date): boolean {
  return d1.toISOString().split("T")[0] === d2.toISOString().split("T")[0];
}

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay(); // 0 = Sunday

  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
  );

  function previousMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }

  return (
    <div className="p-4 border rounded-2xl shadow max-w-md mx-auto bg-white">
      <div className="flex justify-between items-center mb-4">
        <button onClick={previousMonth}>&lt;</button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2 text-center">
        {Array(startDay)
          .fill(null)
          .map((_, i) => <div key={`empty-${i}`} />)}

        {daysInMonth.map((day) => {
          const event = events.find((e) => e.date === day.toISOString().split("T")[0]);
          return (
            <div
              key={day.toISOString()}
              className={`p-2 rounded-lg ${
                event ? "bg-blue-100 text-blue-800 font-semibold" : ""
              }`}
              title={event?.title}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
