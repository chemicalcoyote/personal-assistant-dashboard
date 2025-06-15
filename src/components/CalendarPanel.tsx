import React, { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
}

export default function CalendarPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const addEvent = () => {
    if (!title || !date) return;
    const newEvent = {
      id: Date.now(),
      title,
      date,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setTitle("");
    setDate("");
  };

  return (
    <div>
      <h2 className="text-2xl font-display text-nouveau-gold mb-4">
        Calendar
      </h2>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Event title"
          className="p-2 rounded-xl bg-nouveau-bg text-white border border-nouveau-rose"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="p-2 rounded-xl bg-nouveau-bg text-white border border-nouveau-rose"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="bg-nouveau-accent hover:shadow-gold text-white px-4 py-2 rounded-xl transition-all"
          onClick={addEvent}
        >
          Add Event
        </button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-nouveau-bg p-3 rounded-xl border border-nouveau-rose hover:border-nouveau-gold transition"
          >
            <div className="text-nouveau-rose font-sans text-sm">{event.title}</div>
            <div className="text-xs text-nouveau-emerald italic">
              {new Date(event.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
