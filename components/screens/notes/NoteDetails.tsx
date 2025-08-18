import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  LuArchive,
  LuSquare,
  LuStar,
  LuStarOff,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import { BiCheckSquare, BiMessageEdit } from "react-icons/bi";
import { PRIORITY_COLORS } from "@/components/screens/notes/NotesApp";
import { type Note, NoteType } from "@/types";

interface NoteDetailsProps {
  selectedNote: Note;
  setSelectedNote: Dispatch<SetStateAction<Note | null>>;
  setNotes: Dispatch<SetStateAction<Note[]>>;
  formatDate: (date: string) => string;
  setScreen: Dispatch<SetStateAction<"home" | "add-edit" | "detail">>;
  setNoteType: Dispatch<SetStateAction<NoteType>>;
}

const NoteDetails = ({
  selectedNote,
  setSelectedNote,
  formatDate,
  setNotes,
  setScreen,
  setNoteType,
}: NoteDetailsProps) => {
  const toggleTodoComplete = (noteId: string, todoId: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? {
              ...note,
              todos: note.todos?.map((todo) =>
                todo.id === todoId
                  ? { ...todo, completed: !todo.completed }
                  : todo,
              ),
            }
          : note,
      ),
    );

    setSelectedNote((prev) =>
      prev
        ? {
            ...prev,
            todos: prev?.todos?.map((todo) =>
              todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo,
            ),
          }
        : prev,
    );
  };

  const deleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setScreen("home");
    }
  };

  const togglePin = (noteId: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isPinned: !note.isPinned } : note,
      ),
    );
  };

  const toggleArchive = (noteId: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isArchived: !note.isArchived } : note,
      ),
    );
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  const closeNote = () => {
    setSelectedNote(null);
    setScreen("home");
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
        <Button
          onClick={closeNote}
          className="rounded-full border-0 bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <LuX className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => togglePin(selectedNote.id)}
            className="rounded-full border-0 bg-white/10 p-2 text-white hover:bg-white/20"
          >
            {selectedNote.isPinned ? (
              <LuStar className="h-4 w-4 text-yellow-400" />
            ) : (
              <LuStarOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={() => toggleArchive(selectedNote.id)}
            className="rounded-full border-0 bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <LuArchive className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => deleteNote(selectedNote.id)}
            className="rounded-full border-0 bg-red-500/20 p-2 text-red-400 hover:bg-red-500/30"
          >
            <LuTrash2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => {
              setNoteType(selectedNote.type);
              setScreen("add-edit");
            }}
            className="rounded-full border-0 bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <BiMessageEdit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold text-white">{selectedNote.title}</h1>
        <div className="text-sm text-white/60">
          Created {formatDate(selectedNote.createdAt)} • Updated{" "}
          {formatDate(selectedNote.updatedAt)}
        </div>

        {selectedNote.type === "note" ? (
          <div className="whitespace-pre-wrap text-white">
            {selectedNote.content}
          </div>
        ) : (
          <div className="space-y-3">
            {selectedNote.todos?.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 rounded-lg bg-white/10 p-3"
              >
                <button
                  onClick={() => toggleTodoComplete(selectedNote.id, todo.id)}
                >
                  {todo.completed ? (
                    <BiCheckSquare className="h-5 w-5 text-green-400" />
                  ) : (
                    <LuSquare className="h-5 w-5 text-white/70" />
                  )}
                </button>
                <span
                  className={`flex-1 ${todo.completed ? "text-white/50 line-through" : "text-white"}`}
                >
                  {todo.text}
                </span>
                <div
                  className={`h-2 w-2 rounded-full ${PRIORITY_COLORS[todo.priority]}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default NoteDetails;
