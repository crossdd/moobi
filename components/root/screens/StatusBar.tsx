import { useEffect, useState } from 'react'

const StatusBar = () => {
    const [currentTime, setCurrentTime] = useState(new Date())

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex justify-between items-center px-4 pt-4 pb-4 text-white text-sm font-medium">
            <div className="flex items-center">
                <span>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index + 1} className="w-1 h-1 bg-white rounded-full" />
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