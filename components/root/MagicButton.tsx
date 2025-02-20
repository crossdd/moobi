"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "../ui/button";

const MagicButton = ({
  title,
  icon,
  position,
  animate = false,
  otherClasses,
  handleClick,
}: {
  title: string;
  icon: ReactNode;
  position: "left" | "right";
  animate?: boolean;
  otherClasses?: string;
  handleClick?: () => void;
}) => {
  return (
    <Button
      className={cn(
        "relative h-12 w-full rounded-lg p-[1px] mt-10 inline-flex overflow-hidden",
        otherClasses
      )}
      onClick={handleClick}
    >
      <span
        className={cn("absolute animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] inset-[-1000%]", {
          hidden: !animate,
        })}
      />

      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg px-7 text-sm font-medium backdrop-blur-3xl gap-2 text-white bg-slate-950 dark:bg-purple dark:text-black`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </Button>
  );
};

export default MagicButton;
