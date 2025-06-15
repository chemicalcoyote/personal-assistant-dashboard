import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Todo {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

interface Mood {
  id: number;
  emoji: string;
  label: string;
  timestamp: string;
}

interface Note {
  id: number;
  content: string;
  tag: string;
  timestamp: string;
}

interface GPTResponse {
  id: number;
  prompt: string;
  response: string;
  timestamp: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
}

interface AppContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  moods: Mood[];
  setMoods: React.Dispatch<React.SetStateAction<Mood[]>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  gptHistory: GPTResponse[];
  setGptHistory: React.Dispatch<React.SetStateAction<GPTResponse[]>>;
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [moods, setMoods] = useLocalStorage<Mood[]>("moods", []);
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [gptHistory, setGptHistory] = useLocalStorage<GPTResponse[]>("gptHistory", []);
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>("events", []);

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        moods,
        setMoods,
        notes,
        setNotes,
        gptHistory,
        setGptHistory,
        events,
        setEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
