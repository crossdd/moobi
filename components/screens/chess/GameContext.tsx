"use client"

import { createContext, ReactNode, useContext } from "react";
import { useChessGame } from "@/hooks/useChessGame";

const ChessGameContext = createContext<ReturnType<typeof useChessGame> | null>(null);

export const ChessGameProvider = ({ children }: { children: ReactNode }) => {
    const game = useChessGame();

    return <ChessGameContext.Provider value={game}>{children}</ChessGameContext.Provider>
}

export const useGame = () => {
    const context = useContext(ChessGameContext);
    if (!context) {
        throw new Error("useGame must be used within a ChessGameProvider");
    }
    return context;
}