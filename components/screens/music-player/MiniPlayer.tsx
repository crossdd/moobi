import { LuMusic, LuPause, LuPlay } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";

const MiniPlayer = () => {
  const { currentSong, setCurrentPlayerScreen, playPause, isPlaying } =
    useMusicPlayer();

  if (!currentSong) return null;

  return (
    <div
      className="absolute bottom-0 flex w-full cursor-pointer items-center justify-between gap-3 rounded-t-lg border-t border-gray-200 bg-gray-900 px-2.5 py-4"
      onClick={() => setCurrentPlayerScreen("nowPlaying")}
    >
      <div className="flex items-center gap-3">
        <div className="from-purple-400 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br to-pink-400">
          {currentSong.albumArt ? (
            <img
              src={currentSong.albumArt || "/placeholder.svg"}
              alt={currentSong.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <LuMusic className="h-5 w-5 text-white" />
          )}
        </div>

        <div className="max-w-36 flex-1">
          <div className="truncate text-sm font-medium text-gray-200">
            {currentSong.title}
          </div>
          <div className="truncate text-xs text-gray-400">
            {currentSong.artist}
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          playPause();
        }}
        className="text-white"
      >
        {isPlaying ? (
          <LuPause className="h-5 w-5" />
        ) : (
          <LuPlay className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
export default MiniPlayer;
