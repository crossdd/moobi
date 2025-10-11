import {
  LuHouse,
  LuPower,
  LuPowerOff,
  LuSettings,
  LuTriangle,
} from "react-icons/lu";
import { useBrowserStore, useMusicStore, usePhoneStore } from "@/stores";
import { MusicPlayerScreen } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ActionButtons = ({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    currentScreen,
    setLastScreen,
    showControlCenter,
    setCurrentScreen,
    lastScreen,
    toggleControlCenter,
    showAppSwitcher,
    setShowAppSwitcher,
  } = usePhoneStore();
  const { currentBrowserScreen, changeBrowserScreen } = useBrowserStore();
  const { currentPlayerScreen, setCurrentPlayerScreen } = useMusicStore();

  let pressTimer: NodeJS.Timeout;

  const handlePressStart = () => {
    pressTimer = setTimeout(() => {
      togglePhoneState();
    }, 1000);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer);
  };

  const handleClick = () => {
    clearTimeout(pressTimer);

    if (currentScreen === "screen-shutdown" || currentScreen === "screen-boot")
      return;

    toggleScreenOnOff();
  };

  const toggleScreenOnOff = () => {
    if (isOn) {
      if (currentScreen !== "screen-lock") {
        setLastScreen(currentScreen);
      }

      if (showControlCenter) {
        toggleControlCenter();
      }

      setIsOn(false);
    } else {
      setIsOn(true);
      setCurrentScreen("screen-lock");
    }
  };

  const togglePhoneState = () => {
    if (currentScreen !== "screen-shutdown") {
      setLastScreen("home");
      setCurrentScreen("screen-shutdown");
    } else {
      setCurrentScreen("screen-boot");
    }
  };

  const backAction = () => {
    switch (currentScreen) {
      case "home":
        break;
      case "chrome-browser":
        if (currentBrowserScreen === "browser-frame") {
          changeBrowserScreen("browser-search-results");
        } else if (currentBrowserScreen !== "browser-home") {
          changeBrowserScreen("browser-home");
        } else {
          setCurrentScreen("home");
        }
        break;
      case "music-player":
        if (currentPlayerScreen === "nowPlaying") {
          setCurrentPlayerScreen(lastScreen as MusicPlayerScreen);
        } else {
          setCurrentScreen("home");
        }
        break;
      default:
        setCurrentScreen("home");
        break;
    }
  };

  const isCurrentlyOn = currentScreen !== "screen-shutdown" && isOn;

  const buttonStyle =
    "rounded-lg p-2 text-sm text-white transition-colors hover:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-transparent";

  return (
    <div className="flex flex-col gap-5 rounded-md bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900">
      <button
        onMouseDown={handlePressStart}
        onTouchStart={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchEnd={handlePressEnd}
        onClick={handleClick}
        className={buttonStyle}
      >
        {isCurrentlyOn ? <LuPowerOff size={19} /> : <LuPower size={19} />}
      </button>

      <button
        onClick={() => setCurrentScreen("home")}
        disabled={
          !isOn || currentScreen === "home" || currentScreen === "screen-lock"
        }
        className={buttonStyle}
      >
        <LuHouse size={19} />
      </button>

      <button
        title="Go Back"
        disabled={
          !isOn ||
          currentScreen === "home" ||
          currentScreen === "screen-lock" ||
          currentScreen === "screen-shutdown" ||
          currentScreen === "screen-boot"
        }
        onClick={backAction}
        className={cn("-rotate-90", buttonStyle)}
      >
        <LuTriangle size={19} />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className={buttonStyle}>
          <LuSettings size={19} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => setShowAppSwitcher(!showAppSwitcher)}
          >
            {showAppSwitcher ? "Close" : "Open"} App Switcher
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleControlCenter}>
            {showControlCenter ? "Close" : "Open"} Control Center
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default ActionButtons;
