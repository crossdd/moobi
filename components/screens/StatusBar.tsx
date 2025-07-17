import {useEffect, useState} from 'react'
import {useMedia} from "@/context/MediaContext";
import {cn} from "@/lib/utils";

const StatusBar = () => {
    const {currentScreen} = useMedia()
    const [currentTime, setCurrentTime] = useState(new Date())


    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])


    return (
        <div className={cn("flex justify-between items-center px-1 pt-2.5 mt-2.5 mx-px text-sm font-medium w-[302px] rounded-t-full bg-transparent",
            currentScreen === 'guess' ? "text-black bg-white" : 'text-white'
        )}>
            <div className={cn("pl-5 font-medium", currentScreen === 'lock' && "opacity-0")}>
                {currentTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false })}
            </div>
           <div className="flex items-center space-x-1 mr-2">
                <div className="flex space-x-1">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index + 1} className={cn("w-1 h-1 bg-white rounded-full", currentScreen === 'guess' ? "bg-black" : 'bg-white')}/>
                    ))}
                </div>
                <span className="text-xs">📶</span>
                <div className="w-6 h-2 border border-white rounded-sm relative">
                    <div className="w-4 h-2 bg-green-400 rounded-sm absolute top-0 left-0"></div>
                </div>
            </div>
        </div>
    )
}

export default StatusBar