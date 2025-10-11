import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuChevronDown, LuLoader, LuMusic, LuSearch } from "react-icons/lu";
import { Song } from "@/types";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";

const Search = () => {
  const { currentPlayerScreen, setCurrentPlayerScreen, playSong, setQueue } =
    useMusicPlayer();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchTracks = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/music-player/search?q=${encodeURIComponent(query)}&limit=20`,
      );
      const data = await response.json();

      if (data.success) {
        setSearchResults(data.data);
      } else {
        console.error("Failed to search tracks:", data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching tracks:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPlayerScreen === "search") {
        searchTracks(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, currentPlayerScreen]);

  const handlePlaySong = async (song: Song) => {
    const trackIndex = searchResults.findIndex((track) => track.id === song.id);
    const newQueue = searchResults.slice(trackIndex);

    setQueue(newQueue);
    await playSong(song);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col overflow-y-scroll px-3 pt-12">
      {/* Search Header */}
      <div className="sticky top-0 bg-black">
        <div className="mb-4 flex items-center gap-3 text-neutral-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPlayerScreen("library")}
            className="p-2"
          >
            <LuChevronDown className="h-5 w-5 rotate-90" />
          </Button>
          <h1 className="text-2xl font-bold">Search</h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs, artists, albums..."
            className="w-full flex-1 rounded-full border-0 bg-gray-600 py-3 pl-8 pr-4 text-base text-white focus:outline-none focus-visible:ring-0"
          />
          {isSearching && (
            <LuLoader className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform animate-spin text-gray-400" />
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-4 flex-1 overflow-y-auto">
        {searchQuery ? (
          <div className="space-y-1">
            {searchResults.map((song) => (
              <div
                key={song.id}
                className="group flex items-center gap-3 rounded-lg px-1 py-3 transition-colors duration-500 hover:bg-gray-50 active:bg-gray-100"
                onClick={() => handlePlaySong(song)}
              >
                <div className="to-purple-400 flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-400">
                  {song.albumArt ? (
                    <img
                      src={song.albumArt || "/placeholder.svg"}
                      alt={song.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <LuMusic className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-gray-200 group-hover:text-gray-700">
                    {song.title}
                  </div>
                  <div className="truncate text-xs text-gray-400">
                    {song.artist}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {formatTime(song.duration)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <LuSearch className="mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium">Search Audius</h3>
            <p className="px-8 text-center text-sm">
              Find your favorite songs and artists
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
