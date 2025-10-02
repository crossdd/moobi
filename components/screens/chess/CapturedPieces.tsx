import { cn } from "@/lib/utils";
import { useThreeDPieces } from "./ThreeDPieces";
import { useGame } from "./GameContext";

const CapturedPieces = ({ color }: { color: "white" | "black" }) => {
    const threeDPieces = useThreeDPieces(0.65);

    const { capturedBlack, capturedWhite } = useGame()

    const capturedPieces = color === 'white' ? capturedWhite : capturedBlack

    return (
        <div className={cn("flex items-center justify-start flex-wrap h-6 -space-x-3", color === "black" && "justify-end")}>
            {capturedPieces.map((p, idx) => {
                const PieceIcon = threeDPieces[color[0] + p.toUpperCase()];
                return <PieceIcon key={idx} />;
            })}
        </div>
    )
}

export default CapturedPieces