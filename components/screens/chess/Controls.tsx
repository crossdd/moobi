import { useChessGame } from '@/hooks/useChessGame';
import { Move } from 'chess.js';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { LuRefreshCcw } from 'react-icons/lu';

const Controls = ({ onReplay, replayIndex, moveHistory }: { onReplay: (direction: "forward" | "back") => void; replayIndex: number; moveHistory: Move[] }) => {
    const { restartGame } = useChessGame()

    return (
        <div className="absolute bottom-6 left-0 flex gap-2 w-full bg-black/5 h-10 py-2 px-4 justify-between items-center z-[9999]">
            <button className="bg-transparent text-white flex-center flex-col" onClick={restartGame}>
                <LuRefreshCcw />
                <span className="text-sm">Restart</span>
            </button>

            <button
                disabled={moveHistory.length === 0}
                className="bg-transparent text-white flex-center flex-col"
                onClick={() => onReplay("back")}
            >
                <BsChevronLeft />
                <span className="text-sm">Back</span>
            </button>
            <button
                disabled={replayIndex === moveHistory.length}
                className="bg-transparent text-white flex-center flex-col disabled:cursor-not-allowed"
                onClick={() => onReplay("forward")}
            >
                <BsChevronRight />
                <span className="text-sm">Forward</span>
            </button>
        </div>

    )
}

export default Controls