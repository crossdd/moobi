import { Chessboard } from "react-chessboard";
import { IoIosOptions } from "react-icons/io";
import CapturedPieces from "./CapturedPieces";
import Controls from "./Controls";
import { useGame } from "./GameContext";
import GameOver from "./GameOver";
import SplashScreen from "./SplashScreen";
import { useThreeDPieces } from "./ThreeDPieces";

const ChessHome = () => {
  const threeDPieces = useThreeDPieces();
  const {
    onSquareClick,
    position,
    optionSquares,
    onPieceDrop,
    isReplaying,
    screen,
    gameOver,
  } = useGame();

  const chessboardOptions = {
    onPieceDrop: isReplaying ? () => false : onPieceDrop,
    onSquareClick: isReplaying ? () => {} : onSquareClick,
    allowDragOffBoard: false,
    position,
    squareStyles: optionSquares,
    pieces: threeDPieces,
    boardStyle: {
      transform: "rotateX(27.5deg)",
      transformOrigin: "center",
      border: "16px solid #b8836f",
      borderStyle: "outset",
      borderRightColor: " #b27c67",
      borderRadius: "4px",
      boxShadow: "rgba(0, 0, 0, 0.5) 2px 24px 24px 8px",
      borderRightWidth: "2px",
      borderLeftWidth: "2px",
      borderTopWidth: "0px",
      borderBottomWidth: "18px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      padding: "8px 8px 12px",
      background: "#e0c094",
      backgroundImage: 'url("/chess/wood-pattern.png")',
      backgroundSize: "cover",
      overflow: "visible",
      maxWidth: "320px",
    },
    lightSquareStyle: {
      backgroundColor: "#e0c094",
      backgroundImage: 'url("/chess/wood-pattern.png")',
      backgroundSize: "cover",
    },
    darkSquareStyle: {
      backgroundColor: "#865745",
      backgroundImage: 'url("/chess/wood-pattern.png")',
      backgroundSize: "cover",
    },
    id: "click-or-drag-to-move",
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center gap-12 bg-[url('/chess/wood-pattern.png')] bg-cover bg-center bg-no-repeat px-2">
      {screen === "menu" && <SplashScreen />}

      {screen === "playing" && (
        <>
          {gameOver && <GameOver gameOver={gameOver} />}

          <div className="mt-12 flex w-full items-center justify-between pt-2">
            <h1 className="text-center font-serif text-2xl italic text-white">
              Chess Mogul
            </h1>

            <IoIosOptions />
          </div>
          <div className="flex max-h-[340px] w-full flex-col -space-y-3">
            <CapturedPieces color="white" />

            <Chessboard options={chessboardOptions} />

            <CapturedPieces color="black" />
          </div>

          <Controls />
        </>
      )}
    </div>
  );
};

export default ChessHome;
