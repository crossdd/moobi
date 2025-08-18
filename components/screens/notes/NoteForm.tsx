import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuPlus, LuSave, LuTrash2, LuX } from "react-icons/lu";
import {
  NOTE_COLORS,
  PRIORITY_COLORS,
} from "@/components/screens/notes/NotesApp";
import { type Note, NoteType, TodoItem, ToDoPriority } from "@/types";
import { uid } from "uid/secure";

interface NoteDetailsProps {
  selectedNote: Note | null;
  setSelectedNote: Dispatch<SetStateAction<Note | null>>;
  setNotes: Dispatch<SetStateAction<Note[]>>;
  noteType: NoteType;
  setScreen: Dispatch<SetStateAction<"home" | "add-edit" | "detail">>;
}

const NoteForm = ({
  selectedNote,
  setSelectedNote,
  setNotes,
  noteType,
  setScreen,
}: NoteDetailsProps) => {
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: selectedNote?.title || "",
    content: selectedNote?.content || "",
    type: noteType,
    color: selectedNote?.color || "",
    todos: selectedNote?.todos || [],
  });
  const [newTodoText, setNewTodoText] = useState("");

  const saveNote = () => {
    if (!newNote.title?.trim()) return;

    if (selectedNote) {
      const editedNote = {
        title: newNote.title!.trim(),
        content: newNote.content || "",
        color: newNote.color || "",
        todos: newNote.todos || [],
        updatedAt: new Date().toISOString(),
      };

      setNotes((prev) =>
        prev.map((note) =>
          note.id === selectedNote.id
            ? {
                ...note,
                ...editedNote,
              }
            : note,
        ),
      );
      setSelectedNote({
        ...selectedNote,
        ...editedNote,
      });

      setScreen("detail");
    } else {
      const note: Note = {
        id: uid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPinned: false,
        isArchived: false,
        todos: noteType === "todo" ? newNote.todos : undefined,
        title: newNote.title?.trim(),
        content: newNote.content || "",
        type: newNote.type!,
        color: newNote.color!,
      };

      setNotes((prev) => [note, ...prev]);
      closeNote();
    }
  };

  const addTodoItem = () => {
    if (!newTodoText.trim()) return;

    const newTodo: TodoItem = {
      id: uid(),
      text: newTodoText.trim(),
      completed: false,
      priority: "medium",
    };

    setNewNote((prev) => ({
      ...prev,
      todos: [...(prev.todos || []), newTodo],
    }));
    setNewTodoText("");
  };

  const updateTodoText = (todoId: string, text: string) => {
    setNewNote((prev) => ({
      ...prev,
      todos: prev.todos?.map((todo) =>
        todo.id === todoId ? { ...todo, text } : todo,
      ),
    }));
  };

  const updateTodoPriority = (todoId: string, priority: ToDoPriority) => {
    setNewNote((prev) => ({
      ...prev,
      todos: prev.todos?.map((todo) =>
        todo.id === todoId ? { ...todo, priority } : todo,
      ),
    }));
  };

  const deleteTodoItem = (todoId: string) => {
    setNewNote((prev) => ({
      ...prev,
      todos: prev.todos?.filter((todo) => todo.id !== todoId),
    }));
  };

  const closeNote = () => {
    setSelectedNote(null);
    setScreen("home");
    setNewNote({
      title: "",
      content: "",
      type: "note",
      color: "",
      todos: [],
    });
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
            onClick={saveNote}
            disabled={!newNote.title?.trim()}
            className="rounded-full border-0 bg-green-500 p-2 text-white hover:bg-green-600"
          >
            <LuSave className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Title */}
          <input
            value={newNote.title || ""}
            onChange={(e) =>
              setNewNote({
                ...newNote,
                title: e.target.value,
              })
            }
            placeholder="Title"
            className="w-full rounded-3xl border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60"
          />

          {/* Color Picker */}
          <div>
            <label className="mb-2 block text-sm text-white/70">Color</label>
            <div className="flex flex-wrap gap-2">
              {NOTE_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() =>
                    setNewNote({
                      ...newNote,
                      color: color.value,
                    })
                  }
                  className={`h-8 w-8 rounded-full ${color.bg} border-2 ${
                    newNote.color === color.value
                      ? "border-white"
                      : "border-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {noteType === "note" ? (
            <textarea
              value={newNote.content || ""}
              onChange={(e) =>
                setNewNote({
                  ...newNote,
                  content: e.target.value,
                })
              }
              placeholder="Start writing..."
              rows={9}
              className="w-full resize-none rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/50"
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodoItem()}
                  placeholder="Add a new task..."
                  className="flex-1 rounded-xl border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60"
                />
                <Button
                  onClick={addTodoItem}
                  disabled={!newTodoText.trim()}
                  className="border-0 bg-green-500 p-3 text-white hover:bg-green-600"
                >
                  <LuPlus className="h-4 w-4" />
                </Button>
              </div>

              {/* Todo Items */}
              <div className="space-y-3">
                {newNote.todos?.map((todo) => (
                  <div
                    key={todo.id}
                    className="space-y-2 rounded-lg border border-white/20 bg-white/10 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        value={todo.text}
                        onChange={(e) =>
                          updateTodoText(todo.id, e.target.value)
                        }
                        className="flex-1 border-0 bg-transparent p-0 text-white"
                      />
                      <Button
                        onClick={() => deleteTodoItem(todo.id)}
                        className="border-0 bg-transparent p-2 text-red-400 hover:bg-transparent"
                      >
                        <LuTrash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="ml-8 flex items-center gap-2">
                      <span className="text-xs text-white/60">Priority:</span>
                      <select
                        value={todo.priority}
                        onChange={(e) =>
                          updateTodoPriority(
                            todo.id,
                            e.target.value as ToDoPriority,
                          )
                        }
                        className="rounded border border-white/20 bg-white/10 px-2 py-1 text-xs text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <div
                        className={`h-2 w-2 rounded-full ${PRIORITY_COLORS[todo.priority]}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NoteForm;
