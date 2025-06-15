import React, { useState, useContext } from "react";
import { useAppContext } from "../context/AppContext";

export default function GPTQueryPanel() {
  const { gptHistory, setGptHistory } = useAppContext();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/.netlify/functions/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const response = data.reply || "No response";

      const newEntry = {
        id: Date.now(),
        prompt,
        response,
        timestamp: new Date().toISOString(),
      };

      setGptHistory((prev) => [newEntry, ...prev]);
      setPrompt("");
    } catch (err) {
      console.error("GPT error:", err);

      const newEntry = {
        id: Date.now(),
        prompt,
        response: "⚠️ GPT failed to respond.",
        timestamp: new Date().toISOString(),
      };

      setGptHistory((prev) => [newEntry, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-display text-nouveau-gold mb-4">
        Ask GPT
      </h2>

      <input
        type="text"
        className="w-full p-3 rounded-xl bg-nouveau-bg text-white border border-nouveau-rose mb-2"
        placeholder="Ask anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <button
        className="w-full bg-nouveau-accent hover:shadow-gold text-white py-2 px-4 rounded-2xl mb-4 transition-all duration-300"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Thinking..." : "Submit"}
      </button>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {gptHistory.map((entry) => (
          <div
            key={entry.id}
            className="bg-nouveau-bg p-3 rounded-xl border border-nouveau-rose hover:border-nouveau-gold transition"
          >
            <div className="text-sm text-nouveau-rose italic">{entry.prompt}</div>
            <div className="text-gray-200 text-sm mt-1">{entry.response}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(entry.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
