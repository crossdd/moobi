"use client";

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
} from "react";
import { type MusicPlayerScreen, Song } from "@/types";
import { usePhone } from "@/context/PhoneContext";

interface ContextType {
  audioRef: RefObject<HTMLAudioElement | null>;
  queue: Song[];
  setQueue: Dispatch<SetStateAction<Song[]>>;
  currentSong: Song | null;
  setCurrentSong: Dispatch<SetStateAction<Song | null>>;
  currentPlayerScreen: MusicPlayerScreen;
  setCurrentPlayerScreen: Dispatch<SetStateAction<MusicPlayerScreen>>;
  lastPlayerScreen: MusicPlayerScreen;
  setLastPlayerScreen: Dispatch<SetStateAction<MusicPlayerScreen>>;

  progress: number[];
  setProgress: Dispatch<SetStateAction<number[]>>;
  audioError: string | null;
  isPlaying: boolean;
  isLoading: boolean;
  playSong: (song: Song) => Promise<void>;
  playPause: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  toggleRepeat: () => void;
  repeatMode: "off" | "all" | "one";

  isShuffled: boolean;
  setIsShuffled: Dispatch<SetStateAction<boolean>>;
}
const MusicContext = createContext<ContextType | undefined>(undefined);

const MusicProvider = ({ children }: { children: ReactNode }) => {
  const { volume, setVolume } = usePhone();
  const [currentPlayerScreen, setCurrentPlayerScreen] =
    useState<MusicPlayerScreen>("library");
  const [lastPlayerScreen, setLastPlayerScreen] =
    useState<MusicPlayerScreen>("library");

  const [queue, setQueue] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [progress, setProgress] = useState<number[]>([0]);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.currentTime && audio.duration) {
        setProgress([audio.currentTime]);
      }
    };

    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === "off" || isShuffled) {
        skipForward();
      } else {
        setIsPlaying(false);
      }
    };

    const handleVolumeChange = () => {
      setVolume([audio.volume * 100]);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [repeatMode, isShuffled]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const playSong = async (song: Song) => {
    try {
      setAudioError(null);
      setCurrentSong(song);
      setIsLoading(true);
      setProgress([0]);

      setCurrentPlayerScreen("nowPlaying");

      // Get stream URL
      const response = await fetch(`/api/music-player/stream?id=${song.id}`);
      const data = await response.json();

      if (data.success && audioRef.current) {
        audioRef.current.src = data.streamUrl;
        audioRef.current.load();

        audioRef.current.onloadedmetadata = () => {
          if (audioRef.current) {
            setIsPlaying(true);
            audioRef.current.play().catch((error) => {
              console.error("Error playing audio:", error);
              setIsLoading(false);
              setAudioError("Failed to play audio");
            });
          }
        };

        audioRef.current.onerror = () => {
          setAudioError("Failed to load audio");
          setIsPlaying(false);
          setIsLoading(false);
        };
      }
    } catch (error) {
      console.error("Error playing song:", error);
      setAudioError("Failed to load song");
    } finally {
      setIsLoading(false);
    }
  };

  const playPause = () => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setAudioError("Failed to play audio");
      });
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    if (!currentSong) return;

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % queue.length;
    playSong(queue[nextIndex]);
  };

  const skipBackward = () => {
    if (!currentSong) return;

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id);
    if (currentIndex === -1) return;

    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    playSong(queue[prevIndex]);
  };

  const toggleRepeat = () => {
    const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  return (
    <MusicContext.Provider
      value={{
        audioRef,
        queue,
        setQueue,
        currentPlayerScreen,
        setCurrentPlayerScreen,
        lastPlayerScreen,
        setLastPlayerScreen,
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
        isPlaying,
        isLoading,
      }}
    >
      {children}
      <audio ref={audioRef} className="hidden" />
    </MusicContext.Provider>
  );
};

const useMusic = () => {
  const context = useContext(MusicContext);

  if (context === undefined) {
    throw new Error("useMusic must be used within a Phone Provider");
  }

  return context;
};

export { MusicProvider, useMusic };
