// src/components/Calendar.tsx
import { useState } from "react";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Simple date picker: current month days
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const today = new Date().getDate();

  const handleSelect = (day: number) => {
    setSelectedDate(`${day}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-knowledgeGreen">September {new Date().getFullYear()}</h3>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => handleSelect(day)}
            className={`p-2 rounded-lg text-center transition ${
              day === today
                ? "bg-green-500 text-white"
                : selectedDate?.startsWith(`${day}-`) 
                ? "bg-green-300 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-900">
          Selected Date: <strong>{selectedDate}</strong>
        </div>
      )}
    </div>
  );
}
