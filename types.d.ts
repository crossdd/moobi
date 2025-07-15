import type React from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl: string;
  year: string;
  githubUrl: string;
  technologies: {
    title: string;
    icon: string;
  }[];
  subtitle?: string;
  team?: boolean;
  features: string[];
  challenges: string[];
  learnings: string[];
}

type Skill = "frontend" | "backend" | "tools" | "mobile"

type ScreenDisplay =
  | "home"
  | "phone"
  | "mail"
  | "gallery"
  | "video-player"
  | "image-view"
  | "projects"
  | "project-detail"
  | "chrome"
  | "lock"
  | "chrome-history"
  | "info"
  | "snake"
  | "guess"

type MediaType = "photo" | "video"

interface MediaItem {
  id: string
  type: MediaType
  thumbnail: string
  title?: string
  date: Date
  isFavorite: boolean
  duration?: string
}

declare interface BrowserHomeProps {
  searchQuery: string;
  setSearchQuery:  React.Dispatch<React.SetStateAction<string>>;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean,
  progress: number
  setScreen: React.Dispatch<React.SetStateAction<BrowserScreen>>
  handleSearch: (searchTerm?: string) => void
}

declare interface BrowserHistoryProps {
  history: History[];
  setHistory: React.Dispatch<React.SetStateAction<History[]>>
  setScreen: React.Dispatch<React.SetStateAction<BrowserScreen>>
  handleSearch: (searchTerm?: string) => void
}

declare interface History {
  id: number;
  title: string;
  url: string
}