import React, {useEffect, useState} from 'react'
import {
    LuChevronDown,
    LuHeart, LuLoader,
    LuMusic,
    LuPause,
    LuPlay,
    LuRepeat,
    LuShuffle,
    LuSkipBack,
    LuSkipForward,
    LuUser,
    LuVolume2
} from "react-icons/lu";
import {FiMoreHorizontal} from "react-icons/fi";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {useMusic} from "@/context/MusicContext";
import {AiFillExclamationCircle} from "react-icons/ai";

const NowPlaying = () => {
    const {audioRef, setCurrentPlayerScreen, currentSong, audioError, setIsShuffled, skipForward, skipBackward, progress, setProgress, toggleRepeat, playPause, volume, setVolume, isPlaying, isShuffled, repeatMode, isLoading} = useMusic()

    const [isLiked, setIsLiked] = useState(false)
    const [showError, setShowError] = useState(true)

    useEffect(() => {
        if(!audioError) setShowError(false)

        const timeoutId = setTimeout(() => {
            setShowError(false)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [audioError])

    if(!currentSong) {
        setCurrentPlayerScreen("library");
        return;
    }

    const handleProgressChange = (newProgress: number[]) => {
        if (audioRef.current && currentSong) {
            audioRef.current.currentTime = newProgress[0]
            setProgress(newProgress)
        }
    }

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "0:00"
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    return (
        <div className="flex flex-col gap-5 bg-gradient-to-b from-purple-100 to-pink-100 w-full h-full relative overflow-hidden py-2">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => setCurrentPlayerScreen("library")} className="p-2">
                    <LuChevronDown className="w-5 h-5" />
                </Button>
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">Playing from Audius</div>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                    <FiMoreHorizontal className="w-5 h-5" />
                </Button>
            </div>

            {/* Song Info */}
            <div className="flex flex-col items-center gap-4">
                <div className="w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                    {currentSong.albumArt ? (
                        <img
                            src={currentSong.albumArt || "/placeholder.svg"}
                            alt={currentSong.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <LuMusic className="w-24 h-24 text-white" />
                    )}
                </div>

                <div className="text-center">
                    <h1 className="text-lg font-bold text-gray-400 mb-1">{currentSong.title}</h1>
                    <p className="text-sm text-gray-500">{currentSong.artist}</p>
                </div>
            </div>

             {/*Error Message */}
            {audioError && showError && (
                <div className="absolute top-12 right-0 w-fit max-w-52 px-6 py-2 bg-red-200 border border-red-400 p-2 rounded flex items-center gap-2">
                    <AiFillExclamationCircle />

                    <span className="text-sm">
                        {audioError}
                    </span>
                </div>
            )}

            {/* Progress Bar */}
            <div className="px-3">
                <Slider
                    value={progress}
                    onValueChange={handleProgressChange}
                    max={audioRef.current?.duration || currentSong.duration}
                    step={1}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatTime(progress[0])}</span>
                    <span>{formatTime(audioRef.current?.duration || currentSong.duration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="px-3">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={`p-2 ${isShuffled ? "text-red-500" : "text-gray-500"}`}
                    >
                        <LuShuffle className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" onClick={skipBackward} className="p-2 text-gray-600">
                            <LuSkipBack className="w-6 h-6" />
                        </Button>

                        <Button
                            onClick={playPause}
                            disabled={!!audioError}
                            className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                        >
                            {!isLoading && (isPlaying ? (
                                <LuPause className="w-8 h-8 text-black" />
                            ) : (
                                <LuPlay className="w-8 h-8 text-black ml-1" />
                            ))}

                            {isLoading && (
                                <LuLoader className="w-8 h-8 text-black spin-custom" />
                            )}
                        </Button>

                        <Button variant="ghost" size="sm" onClick={skipForward} className="p-2 text-gray-600">
                            <LuSkipForward className="w-6 h-6" />
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleRepeat}
                        className={`p-2 gap-0.5 ${repeatMode !== "off" ? "text-red-500" : "text-gray-500"}`}
                    >
                        <LuRepeat className="w-5 h-5" />
                        {repeatMode === "one" && <span className="text-xs">1</span>}
                    </Button>
                </div>

                {/* Secondary Controls */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2 ${isLiked ? "text-red-500" : "text-gray-600"}`}
                    >
                        <LuHeart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    </Button>

                    <div className="flex items-center gap-2 flex-1 max-w-32 mx-4">
                        <LuVolume2 className="w-4 h-4 text-gray-600" />
                        <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
                    </div>

                    <Button variant="ghost" size="sm" className="p-2">
                        <LuUser className="w-5 h-5 text-gray-600" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default NowPlaying
