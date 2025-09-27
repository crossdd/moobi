import { useRef, useState } from "react";
import { Chess, Square } from "chess.js";
import { PieceDropHandlerArgs, SquareHandlerArgs } from "react-chessboard";

type GameStatus = {
  gameOver: boolean;
  result?: string;
  winner?: string;
} | null;

export function useChessGame() {
  const chessRef = useRef(new Chess());
  const chess = chessRef.current;

  const [position, setPosition] = useState(chess.fen());
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});
  const [gameOver, setGameOver] = useState<GameStatus | null>(null);

  // Captured Pieces
  const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<string[]>([]);

  function checkGameStatus() {
    if (chess.isCheckmate()) {
      const winner = chess.turn() === "w" ? "Black" : "White";
      // If it's white's turn and there's checkmate, black just delivered mate.
      return { gameOver: true, result: "checkmate", winner };
    }

    if (chess.isStalemate()) {
      return { gameOver: true, result: "stalemate", winner: "Draw" };
    }

    if (chess.isInsufficientMaterial()) {
      return {
        gameOver: true,
        result: "insufficient material",
        winner: "Draw",
      };
    }

    if (chess.isThreefoldRepetition()) {
      return {
        gameOver: true,
        result: "threefold repetition",
        winner: "Draw",
      };
    }

    if (chess.isDraw()) {
      return { gameOver: true, result: "draw", winner: "Draw" };
    }

    return { gameOver: false };
  }

  function makeRandomMove(delay: number = 300) {
    if (chess.isGameOver()) {
      return;
    }

    const possibleMoves = chess.moves();
    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    chess.move(randomMove);

    setTimeout(() => {
      setPosition(chess.fen());
    }, delay);
  }

  function highlightMoves(square: Square) {
    const moves = chess.moves({ square, verbose: true });
    if (moves.length === 0) return (setOptionSquares({}), false);

    const highlights: Record<string, React.CSSProperties> = {};
    moves.forEach((move) => {
      highlights[move.to] = {
        background: chess.get(move.to)
          ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
          : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });

    highlights[square] = { background: "rgba(255,255,0,0.4)" }; // selected square
    setOptionSquares(highlights);
    return true;
  }

  function attemptMove(sourceSquare: Square, targetSquare: Square) {
    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (!move) return false;

      if (move.captured) {
        if (move.color === "w") {
          setCapturedBlack((prev) => [...prev, move.captured!]);
        } else {
          setCapturedWhite((prev) => [...prev, move.captured!]);
        }
      }

      const status = checkGameStatus();

      if (status.gameOver) {
        setGameOver(status);
      }

      setPosition(chess.fen());
      setMoveFrom("");
      setOptionSquares({});
      setTimeout(makeRandomMove, 300);

      return true;
    } catch {
      return false;
    }
  }

  function onSquareClick({ square, piece }: SquareHandlerArgs) {
    // piece clicked to move
    if (!moveFrom && piece) {
      const hasMoveOptions = highlightMoves(square as Square);

      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      return;
    }

    // Check if a square selected to move to is a valid move
    const moves = chess.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    // If not
    if (!foundMove) {
      // check if player clicked on a different piece to move
      const hasMoveOptions = highlightMoves(square as Square);

      setMoveFrom(hasMoveOptions ? square : "");

      return;
    }

    attemptMove(moveFrom as Square, square as Square);
  }

  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    if (!targetSquare) {
      return false;
    }

    return attemptMove(sourceSquare as Square, targetSquare as Square);
  }

  function restartGame() {
    chess.reset();
    setPosition(chess.fen());
    setOptionSquares({});
    setGameOver(null);
    setCapturedWhite([]);
    setCapturedBlack([]);
    setMoveFrom("");
  }

  return {
    position,
    optionSquares,
    capturedWhite,
    capturedBlack,
    gameOver,
    restartGame,
    onPieceDrop,
    onSquareClick,
  };
}
