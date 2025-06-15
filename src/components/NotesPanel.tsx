import React, { useState, useContext } from "react";
import { useAppContext } from "../context/AppContext";
import ReactMarkdown from "react-markdown";

export default function NotesPanel() {
  const { notes, setNotes } = useAppContext();
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");

  const handleAddNote = () => {
    if (content.trim()) {
      const newNote = {
        id: Date.now(),
        content,
        tag,
        timestamp: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
      setContent("");
      setTag("");
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(search.toLowerCase()) ||
    note.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-display text-nouveau-gold mb-4">
        Notes
      </h2>

      <textarea
        className="w-full p-3 rounded-xl bg-nouveau-bg text-white border border-nouveau-rose mb-2 resize-none"
        rows={4}
        placeholder="Write something in Markdown..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="w-full p-2 rounded-xl bg-nouveau-bg text-white border border-nouveau-rose mb-2"
        placeholder="Tag (optional)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <button
        className="w-full bg-nouveau-accent hover:shadow-gold text-white py-2 px-4 rounded-2xl mb-4 transition-all duration-300"
        onClick={handleAddNote}
      >
        Add Note
      </button>

      <input
        className="w-full p-2 rounded-xl bg-nouveau-bg text-white border border-nouveau-rose mb-4"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-nouveau-bg p-3 rounded-2xl border border-nouveau-rose hover:border-nouveau-gold transition"
          >
            <div className="prose prose-invert text-sm leading-snug">
              <ReactMarkdown>
                {note.content}
              </ReactMarkdown>
            </div>
            {note.tag && (
              <div className="text-xs text-nouveau-emerald mt-1 italic">
                #{note.tag}
              </div>
            )}
            <div className="text-xs text-gray-400 mt-1">
              {new Date(note.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
