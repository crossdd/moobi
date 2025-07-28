"use client"

import React, {useState} from "react"
import {LuHeart, LuLoader, LuMusic, LuPause, LuPlay, LuSkipBack, LuSkipForward, LuVolume2} from "react-icons/lu"
import {Button} from "@/components/ui/button"
import {Slider} from "@/components/ui/slider"
import {useMusic} from "@/context/MusicContext";

const MusicPlayerWidget = () =>  {
    const {isPlaying, currentSong, progress, volume, setProgress, setVolume, playPause, skipForward, skipBackward, isLoading} = useMusic()

    const [isLiked, setIsLiked] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "0:00"
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="mt-auto mb-8 px-3 py-5">
            <div
                className={`bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl transition-all duration-300 ${
                    isExpanded ? "p-6" : "p-4"
                }`}
                onClick={toggleExpanded}
            >
                {/* Compact View */}
                {!isExpanded ? (
                    <div className="">
                        <div className="flex items-center gap-4">
                        {/* Album Art */}
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                            {currentSong?.albumArt ? (
                                <img
                                    src={currentSong.albumArt}
                                    alt={currentSong?.title}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <LuMusic className="w-24 h-24 text-white" />
                            )}
                        </div>

                        {/* Song Info */}
                        <div className="flex-1 min-w-0">
                            <div className="text-white font-medium text-sm truncate">{currentSong?.title}</div>
                            <div className="text-gray-400 text-xs truncate">{currentSong?.artist}</div>
                        </div>

                        {/* Play/Pause Button */}
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                playPause()
                            }}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 border-0 p-0 shadow-lg"
                        >
                            {isPlaying ? (
                                <LuPause className="w-5 h-5 text-white" />
                            ) : (
                                <LuPlay className="w-5 h-5 text-white ml-0.5" />
                            )}
                        </Button>

                        {/* Skip Forward */}
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                skipForward()
                            }}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border-0 p-0"
                        >
                            <LuSkipForward className="w-4 h-4 text-white" />
                        </Button>
                    </div>

                        <div className="mt-3 h-1 bg-white/70 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-1000"
                                style={{ width: `${(progress[0] / (currentSong?.duration || 0)) * 100}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    /* Expanded View */
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                                {currentSong?.albumArt ? (
                                    <img
                                        src={currentSong.albumArt}
                                        alt={currentSong?.title}
                                        className="w-full h-full rounded-2xl object-cover"
                                    />
                                ) : (
                                    <LuMusic className="w-24 h-24 text-white" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-white font-semibold text-sm truncate">{currentSong?.title}</div>
                                <div className="text-white/70 text-xs truncate">{currentSong?.artist}</div>
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsLiked(!isLiked)
                                }}
                                className={`w-10 h-10 rounded-full border-0 p-0 ${
                                    isLiked ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/70"
                                }`}
                            >
                                <LuHeart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                            </Button>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <Slider
                                value={progress}
                                onValueChange={setProgress}
                                max={currentSong?.duration}
                                step={1}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-white/60">
                                <span>{formatTime(progress[0])}</span>
                                <span>{formatTime(currentSong?.duration || 0)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-8">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    skipBackward()
                                }}
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border-0 p-0"
                            >
                                <LuSkipBack className="w-6 h-6 text-white" />
                            </Button>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    playPause()
                                }}
                                className="w-16 h-16 rounded-full bg-white hover:bg-white/90 border-0 p-0 shadow-xl"
                            >
                                {!isLoading && (isPlaying ? (
                                    <LuPause className="w-8 h-8 text-black" />
                                ) : (
                                    <LuPlay className="w-8 h-8 text-black ml-1" />
                                ))}

                                {isLoading && (
                                    <LuLoader className="w-8 h-8 text-white spin-custom" />
                                )}
                            </Button>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    skipForward()
                                }}
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border-0 p-0"
                            >
                                <LuSkipForward className="w-6 h-6 text-white" />
                            </Button>
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center gap-3">
                            <LuVolume2 className="w-4 h-4 text-white/70" />
                            <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
                            <span className="text-xs text-white/60 w-8 text-right">{volume[0]}%</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MusicPlayerWidget
