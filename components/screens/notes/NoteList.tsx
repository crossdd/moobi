import React, { Dispatch, SetStateAction, useState } from "react";
import {
  LuFileText,
  LuFilter,
  LuList,
  LuPlus,
  LuSearch,
  LuSquare,
  LuStar,
  LuX,
} from "react-icons/lu";
import { Note, NoteType, TodoItem, ToDoPriority } from "@/types";
import {
  NOTE_COLORS,
  PRIORITY_COLORS,
} from "@/components/screens/notes/NotesApp";
import { Button } from "@/components/ui/button";
import { BiCheckSquare } from "react-icons/bi";

type SortBy = "date" | "title" | "priority";

interface NoteListProps {
  notes: Note[];
  setSelectedNote: Dispatch<SetStateAction<Note | null>>;
  setScreen: Dispatch<SetStateAction<"home" | "add-edit" | "detail">>;
  setNoteType: Dispatch<SetStateAction<NoteType>>;
  formatDate: (date: string) => string;
}

const NoteList = ({
  notes,
  setSelectedNote,
  setScreen,
  setNoteType,
  formatDate,
}: NoteListProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [currentView, setCurrentView] = useState<
    "all" | "notes" | "todos" | "archived"
  >("all");

  const filteredNotes = notes
    .filter((note) => {
      // View filter
      if (currentView === "notes" && note.type !== "note") return false;
      if (currentView === "todos" && note.type !== "todo") return false;
      if (currentView === "archived" && !note.isArchived) return false;
      if (currentView === "all" && note.isArchived) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = note.title.toLowerCase().includes(query);
        const matchesContent = note.content?.toLowerCase().includes(query);
        const matchesTodos = note.todos?.some((todo) =>
          todo.text.toLowerCase().includes(query),
        );
        return matchesTitle || matchesContent || matchesTodos;
      }

      return true;
    })
    .sort((a, b) => {
      // Pinned notes first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Then sort by selected criteria
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "priority":
          // For todos, sort by highest priority incomplete task
          if (a.type === "todo" && b.type === "todo") {
            const aHighest = getHighestPriority(a.todos || []);
            const bHighest = getHighestPriority(b.todos || []);
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[bHighest] - priorityOrder[aHighest];
          }
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "date":
        default:
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
      }
    });

  const getHighestPriority = (todos: TodoItem[]): ToDoPriority => {
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    if (incompleteTodos.some((todo) => todo.priority === "high")) return "high";
    if (incompleteTodos.some((todo) => todo.priority === "medium"))
      return "medium";
    return "low";
  };

  const getColorClass = (color?: string) => {
    const colorObj = NOTE_COLORS.find((c) => c.value === color);
    return colorObj?.bg || "bg-white/10";
  };

  const getTodoStats = (todos: TodoItem[]) => {
    const completed = todos.filter((todo) => todo.completed).length;
    const total = todos.length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const createNewNote = (type: NoteType) => {
    setNoteType(type);
    setScreen("add-edit");
  };

  const handleOpenNoteDetails = (note: Note) => {
    setSelectedNote(note);
    setScreen("detail");
  };

  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Notes</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-full border-0 bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <LuFilter className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setScreen("add-edit")}
            className="rounded-full border-0 bg-yellow-500 p-2 text-black hover:bg-yellow-600"
          >
            <LuPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4 w-full">
        <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-white/60" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes and todos..."
          className="w-full rounded-3xl border-white/20 bg-white/10 py-3 pl-10 text-white placeholder:text-white/60"
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-4 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium text-white">Filters & Sort</span>
            <Button
              onClick={() => setShowFilters(false)}
              className="border-0 bg-white/10 p-1 text-white hover:bg-white/20"
            >
              <LuX className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-xs text-white/70">View</label>
              <select
                value={currentView}
                onChange={(e) => setCurrentView(e.target.value as any)}
                className="w-full rounded-lg border border-white/20 bg-white/10 p-2 text-sm text-white"
              >
                <option value="all">All Notes</option>
                <option value="notes">Notes Only</option>
                <option value="todos">Todos Only</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs text-white/70">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="w-full rounded-lg border border-white/20 bg-white/10 p-2 text-sm text-white"
              >
                <option value="date">Date Modified</option>
                <option value="title">Title</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* View Tabs */}
      <div className="mb-4 flex rounded-xl border border-white/10 bg-white/10 p-1">
        <Button
          onClick={() => setCurrentView("all")}
          className={`flex-1 rounded-lg border-0 py-2 text-sm font-medium ${
            currentView === "all"
              ? "bg-white/20 text-white"
              : "bg-transparent text-white/70 hover:bg-white/10"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => setCurrentView("notes")}
          className={`flex-1 rounded-lg border-0 py-2 text-sm font-medium ${
            currentView === "notes"
              ? "bg-white/20 text-white"
              : "bg-transparent text-white/70 hover:bg-white/10"
          }`}
        >
          <LuFileText className="mr-1 h-4 w-4" />
          Notes
        </Button>
        <Button
          onClick={() => setCurrentView("todos")}
          className={`flex-1 rounded-lg border-0 py-2 text-sm font-medium ${
            currentView === "todos"
              ? "bg-white/20 text-white"
              : "bg-transparent text-white/70 hover:bg-white/10"
          }`}
        >
          <LuList className="mr-1 h-4 w-4" />
          Todos
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="mb-4 flex gap-3">
        <Button
          onClick={() => createNewNote("note")}
          className="flex-1 rounded-xl border border-blue-500/30 bg-blue-500/20 py-3 text-blue-400 hover:bg-blue-500/30"
        >
          <LuFileText className="mr-2 h-4 w-4" />
          New Note
        </Button>
        <Button
          onClick={() => createNewNote("todo")}
          className="flex-1 rounded-xl border border-green-500/30 bg-green-500/20 py-3 text-green-400 hover:bg-green-500/30"
        >
          <LuList className="mr-2 h-4 w-4" />
          New Todo
        </Button>
      </div>

      {/* Notes List */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {filteredNotes.map((note) => {
          const todoStats =
            note.type === "todo" ? getTodoStats(note.todos || []) : null;
          return (
            <div
              key={note.id}
              onClick={() => handleOpenNoteDetails(note)}
              className={`${getColorClass(note.color)} cursor-pointer rounded-xl border border-white/20 p-4 backdrop-blur-xl transition-all duration-200 hover:bg-white/20`}
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  {note.isPinned && (
                    <LuStar className="h-4 w-4 flex-shrink-0 text-yellow-400" />
                  )}
                  {note.type === "note" ? (
                    <LuFileText className="h-4 w-4 flex-shrink-0 text-white/70" />
                  ) : (
                    <LuList className="h-4 w-4 flex-shrink-0 text-white/70" />
                  )}
                  <h3 className="truncate font-medium text-white">
                    {note.title}
                  </h3>
                </div>
                <span className="flex-shrink-0 text-xs text-white/50">
                  {formatDate(note.updatedAt)}
                </span>
              </div>

              {note.type === "note" && note.content && (
                <p className="mb-2 line-clamp-2 text-sm text-white/70">
                  {note.content}
                </p>
              )}

              {note.type === "todo" && todoStats && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">
                      {todoStats.completed} of {todoStats.total} completed
                    </span>
                    <span className="text-sm text-white/70">
                      {todoStats.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/20">
                    <div
                      className="h-2 rounded-full bg-green-500 transition-all duration-300"
                      style={{ width: `${todoStats.percentage}%` }}
                    />
                  </div>
                  {note.todos && note.todos.length > 0 && (
                    <div className="space-y-1">
                      {note.todos.slice(0, 2).map((todo) => (
                        <div key={todo.id} className="flex items-center gap-2">
                          {todo.completed ? (
                            <BiCheckSquare className="h-3 w-3 text-green-400" />
                          ) : (
                            <LuSquare className="h-3 w-3 text-white/50" />
                          )}
                          <span
                            className={`text-xs ${
                              todo.completed
                                ? "text-white/50 line-through"
                                : "text-white/70"
                            }`}
                          >
                            {todo.text}
                          </span>
                          <div
                            className={`h-1 w-1 rounded-full ${PRIORITY_COLORS[todo.priority]}`}
                          />
                        </div>
                      ))}
                      {note.todos.length > 2 && (
                        <span className="text-xs text-white/50">
                          +{note.todos.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredNotes.length === 0 && (
          <div className="py-16 text-center text-white/60">
            <LuFileText className="mx-auto mb-4 h-16 w-16 opacity-50" />
            <h3 className="mb-2 text-lg font-medium">
              {searchQuery ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-sm">
              {searchQuery
                ? "Try a different search term"
                : "Create your first note or todo list"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default NoteList;
