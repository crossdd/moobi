import Image from 'next/image'
import { JSX, useLayoutEffect, useMemo, useState } from 'react'

type PieceMap = Record<string, () => JSX.Element>

export const useThreeDPieces = (scaleOverride?: number) => {
    const [squareWidth, setSquareWidth] = useState(40)

    useLayoutEffect(() => {
        const updateSize = () => {
            const el = document.querySelector('[data-column="a"][data-row="1"]') as HTMLElement | null;

            if (el) {
                setSquareWidth(el.getBoundingClientRect().width)
                return true;
            };
            return false
        }

        if (!updateSize()) {
            const id = setTimeout(updateSize, 100);
            return () => clearTimeout(id);
        }

        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const pieceDefs = [
        { piece: "wP", pieceHeight: 1 },
        { piece: "wN", pieceHeight: 1.1 },
        { piece: "wB", pieceHeight: 1.1 },
        { piece: "wR", pieceHeight: 1.1 },
        { piece: "wQ", pieceHeight: 1.3 },
        { piece: "wK", pieceHeight: 1.3 },
        { piece: "bP", pieceHeight: 1 },
        { piece: "bN", pieceHeight: 1.1 },
        { piece: "bB", pieceHeight: 1.1 },
        { piece: "bR", pieceHeight: 1.1 },
        { piece: "bQ", pieceHeight: 1.3 },
        { piece: "bK", pieceHeight: 1.3 },
    ];

    return useMemo(() => {
        const pieces: PieceMap = {};
        const effectiveScale = scaleOverride ?? (squareWidth < 50 ? 0.85 : 1);

        const newSquareWidth = squareWidth * effectiveScale;

        pieceDefs.forEach(({ piece, pieceHeight }) => {
            pieces[piece] = () => {
                if (squareWidth === 0) {
                    return <div style={{ width: 40, height: 40 }} />;
                }

                return (
                    <div
                        style={{
                            width: newSquareWidth,
                            height: newSquareWidth,
                            position: "relative",
                            pointerEvents: "none",
                        }}
                    >
                        <Image
                            alt="chess"
                            src={`/chess/3d-pieces/${piece}.webp`}
                            width={newSquareWidth}
                            height={pieceHeight * squareWidth}
                            style={{
                                position: "absolute",
                                bottom: `${0.1 * squareWidth}px`,
                                objectFit: "contain",
                            }}
                            priority
                        />
                    </div>
                );
            };
        });

        return pieces;
    }, [squareWidth, scaleOverride]);
}