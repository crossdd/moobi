"use client"

import Library from "@/components/screens/music-player/Library";
import Search from "@/components/screens/music-player/Search";
import NowPlaying from "@/components/screens/music-player/NowPlaying";
import {useMusic} from "@/context/MusicContext";
import MiniPlayer from "@/components/screens/music-player/MiniPlayer";

const MusicPlayer = () => {
    const {currentPlayerScreen, currentSong} = useMusic()

    return (
        <div className="relative w-full h-full overflow-y-scroll overflow-x-hidden no-visible-scrollbar pt-7">
            {/* Library View */}
            {currentPlayerScreen === "library" && (
               <Library  />
            )}

            {/* Search View */}
            {currentPlayerScreen === "search" && (
                <Search />
            )}

            {/* Now Playing View */}
            {currentPlayerScreen === "nowPlaying" && currentSong && (
               <NowPlaying />
            )}

            {/* Mini Player (when not in now playing view) */}
            {currentSong && currentPlayerScreen !== "nowPlaying" && (
                <MiniPlayer />
            )}
        </div>
    )
}

export default MusicPlayer
