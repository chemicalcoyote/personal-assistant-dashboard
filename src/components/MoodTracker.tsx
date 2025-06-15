import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const moods = [
  { emoji: "😞", label: "Sad" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😊", label: "Happy" },
  { emoji: "😄", label: "Excited" },
];

const MoodTracker: React.FC = () => {
  const { moods: moodHistory, setMoods } = useAppContext();
  const [selected, setSelected] = useState<string | null>(null);

  const logMood = (emoji: string, label: string) => {
    const newMood = {
      id: Date.now(),
      emoji,
      label,
      timestamp: new Date().toISOString(),
    };
    setMoods([...moodHistory, newMood]);
    setSelected(label);
  };

  const lastMood = moodHistory[moodHistory.length - 1];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg shadow-indigo-300/30">
      <h2 className="text-xl font-bold mb-3">Mood Tracker</h2>
      <div className="flex gap-4 justify-around text-3xl">
        {moods.map(({ emoji, label }) => (
          <button
            key={label}
            className={`p-3 rounded-full transition hover:scale-110 ${
              selected === label ? "bg-indigo-100 shadow-inner" : ""
            }`}
            onClick={() => logMood(emoji, label)}
            title={label}
          >
            {emoji}
          </button>
        ))}
      </div>
      {lastMood && (
        <div className="mt-4 text-sm text-gray-600">
          Last logged: {lastMood.emoji} ({new Date(lastMood.timestamp).toLocaleTimeString()})
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
