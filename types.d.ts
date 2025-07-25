import type React from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  team?: boolean;
  features: string[];
  challenges: string[];
  learnings: string[];
}

type Skill = "frontend" | "backend" | "tools" | "mobile"

type BrowserScreen = "home" | "history" | "bookmark" | "search-result" | "web"
type MusicPlayerScreen = "library" | "search" | "nowPlaying"

type ScreenOptions =
  | "boot"
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
  | "info"
  | "snake"
  | "guess"
  | "shutdown"
  | "itunes"

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

interface HistoryType{
  id: number;
  query: string;
}

declare interface BrowserBookmarkProps {
  setScreen:  React.Dispatch<React.SetStateAction<BrowserScreen>>
  setProjectId:  React.Dispatch<React.SetStateAction<string>>
}

declare interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  albumArt: string
  genre: string
  streamUrl: string,
  permalink?: string,
  playCount?: number,
  favoriteCount?: number,
  repostCount?: number,
}

interface CustomSearchResultData {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  formattedUrl: string;
  htmlSnippet: string;
  pagemap: string
}

interface CustomSearchResult {
  query: string;
  totalResults: string;
  searchTime: string;
  results: CustomSearchResultData[];
  nextPage?: {
    startIndex: number;
  };
  previousPage?: {
    startIndex: number;
  };
  onPageChange?: (startIndex: number) => void;
}