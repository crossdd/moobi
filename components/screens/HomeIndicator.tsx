import React from "react";
import { useSwipeable } from "react-swipeable";
import { usePhone } from "@/context";

const HomeIndicator = () => {
  const { setCurrentScreen } = usePhone();
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      setCurrentScreen("home");
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  return (
    <div
      className="absolute bottom-2 left-1/2 z-50 flex h-5 w-32 -translate-x-1/2 transform items-end justify-end"
      {...swipeHandlers}
    >
      <div className="h-1 w-full rounded-full bg-white bg-opacity-60" />
    </div>
  );
};
export default HomeIndicator;
