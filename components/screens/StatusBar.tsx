import { usePhone } from "@/context/PhoneContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BsLightningChargeFill, BsWhatsapp } from "react-icons/bs";
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
      if (currentScreen === "screen-lock") return;
      setShowControlCenter(true);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  if (currentScreen === "screen-boot" || currentScreen === "screen-shutdown")
    return null;

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
          "pl-5 font-medium flex items-center gap-2",
          currentScreen === "screen-lock" && "opacity-0",
        )}
      >
        {currentTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })}

        <BsWhatsapp className="w-3 h-3 fill-green-500" />
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
        <div className="flex-center relative h-2 w-6 rounded-r-[3px] border border-neutral-800">
          <div className="absolute left-0 top-0 h-1.5 w-4 bg-gray-50"></div>
          <div className="bg-y z-10">
            <BsLightningChargeFill className="h-4 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
