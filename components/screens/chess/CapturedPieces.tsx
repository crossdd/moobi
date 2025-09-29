import { cn } from "@/lib/utils";
import { useThreeDPieces } from "./ThreeDPieces";

const CapturedPieces = ({ color, pieces }: { color: "w" | "b"; pieces: string[] }) => {
    const threeDPieces = useThreeDPieces(0.65);

    return (
        <div className={cn("flex items-center justify-start flex-wrap h-6 -space-x-3", color === "b" && "justify-end")}>
            {pieces.map((p, idx) => {
                const PieceIcon = threeDPieces[color + p.toUpperCase()];
                return <PieceIcon key={idx} />;
            })}
        </div>
    )
}

export default CapturedPieces