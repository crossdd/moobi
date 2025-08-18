"use client";

import { useState } from "react";
import NoteDetails from "@/components/screens/notes/NoteDetails";
import { Note, NoteType } from "@/types";
import NoteList from "@/components/screens/notes/NoteList";
import NoteForm from "@/components/screens/notes/NoteForm";

export const NOTE_COLORS = [
  { name: "Default", value: "", bg: "bg-white/10" },
  { name: "Yellow", value: "yellow", bg: "bg-yellow-500/20" },
  { name: "Orange", value: "orange", bg: "bg-orange-500/20" },
  { name: "Red", value: "red", bg: "bg-red-500/20" },
  { name: "Pink", value: "pink", bg: "bg-pink-500/20" },
  { name: "Purple", value: "purple", bg: "bg-purple-500/20" },
  { name: "Blue", value: "blue", bg: "bg-blue-500/20" },
  { name: "Green", value: "green", bg: "bg-green-500/20" },
];

export const PRIORITY_COLORS = {
  low: "text-green-400",
  medium: "text-yellow-400",
  high: "text-red-400",
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [screen, setScreen] = useState<"home" | "add-edit" | "detail">("home");
  const [noteType, setNoteType] = useState<NoteType>("note");
  //
  // // Load notes from localStorage
  // useEffect(() => {
  //   try {
  //     const saved = localStorage.getItem("notes-app-data");
  //     if (saved) {
  //       setNotes(JSON.parse(saved));
  //     } else {
  //       // Add some sample data
  //       const sampleNotes: Note[] = [
  //         {
  //           id: "1",
  //           title: "Welcome to Notes!",
  //           content:
  //             "This is your first note. You can edit, delete, or create new notes and todos.",
  //           type: "note",
  //           createdAt: new Date().toISOString(),
  //           updatedAt: new Date().toISOString(),
  //           isPinned: true,
  //           isArchived: false,
  //           color: "blue",
  //         },
  //         {
  //           id: "2",
  //           title: "Shopping List",
  //           content: "",
  //           type: "todo",
  //           createdAt: new Date(Date.now() - 86400000).toISOString(),
  //           updatedAt: new Date(Date.now() - 86400000).toISOString(),
  //           isPinned: false,
  //           isArchived: false,
  //           color: "green",
  //           todos: [
  //             {
  //               id: "t1",
  //               text: "Buy groceries",
  //               completed: false,
  //               priority: "medium",
  //             },
  //             {
  //               id: "t2",
  //               text: "Pick up dry cleaning",
  //               completed: true,
  //               priority: "low",
  //             },
  //             {
  //               id: "t3",
  //               text: "Call dentist",
  //               completed: false,
  //               priority: "high",
  //               dueDate: "2025-01-20",
  //             },
  //           ],
  //         },
  //       ];
  //       setNotes(sampleNotes);
  //     }
  //   } catch (error) {
  //     console.error("Failed to load notes:", error);
  //   }
  // }, []);
  //
  // // Save notes to localStorage
  // useEffect(() => {
  //   try {
  //     localStorage.setItem("notes-app-data", JSON.stringify(notes));
  //   } catch (error) {
  //     console.error("Failed to save notes:", error);
  //   }
  // }, [notes]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="no-visible-scrollbar mt-10 flex h-[33rem] flex-col overflow-y-auto bg-black">
      {screen === "home" && (
        <NoteList
          notes={notes}
          setSelectedNote={setSelectedNote}
          formatDate={formatDate}
          setScreen={setScreen}
          setNoteType={setNoteType}
        />
      )}

      {screen === "detail" && selectedNote && (
        <NoteDetails
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          setNotes={setNotes}
          formatDate={formatDate}
          setScreen={setScreen}
          setNoteType={setNoteType}
        />
      )}

      {screen === "add-edit" && (
        <NoteForm
          setScreen={setScreen}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          setNotes={setNotes}
          noteType={noteType}
        />
      )}
    </div>
  );
};

export default Notes;
