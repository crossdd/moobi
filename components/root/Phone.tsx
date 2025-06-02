"use client"

import React, { useState } from "react"
import { LuPower, LuPowerOff } from 'react-icons/lu'
import { TbTriangle } from "react-icons/tb"
import dynamic from "next/dynamic"

interface iPhone16ScreenProps {
    showNotch?: boolean
    backgroundColor?: string
}

const HomeScreen = dynamic(() => import('./screens/HomeScreen'), {
    loading: () => <p>Loading...</p>,
})
const PhoneDialer = dynamic(() => import('./screens/PhoneDialer'), {
    loading: () => <p>Loading...</p>,
})
const MailCompose = dynamic(() => import('./screens/MailCompose'), {
    loading: () => <p>Loading...</p>,
})
const Gallery = dynamic(() => import('./screens/Gallery'), {
    loading: () => <p>Loading...</p>,
})
const VideoPlayer = dynamic(() => import('./screens/VideoPlayer'), {
    loading: () => <p>Loading...</p>,
})
const ImageView = dynamic(() => import('./screens/ImageView'), {
    loading: () => <p>Loading...</p>,
})

export default function Phone({ showNotch = true, backgroundColor = "#000" }: iPhone16ScreenProps) {
    const [isOn, setIsOn] = useState(false)
    const [currentScreen, setCurrentScreen] = useState<ScreenDisplay>('home')

    const ScreenDisplay = () => {
        return currentScreen === 'gallery'
            ? <Gallery setCurrentScreen={setCurrentScreen} />
            : currentScreen === 'video-player'
                ? <VideoPlayer />
                : currentScreen === 'image-view'
                    ? <ImageView />
                    : currentScreen === 'phone'
                        ? <PhoneDialer />
                        : currentScreen === 'mail'
                            ? <MailCompose setCurrentScreen={setCurrentScreen} />
                            : <HomeScreen setCurrentScreen={setCurrentScreen} />
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative h-full">
                {/* iPhone 16 Body */}
                <div
                    className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl h-full"
                    style={{
                        width: "320px",
                        height: "650px",
                    }}
                >
                    {/* Power Button */}
                    <div className="absolute -right-1 top-24 w-1 h-16 bg-gray-700 rounded-l-sm"></div>

                    {/* Volume Buttons */}
                    <div className="absolute -left-1 top-20 w-1 h-8 bg-gray-700 rounded-r-sm"></div>
                    <div className="absolute -left-1 top-32 w-1 h-12 bg-gray-700 rounded-r-sm"></div>

                    {/* Action Button (new in iPhone 15/16) */}
                    <div className="absolute -left-1 top-48 w-1 h-6 bg-orange-500 rounded-r-sm"></div>

                    {/* Screen */}
                    <div
                        className={`relative w-full h-full rounded-[2.5rem] overflow-hidden transition-all duration-300 ${isOn ? "bg-black" : "bg-gray-900"
                            }`}
                        style={{ backgroundColor: isOn ? backgroundColor : "#1f2937" }}
                    >
                        {/* Dynamic Island */}
                        {showNotch && (
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-full z-50 flex items-center justify-center">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                                    <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                                </div>
                            </div>
                        )}

                        {/* Screen Content */}
                        {isOn && <div className="w-full h-full relative">{<ScreenDisplay />}</div>}

                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white bg-opacity-60 rounded-full"></div>
                    </div>
                </div>

                {/* Power Button Toggle */}
                <div className="flex flex-col gap-5 bg-gray-800 absolute -right-8 top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={() => setIsOn(!isOn)}
                        className="p-2 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                    >

                        {isOn ? <LuPowerOff size={19} /> : <LuPower size={19} />}
                    </button>

                    <button
                        disabled={!isOn}
                        onClick={() => {
                            if (currentScreen === 'home') {
                                return;
                            } else if (currentScreen === 'video-player' || currentScreen === 'image-view') {
                                setCurrentScreen('gallery')
                            } else {
                                setCurrentScreen('home')
                            }
                        }}
                        className="p-2 text-white disabled:text-gray-400 rounded-lg text-sm hover:bg-gray-700 disabled:hover:bg-transparent -rotate-90 transition-colors"
                    >
                        <TbTriangle size={19} />
                    </button>
                </div>
            </div>
        </div>
    )
}

