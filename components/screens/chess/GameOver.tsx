import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useChessGame } from '@/hooks/useChessGame'

const GameOver = () => {
    const { restartGame, gameOver } = useChessGame()

    if (!gameOver) return null;

    return (
        <div className="absolute inset-0 top-1/2 -translate-y-1/2 transform z-[999] px-4 flex-center">
            <Alert className="flex-center flex-col bg-white/40 backdrop-blur-sm text-black rounded-lg shadow-lg py-2">
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
        </div>
    )
}

export default GameOver