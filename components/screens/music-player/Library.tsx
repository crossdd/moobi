import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { LuAlbum, LuMusic, LuSearch } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import Loader from "@/components/Loader";
import { useMusic } from "@/context/MusicContext";
import { Song } from "@/types";

const Library = () => {
    const { setCurrentPlayerScreen, playSong, setQueue } = useMusic()
    const [tracks, setTracks] = useState<Song[]>([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (tracks.length === 0) {
            fetchTrendingTracks()
        }
    }, [])

    const fetchTrendingTracks = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/music-player/tracks?limit=20")
            const data = await response.json()

            if (data.success) {
                setTracks(data.data)
            } else {
                console.error("Failed to fetch tracks:", data.error)
            }
        } catch (error) {
            console.error("Error fetching tracks:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePlaySong = async (song: Song) => {
        const trackIndex = tracks.findIndex((track) => track.id === song.id)
        const newQueue = tracks.slice(trackIndex)

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
        <div className="flex-1 flex flex-col px-3 pt-8">
            {/* Header */}
            <div className="mt-6 px-1">
                <div className="flex items-center justify-between mb-4 text-neutral-300">
                    <h1 className="text-3xl font-bold ">iTunes</h1>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentPlayerScreen("search")} className="p-2">
                        <LuSearch className="w-5 h-5" />
                    </Button>
                </div>

                {/* Quick Access */}
                <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
                        <LuMusic className="w-4 h-4" />
                        <span className="text-sm font-medium">Trending</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
                        <LuAlbum className="w-4 h-4" />
                        <span className="text-sm font-medium">Playlists</span>
                    </div>
                </div>
            </div>

            {/* Song List */}
            <div className="flex-1">
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="mt-2">
                        <h2 className="text-lg font-semibold text-gray-300 mb-3">Recommended for today</h2>
                        <div className="flex w-full gap-3 overflow-x-scroll no-visible-scrollbar">
                            {tracks.slice(0, 6).map((song) => (
                                <div
                                    key={song.id}
                                    className="w-44 flex flex-col gap-3 p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 rounded-lg group border !border-neutral-900"
                                    onClick={() => playSong(song)}
                                >
                                    <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex-center overflow-hidden">
                                        {song.albumArt ? (
                                            <img
                                                src={song.albumArt || "/images/no-img.png"}
                                                alt={song.title}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <LuMusic className="w-6 h-6 text-white" />
                                        )}
                                    </div>

                                    <div className="flex-1 max-w-28">
                                        <div className="text-sm font-medium text-gray-200 group-hover:text-gray-500 truncate">{song.title}</div>
                                        <div className="text-xs text-gray-400 truncate">
                                            {song.artist}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-lg font-semibold text-gray-300 mb-3 mt-4">Trending Songs</h2>
                        <div className="flex flex-col gap-3 w-full">
                            {tracks.slice(6).map((song) => (
                                <div
                                    key={song.id}
                                    className="flex items-center gap-3 py-1 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 px-1 rounded-lg group"
                                    onClick={() => handlePlaySong(song)}
                                >
                                    {/* Album Art */}
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
                                        {song.albumArt ? (
                                            <img
                                                src={song.albumArt || "/placeholder.svg"}
                                                alt={song.title}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <LuMusic className="w-6 h-6 text-white" />
                                        )}
                                    </div>

                                    {/* Song Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-200 group-hover:text-gray-700 truncate">{song.title}</div>
                                        <div className="text-xs text-gray-400 truncate">
                                            {song.artist}
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="text-xs text-gray-400">{formatTime(song.duration)}</div>

                                    {/* More Options */}
                                    <Button variant="ghost" size="sm" className="p-1">
                                        <FiMoreHorizontal className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Library
