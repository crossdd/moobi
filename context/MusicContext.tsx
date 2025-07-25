'use client';

import React, {
    createContext,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import {type MusicPlayerScreen, Song} from "@/types";

interface ContextType {
    audioRef: RefObject<HTMLAudioElement | null>
    musicCatalog: Song[]
    setMusicCatalog: Dispatch<SetStateAction<Song[]>>
    searchResults: Song[]
    setSearchResults: Dispatch<SetStateAction<Song[]>>
    currentSong: Song | null
    setCurrentSong: Dispatch<SetStateAction<Song | null>>
    currentPlayerScreen: MusicPlayerScreen;
    setCurrentPlayerScreen: Dispatch<SetStateAction<MusicPlayerScreen>>;

    progress: number[]
    setProgress: Dispatch<SetStateAction<number[]>>;
    audioError: string | null;
    isPlaying: boolean
    isLoading: boolean
    playSong: (song: Song) => Promise<void>
    playPause: () => void;
    skipForward: () => void
    skipBackward: () => void
    toggleRepeat: () => void
    repeatMode: "off" | "all" | "one"

    volume: number[],
    setVolume: Dispatch<SetStateAction<number[]>>;
    isShuffled: boolean
    setIsShuffled: Dispatch<SetStateAction<boolean>>;
}

const INIT_STATE: ContextType = {
    audioRef: {current: null},
    musicCatalog: [],
    setMusicCatalog: () => {},
    searchResults: [],
    setSearchResults: () => {},
    currentSong: null,
    setCurrentSong: () => {},
    currentPlayerScreen: 'library',
    setCurrentPlayerScreen: () => {},
    progress: [0],
    setProgress: () => {},
    audioError: null,
    playSong: async() => {},
    playPause: () => {},
    skipBackward: () => {},
    skipForward: () => {},
    toggleRepeat: () => {},
    repeatMode: 'off',
    isPlaying: false,
    isLoading: false,
    setVolume: () => {},

    volume: [],
    isShuffled: false,
    setIsShuffled: () => {}
};

const MusicContext = createContext<ContextType>(INIT_STATE);

const MusicProvider = ({ children }: { children: ReactNode }) => {
    const [currentPlayerScreen, setCurrentPlayerScreen] = useState<MusicPlayerScreen>("library")

    const [musicCatalog, setMusicCatalog] = useState<Song[]>([])
    const [searchResults, setSearchResults] = useState<Song[]>([])
    const [currentSong, setCurrentSong] = useState<Song | null>(null)
    const [progress, setProgress] = useState<number[]>([0])
    const [audioError, setAudioError] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)
    const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("all")
    const [volume, setVolume] = useState([75])
    const [isLoading, setIsLoading] = useState(false)

    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateProgress = () => {
            if (audio.currentTime && audio.duration) {
                setProgress([audio.currentTime])
            }
        }

        const handleEnded = () => {
            if (repeatMode === "one") {
                audio.currentTime = 0
                audio.play()
            } else if (repeatMode === "all" || isShuffled) {
                skipForward()
            } else {
                setIsPlaying(false)
            }
        }

        const handleVolumeChange = () => {
            setVolume([audio.volume * 100])
        }

        audio.addEventListener("timeupdate", updateProgress)
        audio.addEventListener("ended", handleEnded)
        audio.addEventListener("volumechange", handleVolumeChange)

        return () => {
            audio.removeEventListener("timeupdate", updateProgress)
            audio.removeEventListener("ended", handleEnded)
            audio.removeEventListener("volumechange", handleVolumeChange)
        }
    }, [repeatMode, isShuffled])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume[0] / 100
        }
    }, [volume])

    const playSong = async (song: Song) => {
        try {
            setAudioError(null)
            setCurrentSong(song)
            setIsLoading(true)
            setProgress([0])
            setCurrentPlayerScreen("nowPlaying")

            // Get stream URL
            const response = await fetch(`/api/music-player/stream?id=${song.id}`)
            const data = await response.json()

            if (data.success && audioRef.current) {
                audioRef.current.src = data.streamUrl
                audioRef.current.load()

                audioRef.current.onloadedmetadata = () => {
                    if (audioRef.current) {
                        setIsPlaying(true)
                        audioRef.current.play().catch((error) => {
                            console.error("Error playing audio:", error)
                            setIsLoading(false)
                            setAudioError("Failed to play audio")
                        })
                    }
                }

                audioRef.current.onerror = () => {
                    setAudioError("Failed to load audio")
                    setIsPlaying(false)
                    setIsLoading(false)
                }
            }
        } catch (error) {
            console.error("Error playing song:", error)
            setAudioError("Failed to load song")
        } finally {
            setIsLoading(false)
        }
    }

    const playPause = () => {
        if (!audioRef.current || !currentSong) return

        console.log("Play paused", audioRef.current)

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play().catch((error) => {
                console.error("Error playing audio:", error)
                setAudioError("Failed to play audio")
            })
        }
        setIsPlaying(!isPlaying)
    }

    const skipForward = () => {
        if (!currentSong) return

        const currentList = currentPlayerScreen === 'library' ? musicCatalog : searchResults
        const currentIndex = currentList.findIndex((song) => song.id === currentSong.id)
        const nextIndex = (currentIndex + 1) % currentList.length
        playSong(currentList[nextIndex])
    }

    const skipBackward = () => {
        if (!currentSong) return

        const currentList = currentPlayerScreen === 'library' ? musicCatalog : searchResults
        const currentIndex = currentList.findIndex((song) => song.id === currentSong.id)
        const prevIndex = currentIndex === 0 ? currentList.length - 1 : currentIndex - 1
        playSong(currentList[prevIndex])
    }

    const toggleRepeat = () => {
        const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"]
        const currentIndex = modes.indexOf(repeatMode)
        const nextIndex = (currentIndex + 1) % modes.length
        setRepeatMode(modes[nextIndex])
    }

    return (
        <MusicContext.Provider
            value={{
                audioRef,
                musicCatalog,
                setMusicCatalog,
                searchResults,
                setSearchResults,
                currentPlayerScreen,
                setCurrentPlayerScreen,
                progress,
                setProgress,
                currentSong,
                setCurrentSong,
                audioError,
                playSong,
                playPause,
                skipForward,
                skipBackward,
                repeatMode,
                toggleRepeat,
                isShuffled,
                setIsShuffled,
                volume,
                setVolume,
                isPlaying,
                isLoading
            }}
        >
            {children}
            <audio ref={audioRef} className="hidden" />
        </MusicContext.Provider>
    );
};

const useMusic = () => useContext(MusicContext);

export { MusicProvider, useMusic };
