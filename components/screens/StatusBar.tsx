import { usePhone } from "@/context/PhoneContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { useSwipeable } from "react-swipeable";

const StatusBar = () => {
  const { currentScreen, setShowControlCenter, showControlCenter } = usePhone();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => {
      setShowControlCenter(true);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  if (currentScreen === "boot" || currentScreen === "shutdown") return null;

  const customClassName: { [key: string]: string } = {
    guess: "text-black",
    itunes: "bg-black",
  };

  return (
    <div
      className={cn(
        "mx-[1.5px] mt-6 flex h-6 w-[302px] items-center justify-between rounded-t-full bg-transparent px-1 pt-3 text-sm font-medium text-white",
        customClassName[currentScreen],
        showControlCenter && "bg-black",
      )}
      {...swipeHandlers}
    >
      <div
        className={cn(
          "pl-8 font-medium",
          currentScreen === "lock" && "opacity-0",
        )}
      >
        {currentTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      <div className="mr-2 flex items-center space-x-1 pr-0.5">
        <div className="flex space-x-1">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index + 1}
              className={cn(
                "h-1 w-1 rounded-full bg-white",
                currentScreen === "guess" ? "bg-black" : "bg-white",
              )}
            />
          ))}
        </div>
        <span className="text-xs">📶</span>
        <div className="flex-center relative h-2 w-6 border rounded-r-[3px] border-neutral-800">
          <div className="absolute left-0 top-0 h-1.5 w-4 bg-gray-50"></div>
          <div className="z-10 bg-y">
            <BsLightningChargeFill className="text-green-400 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
