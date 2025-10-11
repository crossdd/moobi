import { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { usePhoneStore } from "@/stores/usePhoneStore";
import { cn } from "@/lib/utils";

const HomeIndicator = () => {
  const { setCurrentScreen, showAppSwitcher, setShowAppSwitcher } =
    usePhoneStore();
  const [swipeProgress, setSwipeProgress] = useState(0);

  const swipeStartTime = useRef<number | null>(null);

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === "Up" && swipeStartTime.current === null) {
        swipeStartTime.current = Date.now();

        const progress = Math.abs(Math.min(eventData.deltaY / 25, 1));
        console.log({ progress });
        setSwipeProgress(progress);
      }
    },

    onSwiped: (eventData) => {
      if (eventData.dir === "Up") {
        const duration = Date.now() - (swipeStartTime.current ?? Date.now());
        swipeStartTime.current = null;

        if (duration > 500) {
          setShowAppSwitcher(true);
        } else {
          if (showAppSwitcher) {
            setShowAppSwitcher(false);
          }

          setCurrentScreen("home");
        }
      }
    },

    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  return (
    <div
      className="flex-center absolute bottom-0.5 left-1/2 z-50 h-5 w-32 -translate-x-1/2 transform flex-col -space-y-1"
      {...swipeHandlers}
    >
      <div
        className={cn(
          "w-full transform rounded-t-full bg-black opacity-0 transition-opacity duration-200 ease-in dark:bg-white",
          swipeProgress > 0 && showAppSwitcher && "opacity-100",
        )}
        style={{ height: `${swipeProgress * 100}%` }}
      />
      <div className="h-1 w-full rounded-full bg-black bg-opacity-60 dark:bg-white" />
    </div>
  );
};
export default HomeIndicator;
