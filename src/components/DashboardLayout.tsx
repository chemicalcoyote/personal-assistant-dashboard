import React from "react";
import TodoPanel from "./TodoPanel";
import MoodTracker from "./MoodTracker";
import NotesPanel from "./NotesPanel";
import GPTQueryPanel from "./GPTQueryPanel";
import CalendarPanel from "./CalendarPanel";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nouveau-bg via-nouveau-card to-black text-white font-sans px-4 py-8">
      {/* Page title */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-display text-nouveau-gold drop-shadow-gold">
          My Personal Assistant
        </h1>
        <p className="text-nouveau-rose font-sans mt-2 text-lg">
          Elegantly track your life ✨
        </p>
      </header>

      {/* Responsive grid layout */}
      <main className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <section className="bg-nouveau-card p-4 rounded-3xl shadow-glow border border-nouveau-rose">
          <TodoPanel />
        </section>

        <section className="bg-nouveau-card p-4 rounded-3xl shadow-glow border border-nouveau-rose">
          <NotesPanel />
        </section>

        <section className="bg-nouveau-card p-4 rounded-3xl shadow-glow border border-nouveau-rose">
          <GPTQueryPanel />
        </section>

        <section className="bg-nouveau-card p-4 rounded-3xl shadow-glow border border-nouveau-rose col-span-1 md:col-span-2">
          <MoodTracker />
        </section>

        <section className="bg-nouveau-card p-4 rounded-3xl shadow-glow border border-nouveau-rose col-span-1">
          <CalendarPanel />
        </section>
      </main>
    </div>
  );
}
