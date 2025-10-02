import React from 'react'
import { LuMusic, LuPause, LuPlay } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/context/MusicContext";

const MiniPlayer = () => {
    const { currentSong, setCurrentPlayerScreen, playPause, isPlaying } = useMusic()

    if (!currentSong) return null

    return (
        <div
            className="absolute bottom-0 w-full bg-gray-900 border-t border-gray-200 rounded-t-lg py-4 px-2.5 flex items-center justify-between gap-3 cursor-pointer"
            onClick={() => setCurrentPlayerScreen("nowPlaying")}
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center overflow-hidden">
                    {currentSong.albumArt ? (
                        <img
                            src={currentSong.albumArt || "/placeholder.svg"}
                            alt={currentSong.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <LuMusic className="w-5 h-5 text-white" />
                    )}
                </div>

                <div className="flex-1 max-w-36">
                    <div className="text-sm font-medium text-gray-200 truncate">{currentSong.title}</div>
                    <div className="text-xs text-gray-400 truncate">
                        {currentSong.artist}
                    </div>
                </div>
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                    e.stopPropagation()
                    playPause()
                }}
                className="text-white"
            >
                {isPlaying ? <LuPause className="w-5 h-5" /> : <LuPlay className="w-5 h-5" />}
            </Button>
        </div>
    )
}
export default MiniPlayer
