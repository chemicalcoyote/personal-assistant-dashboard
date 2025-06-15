import React, { useState, useContext } from "react";
import { useAppContext } from "../context/AppContext";

const categories = ["Home", "Work", "Wellness"];

export default function TodoPanel() {
  const { todos, setTodos } = useAppContext();
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text,
      category,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-display text-nouveau-gold mb-4">To-Do List</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          className="flex-1 p-2 rounded-xl bg-nouveau-bg text-white border border-nouveau-rose"
          placeholder="New task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="bg-nouveau-bg text-white border border-nouveau-rose rounded-xl p-2 shadow-glow"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          className="bg-nouveau-accent hover:shadow-gold text-white px-4 py-2 rounded-xl transition-all"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center bg-nouveau-bg p-3 rounded-xl border border-nouveau-rose hover:border-nouveau-gold transition"
          >
            <div className="flex flex-col">
              <span
                className={`text-sm ${
                  todo.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {todo.text}
              </span>
              <span className="text-xs text-nouveau-emerald">{todo.category}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="text-xs text-nouveau-rose hover:text-nouveau-gold transition"
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-xs text-gray-500 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
