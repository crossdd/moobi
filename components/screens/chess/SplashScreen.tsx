import { useThreeDPieces } from "./ThreeDPieces";
import { useGame } from "./GameContext";

const SplashScreen = () => {
    const { startGame } = useGame()
    const threeDPieces = useThreeDPieces(2.25);

    const WhiteKing = threeDPieces["wK"];
    const BlackQueen = threeDPieces["bQ"];

    return (
        <div className="w-full h-full flex-center flex-col mt-24">
            <div className="flex -space-x-12">
                <WhiteKing />
                <BlackQueen />
            </div>

            <h1 className="text-5xl font-semibold font-mono text-white pointer-events-none leading-6 text-center">
                Chess Mogul
            </h1>

            <div className="mt-7 flex flex-col gap-4">
                <button onClick={() => startGame("easy")} className="border-2  bg-black hover:backdrop-blur-md hover:bg-black/60 px-6 py-2 rounded-lg transition">Easy</button>
                <button onClick={() => startGame("medium")} className="border-2  bg-black hover:backdrop-blur-md hover:bg-black/60 px-6 py-2 rounded-lg transition">Medium</button>
                <button onClick={() => startGame("hard")} className="border-2  bg-black hover:backdrop-blur-md hover:bg-black/60 px-6 py-2 rounded-lg transition">Hard</button>
            </div>
        </div>
    )
}

export default SplashScreen