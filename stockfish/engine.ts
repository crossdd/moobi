let stockfishWorker: Worker | null = null;

export type EngineMessage = {
  uciMessage: string;
  /** found best move for current position in format `e2e4`*/
  bestMove?: string;
  /** found best move for opponent in format `e7e5` */
  ponder?: string;
  positionEvaluation?: string;
  /** count of moves until mate */
  possibleMate?: string;
  /** the best line found */
  pv?: string;
  /** number of halfmoves the engine looks ahead */
  depth?: number;
};

export default class Engine {
  stockfish: Worker | null;
  onMessage: (callback: (messageData: EngineMessage) => void) => void;
  isReady: boolean;

  constructor() {
    if (typeof window !== "undefined") {
      if (!stockfishWorker) {
        stockfishWorker = new Worker("/chess/stockfish/stockfish.wasm.js");
      }
      this.stockfish = stockfishWorker;
    } else {
      this.stockfish = null;
    }
    this.isReady = false;
    this.onMessage = (callback) => {
      if (!this.stockfish) return;

      this.stockfish.addEventListener("message", (e) => {
        callback(this.transformSFMessageData(e));
      });
    };

    if (this.stockfish) {
      this.init();
    }
  }

  private transformSFMessageData(e: MessageEvent<string>) {
    const uciMessage = e?.data ?? e;

    return {
      uciMessage,
      bestMove: uciMessage.match(/bestmove\s+(\S+)/)?.[1],
      ponder: uciMessage.match(/ponder\s+(\S+)/)?.[1],
      positionEvaluation: uciMessage.match(/cp\s+(\S+)/)?.[1],
      possibleMate: uciMessage.match(/mate\s+(\S+)/)?.[1],
      pv: uciMessage.match(/ pv\s+(.*)/)?.[1],
      depth: Number(uciMessage.match(/ depth\s+(\S+)/)?.[1] ?? 0),
    };
  }

  init() {
    if (!this.stockfish) return;

    this.stockfish.postMessage("uci");
    this.stockfish.postMessage("isready");
    this.onMessage(({ uciMessage }) => {
      if (uciMessage === "readyok") {
        this.isReady = true;
      }
    });
  }

  onReady(callback: () => void) {
    this.onMessage(({ uciMessage }) => {
      if (uciMessage === "readyok") {
        callback();
      }
    });
  }

  evaluatePosition(fen: string, depth = 12) {
    if (!this.stockfish) return;
    if (depth > 24) depth = 24;

    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }

  stop() {
    if (!this.stockfish) return;
    this.stockfish.postMessage("stop"); // Run when searching takes too long time and stockfish will return you the best move of the depth it has reached
  }

  terminate() {
    if (!this.stockfish) return;

    this.isReady = false;
    this.stockfish.postMessage("quit"); // Run this before chessboard unmounting.
  }
}
