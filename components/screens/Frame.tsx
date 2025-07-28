import StatusBar from "@/components/screens/StatusBar";
import {LuPower, LuPowerOff} from "react-icons/lu";
import {TbSmartHome, TbTriangle} from "react-icons/tb";
import React, {useState} from "react";
import {useMedia} from "@/context/MediaContext";
import {useBrowser} from "@/context/BrowserContext";
import {useMusic} from "@/context/MusicContext";
import {MusicPlayerScreen} from "@/types";

const Frame = ({children}: {children: React.ReactNode}) => {
    const [isOn, setIsOn] = useState(true)
    const {currentScreen, setCurrentScreen, lastScreen, setLastScreen} = useMedia()
    const {currentBrowserScreen, setCurrentBrowserScreen} = useBrowser()
    const {currentPlayerScreen, setCurrentPlayerScreen} = useMusic()

    let pressTimer: NodeJS.Timeout;

    const handlePressStart = () => {
        pressTimer = setTimeout(() => {
           togglePhoneState()
        }, 1000);
    };


    const handlePressEnd = () => {
        clearTimeout(pressTimer);
    };

    const handleClick = () => {
        clearTimeout(pressTimer)

        if(currentScreen === 'shutdown' || currentScreen === 'boot') return

        toggleScreenOnOff()
    };
    const toggleScreenOnOff = () => {
        if(isOn) {
            if(currentScreen !== 'lock') {
                setLastScreen(currentScreen);
            }

            setIsOn(false)
        } else {
            setIsOn(true)
            setCurrentScreen("lock")
        }
    }

    const togglePhoneState = () => {
        if(currentScreen !== 'shutdown') {
            setLastScreen("home")
            setCurrentScreen("shutdown")
        } else {
            setCurrentScreen("boot")
        }
    }

    const isCurrentlyOn = currentScreen !== 'shutdown' && isOn

    const backAction = () => {
        switch (currentScreen) {
            case "home":
                break;
            case "chrome":
                if(currentBrowserScreen === 'browser-frame') {
                    setCurrentBrowserScreen("browser-search-results")
                } else if(currentBrowserScreen !== 'browser-home') {
                    setCurrentBrowserScreen("browser-home")
                } else {
                    setCurrentScreen("home")
                }
                break;
            case 'project-detail':
                setCurrentScreen("projects")
                break;
            case 'video-player':
                setCurrentScreen('gallery')
                break;
            case 'image-view':
                setCurrentScreen('gallery')
                break;
            case 'itunes':
                if(currentPlayerScreen === 'nowPlaying') {
                    setCurrentPlayerScreen(lastScreen as MusicPlayerScreen)
                } else {
                    setCurrentScreen("home")
                }
                break;
            default:
                setCurrentScreen("home")
                break
        }
    }

    return (
        <div className="relative h-full flex-center gap-4">
            {/* iPhone 16 Body */}
            <div className="relative bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl w-80 h-[600px]">
                {/* Power Button */}
                <div className="absolute -right-1 top-24 w-1 h-16 bg-gray-700 rounded-l-sm"></div>

                {/* Volume Buttons */}
                <div className="absolute -left-1 top-20 w-1 h-8 bg-gray-700 rounded-r-sm"></div>
                <div className="absolute -left-1 top-32 w-1 h-12 bg-gray-700 rounded-r-sm"></div>

                {/* Action Button (new in iPhone 15/16) */}
                <div className="absolute -left-1 top-48 w-1 h-6 bg-orange-500 rounded-r-sm"></div>

                {/* Screen */}
                <div
                    className={`relative w-full h-full rounded-[2.5rem] overflow-hidden transition-all duration-300 bg-black`}
                >
                    {/* Status Bar */}
                    {isOn && (
                        <div className="absolute -top-6 w-full z-50">
                            <StatusBar />
                        </div>
                    )}

                    {/* Dynamic Island */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-full z-50 flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                        </div>
                    </div>

                    {/* Screen Content */}
                    {isOn && (
                        <div className="w-full h-full relative overflow-hidden">{children}</div>
                    )}

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white bg-opacity-60 rounded-full"></div>
                </div>
            </div>

            {/* Power Button Toggle */}
            <div className="flex flex-col gap-5 bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900 rounded-md">
                <button
                    onMouseDown={handlePressStart}
                    onTouchStart={handlePressStart}
                    onMouseUp={handlePressEnd}
                    onMouseLeave={handlePressEnd}
                    onTouchEnd={handlePressEnd}
                    onClick={handleClick}
                    // onClick={togglePhoneState}
                    className="p-2 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                >
                    {isCurrentlyOn ? <LuPowerOff size={19} /> : <LuPower size={19} />}
                </button>

                <button
                    onClick={() => setCurrentScreen("home")}
                    disabled={!isOn || currentScreen === 'home'}
                    className="p-2 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                >
                    <TbSmartHome size={19} />
                </button>

                <button
                    disabled={!isOn || currentScreen === 'home' || currentScreen === 'lock' || currentScreen === 'shutdown' || currentScreen === 'boot'}
                    onClick={backAction}
                    className="p-2 text-white disabled:text-gray-400 rounded-lg text-sm hover:bg-gray-700 disabled:hover:bg-transparent -rotate-90 transition-colors"
                >
                    <TbTriangle size={19} />
                </button>
            </div>
        </div>
    )
}
export default Frame
