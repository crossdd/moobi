"use client";

import Library from "@/components/screens/music-player/Library";
import Search from "@/components/screens/music-player/Search";
import NowPlaying from "@/components/screens/music-player/NowPlaying";
import MiniPlayer from "@/components/screens/music-player/MiniPlayer";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";

const MusicPlayer = () => {
  const { currentPlayerScreen, currentSong } = useMusicPlayer();

  return (
    <div className="no-visible-scrollbar relative h-full w-full overflow-x-hidden bg-black">
      {/* Library View */}
      {currentPlayerScreen === "library" && <Library />}

      {/* Search View */}
      {currentPlayerScreen === "search" && <Search />}

      {/* Now Playing View */}
      {currentPlayerScreen === "nowPlaying" && currentSong && <NowPlaying />}

      {/* Mini Player */}
      {currentSong && currentPlayerScreen !== "nowPlaying" && <MiniPlayer />}
    </div>
  );
};

export default MusicPlayer;
