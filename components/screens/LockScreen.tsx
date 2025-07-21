"use client"

import type React from "react"
import {useEffect, useState} from "react"

import lockscreen from "@/public/images/lockscreen.jpg"
import {LuCamera, LuFlashlight} from "react-icons/lu"
import {Button} from "@/components/ui/button"
import Image from "next/image";
import {useMedia} from "@/context/MediaContext";
import {BsSnapchat, BsWhatsapp} from "react-icons/bs";
import {motion} from 'framer-motion'

const LockScreen = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isUnlocking, setIsUnlocking] = useState(false)

    const {setCurrentScreen, lastScreen} = useMedia()

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
        })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        })
    }

    const unlockScreen = () => {
        setIsUnlocking(true)
        setTimeout(() => {
            setIsUnlocking(false)
            setCurrentScreen(lastScreen)
        }, 600)
    }

    const sampleNotifications = [
        {
            icon: BsWhatsapp,
            app: 'WhatsApp',
            iconContainerClassName: 'bg-green-500 p-1 rounded-lg',
            message: "You have 3 unread notifications",
            time: 'now'
        },
        {
            icon: BsSnapchat,
            app: 'Snapchat',
            iconContainerClassName: 'bg-yellow-300 p-1 rounded-lg',
            message: "You have a new message",
            time: '6m'
        },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full relative"
        >
            <Image
                src={lockscreen.src}
                alt="profile-picture"
                width={300}
                height={500}
                className="absolute inset-0 w-full h-full object-cover opacity-45 z-0"
                placeholder="blur"
                blurDataURL={lockscreen.blurDataURL}
            />
            {/* Lock Screen Content */}
            <div className="flex flex-col h-full justify-between pt-16 pb-8">
                {/* Time and Date */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center text-white">
                    <div className="text-7xl font-thin mb-2 tracking-tight">{formatTime(currentTime)}</div>
                    <div className="text-lg font-medium">{formatDate(currentTime)}</div>
                </motion.div>

                {/* Notifications Area */}
                <div className="flex-1 flex flex-col justify-center px-2 space-y-3">
                    {sampleNotifications.map(notification => (
                    <div
                        key={notification.app}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center ${notification.iconContainerClassName}`}>
                               <notification.icon />
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-medium text-sm">{notification.app}</div>
                                <div className="text-white/80 text-sm line-clamp-1">
                                    {notification.message}
                                </div>
                            </div>
                            <div className="text-white/60 text-xs">
                                {notification.time}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Face ID / Touch ID Area */}
                <div className="text-center px-6 mb-8">
                    <Button
                        onClick={unlockScreen}
                        disabled={isUnlocking}
                        className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-full px-6 py-3 group"
                    >
                        {isUnlocking ? (
                            <div className="relative w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin p-[3px] spin-custom">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                            </div>
                        ) : (
                            <>
                                <div className="w-6 h-6 border-2 border-white rounded-full mb-1"></div>
                                Face ID
                            </>
                        )}
                    </Button>
                </div>

                {/* Bottom Controls */}
                <div className="flex justify-between items-end px-8">
                    <div className="flex flex-col items-center">
                        <Button
                            size="lg"
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 p-0"
                        >
                            <LuFlashlight className="w-6 h-6 text-white" />
                        </Button>
                    </div>

                    <div className="flex flex-col items-center">
                        <Button
                            size="lg"
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 p-0"
                        >
                            <LuCamera className="w-6 h-6 text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default LockScreen