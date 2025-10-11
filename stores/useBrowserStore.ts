import type {
  BrowserScreen,
  CustomSearchResult,
  CustomSearchResultData,
  HistoryType,
  NewsArticle,
} from "@/types";
import { browserHistory } from "@/constants";
import { create } from "zustand";

interface BrowserContextType {
  currentBrowserScreen: BrowserScreen;
  changeBrowserScreen: (screen: BrowserScreen) => void;
  bookmarks: string[];
  currentTab: number;
  searchResults: CustomSearchResult | null;
  selectedUrl: CustomSearchResultData | null;
  history: HistoryType[];
  setHistory: (query: string, url?: string) => void;
  clearHistory: () => void;
  isSearching: boolean;
  handleSearch: (query: string, start?: number) => Promise<void>;
  setSelectedUrl: (selected: CustomSearchResultData) => void;
  newsArticles: NewsArticle[];
  fetchNewsArticles: (keyword?: string) => Promise<void>;
}

export const useBrowserStore = create<BrowserContextType>((set, get) => ({
  currentBrowserScreen: "browser-home",
  currentTab: 1,
  searchResults: null,
  selectedUrl: null,
  history: browserHistory,
  bookmarks: [],
  isSearching: false,
  newsArticles: [],

  changeBrowserScreen: (screen) => set({ currentBrowserScreen: screen }),
  setHistory: (query, url) => {
    const { history } = get();

    set({
      history: [
        {
          id: history.length + 1,
          query,
          url,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        },
        ...history,
      ],
    });
  },
  clearHistory: () => set({ history: [] }),
  setSelectedUrl: (selected) => set({ selectedUrl: selected }),
  handleSearch: async (query: string, start?: number) => {
    const { setHistory } = get();
    const startIndex = start || 1;

    if (!query.trim()) return;

    set({ isSearching: true });

    try {
      const res = await fetch(
        `/api/browser/search?q=${encodeURIComponent(query)}&start=${startIndex}`,
      );

      const result = await res.json();

      if (!result.success) {
        console.log("Browser API Error", result.error);
        return;
      }

      setHistory(query);

      set({
        searchResults: result.data,
        currentBrowserScreen: "browser-search-results",
      });
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    } finally {
      set({ isSearching: false });
    }
  },

  fetchNewsArticles: async (keyword = "Google") => {
    try {
      const res = await fetch(`/api/news?keyword=${keyword}`);
      const { data } = await res.json();

      set({ newsArticles: data });
    } catch (e) {
      console.warn("Failed to fetch news", e);
    }
  },
}));
