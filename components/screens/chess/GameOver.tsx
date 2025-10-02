import { Button } from '@/components/ui/button';
import { useGame } from './GameContext';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from 'react';

type GameStatus = {
    gameOver: boolean;
    result?: string;
    winner?: string;
}

const GameOver = ({ gameOver }: { gameOver: GameStatus }) => {
    const { restartGame, navigateToMenu } = useGame()
    const [open, setOpen] = useState(gameOver ? true : false)

    if (!gameOver || !gameOver.gameOver) return null

    let gameDetails;

    console.log(gameOver)

    switch (gameOver.result) {
        case "checkmate":
            gameDetails = {
                title: gameOver.winner === "White" ? "You Win" : "You Loose",
                description: `${gameOver.winner === "White" ? "You have delivered a magnificent checkmate. Congratulations" : "That was a close one. Try again and show em who's the boss."}`
            }
            break;
        case "forfeit":
            gameDetails = {
                title: "You Loose",
                description: "You forfeited the game. Play continuously to sharpen your spider🕷 senses."
            }
            break;
        case "stalemate":
            gameDetails = {
                title: "Stalemate",
                description: "Whoops!! What a game. Game has ended in a stalemate."
            }
            break;
        case "insufficient material":
            gameDetails = {
                title: "Draw",
                description: "There are not enough pieces on the board to continue the game"
            }
            break;
        case "threefold repetition":
            gameDetails = {
                title: "Draw",
                description: "You have repeated the same moves consecutively. Game has ended due to threefold repetition!"
            }
            break;
        case "draw":
            gameDetails = {
                title: "Draw",
                description: "Game has ended in a draw"
            }
        default:
            break;
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent className=' bg-black/50'>
                <DialogHeader>
                    <DialogTitle>{gameDetails?.title}</DialogTitle>
                    <DialogDescription>
                        {gameDetails?.description}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className='flex flex-row gap-5 justify-between items-center'>
                    <DialogClose
                        className="cursor-pointer"
                        onClick={navigateToMenu}
                    >
                        Menu
                    </DialogClose>

                    <Button
                        type="button"
                        className="cursor-pointer bg-transparent hover:bg-transparent text-base text-green-400 font-bold"
                        onClick={() => {
                            setOpen(false);
                            restartGame()
                        }}
                    >
                        Play again
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default GameOver