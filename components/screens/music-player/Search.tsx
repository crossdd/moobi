import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";
import {LuChevronDown, LuLoader, LuMusic, LuSearch} from "react-icons/lu";
import {useMusic} from "@/context/MusicContext";
import {Song} from "@/types";

const Search = () => {
    const {currentPlayerScreen, setCurrentPlayerScreen, playSong, setQueue} = useMusic()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Song[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const searchTracks = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([])
            return
        }

        setIsSearching(true)
        try {
            const response = await fetch(`/api/music-player/search?q=${encodeURIComponent(query)}&limit=20`)
            const data = await response.json()

            if (data.success) {
                setSearchResults(data.data)
            } else {
                console.error("Failed to search tracks:", data.error)
                setSearchResults([])
            }
        } catch (error) {
            console.error("Error searching tracks:", error)
            setSearchResults([])
        } finally {
            setIsSearching(false)
        }
    }

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (currentPlayerScreen === "search") {
                searchTracks(searchQuery)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchQuery, currentPlayerScreen])

    const handlePlaySong = async(song: Song) => {
        const trackIndex = searchResults.findIndex((track) => track.id === song.id)
        const newQueue = searchResults.slice(trackIndex)

        setQueue(newQueue)
        await playSong(song)
    }

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "0:00"
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="relative flex-1 flex flex-col px-3">
            {/* Search Header */}
            <div className="sticky top-0 bg-black">
                <div className="flex items-center gap-3 mb-4 text-neutral-300 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => setCurrentPlayerScreen("library")} className="p-2">
                        <LuChevronDown className="w-5 h-5 rotate-90" />
                    </Button>
                    <h1 className="text-2xl font-bold">Search</h1>
                </div>

                {/* Search Input */}
                <div className="relative">
                    <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search songs, artists, albums..."
                        className="w-full bg-gray-600 rounded-full border-0 py-3 pr-4 text-base text-white flex-1 focus-visible:ring-0 focus:outline-none pl-8"
                    />
                    {isSearching && (
                        <LuLoader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                    )}
                </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto mt-4">
                {searchQuery ? (
                    <div className="space-y-1">
                        {searchResults.map((song) => (
                            <div
                                key={song.id}
                                className="flex items-center gap-3 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-500 px-1 rounded-lg group"
                                onClick={() => handlePlaySong(song)}
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center overflow-hidden">
                                    {song.albumArt ? (
                                        <img
                                            src={song.albumArt || "/placeholder.svg"}
                                            alt={song.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <LuMusic className="w-6 h-6 text-white" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-200 group-hover:text-gray-700 truncate">{song.title}</div>
                                    <div className="text-xs text-gray-400 truncate">
                                        {song.artist}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">{formatTime(song.duration)}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <LuSearch className="w-12 h-12 mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">Search Audius</h3>
                        <p className="text-sm text-center px-8">Find your favorite songs and artists</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Search
