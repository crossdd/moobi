import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { LuFlag, LuRefreshCcw } from 'react-icons/lu';
import { useGame } from './GameContext';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Controls = () => {
    const { restartGame, replayIndex, moveHistory, handleReplayMove: onReplay, forfeitGame } = useGame()

    const [open, setOpen] = useState(false)

    return (
        <div className="absolute bottom-6 left-0 flex gap-2 w-full bg-black/5 h-10 py-2 px-4 justify-between items-center z-[9999]">
            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogTrigger className="text-white flex-center flex-col">
                    <LuFlag className='fill-white' />
                    <span className="text-sm">Forfeit</span>
                </DialogTrigger>

                <DialogContent className=' bg-black/50 px-2'>
                    <DialogHeader>
                        <DialogTitle>Abandon Game</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to forfeit this match?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className='flex flex-row gap-5 justify-between items-center'>
                        <DialogClose
                            className="cursor-pointer"
                        >
                            Cancel
                        </DialogClose>

                        <Button
                            type="button"
                            className="cursor-pointer bg-transparent hover:bg-transparent font-bold text-red-400"
                            onClick={() => {
                                console.log("Clicked")
                                forfeitGame()
                                setOpen(false);
                            }}
                        >
                            Quit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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