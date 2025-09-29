import { useChessGame } from "@/hooks/useChessGame";
import { Chessboard } from "react-chessboard";
import { IoIosOptions } from "react-icons/io";
import Controls from "./Controls";
import GameOver from "./GameOver";
import { useThreeDPieces } from "./ThreeDPieces";
import CapturedPieces from "./CapturedPieces";

const ChessHome = () => {
    const threeDPieces = useThreeDPieces();
    const { capturedBlack, capturedWhite, onSquareClick, position, optionSquares, onPieceDrop, moveHistory, replayIndex, isReplaying, handleReplayMove } = useChessGame()

    const chessboardOptions = {
        onPieceDrop: isReplaying ? () => false : onPieceDrop,
        onSquareClick: isReplaying ? () => { } : onSquareClick,
        allowDragOffBoard: false,
        position,
        squareStyles: optionSquares,
        pieces: threeDPieces,
        boardStyle: {
            transform: 'rotateX(27.5deg)',
            transformOrigin: 'center',
            border: '16px solid #b8836f',
            borderStyle: 'outset',
            borderRightColor: ' #b27c67',
            borderRadius: '4px',
            boxShadow: 'rgba(0, 0, 0, 0.5) 2px 24px 24px 8px',
            borderRightWidth: '2px',
            borderLeftWidth: '2px',
            borderTopWidth: '0px',
            borderBottomWidth: '18px',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            padding: '8px 8px 12px',
            background: '#e0c094',
            backgroundImage: 'url("/chess/wood-pattern.png")',
            backgroundSize: 'cover',
            overflow: 'visible',
            maxWidth: "320px"
        },
        lightSquareStyle: {
            backgroundColor: '#e0c094',
            backgroundImage: 'url("/chess/wood-pattern.png")',
            backgroundSize: 'cover',
        },
        darkSquareStyle: {
            backgroundColor: '#865745',
            backgroundImage: 'url("/chess/wood-pattern.png")',
            backgroundSize: 'cover'
        },
        id: 'click-or-drag-to-move'
    };

    return (
        <div className="relative h-full w-full flex flex-col bg-[url('/chess/wood-pattern.png')] bg-cover bg-center bg-no-repeat items-center gap-12 px-2">

            <GameOver />

            <div className="flex items-center justify-between w-full mt-12 pt-2">
                <h1 className="text-2xl text-white text-center font-serif italic">Chess Mogul</h1>

                <IoIosOptions />
            </div>
            <div className="w-full max-h-[340px] flex flex-col -space-y-3">
                <CapturedPieces color="w" pieces={capturedWhite} />

                <Chessboard options={chessboardOptions} />

                <CapturedPieces color="b" pieces={capturedBlack} />
            </div>

            <Controls onReplay={handleReplayMove} replayIndex={replayIndex} moveHistory={moveHistory} />
        </div>
    )
}

export default ChessHome