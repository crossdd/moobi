"use client"

import {useMedia} from "@/context/MediaContext"
import type React from "react"
import {useEffect, useRef, useState} from "react"
import {LuPause, LuPlay} from "react-icons/lu"
import {useSwipeable} from "react-swipeable";

const VideoPlayer = () => {
    const { media, goToNextMedia, goToPreviousMedia } = useMedia()

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            goToNextMedia()
        },
        onSwipedRight: () => {
            goToPreviousMedia()
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
        delta: 10
    });

    const videoRef = useRef<HTMLVideoElement>(null)

    const [isPlaying, setIsPlaying] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [showControls, setShowControls] = useState(true)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoadedMetadata = () => setDuration(video.duration)
        const updateTime = () => setCurrentTime(video.currentTime)
        const handleEnded = () => {
            setIsPlaying(false)
            setShowControls(true)
        }

        video.addEventListener("loadedmetadata", handleLoadedMetadata)
        video.addEventListener("timeupdate", updateTime)
        video.addEventListener("ended", handleEnded)

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata)
            video.removeEventListener("timeupdate", updateTime)
            video.removeEventListener("ended", handleEnded)
        }
    }, [media])


    // Auto-hide controls after 2 seconds of inactivity
    useEffect(() => {
        if (showControls && isPlaying) {
            const timer = setTimeout(() => {
                setShowControls(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [showControls, isPlaying])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handlePlayPause = () => {
        const video = videoRef.current
        if (!video) return

        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }

        setShowControls(true)
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current
        if (!video) return

        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const newTime = (clickX / rect.width) * duration

        video.currentTime = newTime
        setCurrentTime(newTime)
        setShowControls(true)
    }

    const handleScreenTap = () => {
        setShowControls(!showControls)
    }

    const skip = (seconds: number) => {
        const video = videoRef.current
        if (!video) return

        const newTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
        video.currentTime = newTime
        setCurrentTime(newTime)
        setShowControls(true)
    }

    const progressPercentage = (currentTime / duration) * 100

    return (
        <div className="relative w-full h-full overflow-hidden mt-10">
            <div
                className="relative flex-1 h-[90%] w-full cursor-pointer"
                onClick={handleScreenTap}
                {...swipeHandlers}
            >
                <video
                    ref={videoRef}
                    src={media.url}
                    controls={false}
                    autoPlay
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent px-3">
                    <h1 className="text-white text-lg font-semibold">
                        {media.title}
                    </h1>
                </div>

                {/*  Skip/Play/Pause Buttons */}
                {showControls && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full px-6">
                        {/* Skip Backward */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()

                                skip(-10)
                            }}
                            className="relative w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-200"
                        >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                            </svg>
                            <span className="absolute -bottom-6 text-white text-xs">10s</span>
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation()

                                handlePlayPause()
                            }}
                            className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                        >
                            {isPlaying ? <LuPause size={24} className="text-white" /> : <LuPlay size={24} className="text-white" />}
                        </button>

                        {/* Skip Forward */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()

                                skip(10)
                            }}
                            className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex-center hover:bg-black/60 transition-all duration-200"
                        >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.01 19V15l5 5-5 5v-4c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6h2c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8z" />
                            </svg>
                            <span className="absolute -bottom-6 text-white text-xs">10s</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div
                className={`absolute bottom-12 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 transition-all duration-300 mb-4 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
            >
                <div
                    className="w-full h-1 bg-white/30 rounded-full cursor-pointer hover:h-1.5 transition-all duration-200"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-red-500 rounded-full relative transition-all duration-200"
                        style={{ width: `${progressPercentage}%` }}
                    >
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                </div>
                <div className="flex justify-between text-white text-xs mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer