import { useChessGame } from "@/hooks/useChessGame";
import { Chessboard } from "react-chessboard";
import { useThreeDPieces } from "./ThreeDPieces";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LuRefreshCcw } from "react-icons/lu";

const ChessHome = () => {
    const threeDPieces = useThreeDPieces();
    const { restartGame, gameOver, capturedBlack, capturedWhite, onSquareClick, position, optionSquares, onPieceDrop } = useChessGame()

    // set the chessboard options
    const chessboardOptions = {
        onPieceDrop,
        onSquareClick,
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
        <div className="relative h-full w-full flex flex-col bg-[url('/chess/wood-pattern.png')] bg-cover bg-center bg-no-repeat items-center gap-12">
            {gameOver && (
                <Alert className="absolute inset-0 top-1/2 -translate-y-1/2 transform z-[9999] flex-center flex-col h-32">
                    <AlertTitle className="capitalize text-2xl">{gameOver.winner === "white" ? "White wins" : gameOver.winner === "black" ? "Black wins" : "Draw"}</AlertTitle>
                    <AlertDescription className="block mt-1">
                        {gameOver.result === "checkmate" && `${gameOver.winner} has delivered a checkmate!`}
                        {gameOver.result === "stalemate" && "The game is a stalemate."}
                        {gameOver.result === "insufficient material" && "The game is a draw due to insufficient material."}
                        {gameOver.result === "threefold repetition" && "The game is a draw by threefold repetition."}
                        {gameOver.result === "draw" && "The game is a draw."}
                    </AlertDescription>

                    <Button className="bg-[#e0c094] hover:bg-[#e0c094] focus:bg-[#e0c094] mt-6 mb-3 text-black" onClick={restartGame}>Play Again</Button>
                </Alert>
            )}

            <div className="flex items-center justify-between w-full mt-12 pt-5 px-2">
                <h1 className="text-2xl text-white text-center font-serif italic">Chess Mogul</h1>

                <Button className="bg-[#e0c094] hover:bg-[#e0c094] focus:bg-[#e0c094]" onClick={restartGame}><LuRefreshCcw className="text-black" /></Button>
            </div>
            <div className="max-w-[320px] w-full max-h-[420px] flex flex-col">
                <div className="flex items-center justify-end flex-wrap">
                    {capturedWhite.map((p, idx) => {
                        const PieceIcon = threeDPieces["w" + p.toUpperCase()];
                        return <PieceIcon key={idx} />;
                    })}
                </div>

                <Chessboard options={chessboardOptions} />

                <div className="flex items-center justify-end flex-wrap">
                    {capturedBlack.map((p, idx) => {
                        const PieceIcon = threeDPieces["b" + p.toUpperCase()];
                        return <PieceIcon key={idx} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default ChessHome