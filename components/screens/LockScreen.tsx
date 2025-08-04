"use client";

import type React from "react";
import { useEffect, useState } from "react";

import lockscreen from "@/public/images/lockscreen.jpg";
import { LuCamera, LuFlashlight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePhone } from "@/context/PhoneContext";
import { BsSnapchat, BsWhatsapp } from "react-icons/bs";
import { motion } from "framer-motion";

const LockScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);

  const { setCurrentScreen, lastScreen } = usePhone();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const unlockScreen = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocking(false);
      setCurrentScreen(lastScreen);
    }, 600);
  };

  const sampleNotifications = [
    {
      icon: BsWhatsapp,
      app: "WhatsApp",
      iconContainerClassName: "bg-green-500 p-1 rounded-lg",
      message: "You have 3 unread notifications",
      time: "now",
    },
    {
      icon: BsSnapchat,
      app: "Snapchat",
      iconContainerClassName: "bg-yellow-300 p-1 rounded-lg",
      message: "You have a new message",
      time: "6m",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative h-full w-full"
    >
      <Image
        src={lockscreen.src}
        alt="profile-picture"
        width={300}
        height={500}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-45"
        placeholder="blur"
        blurDataURL={lockscreen.blurDataURL}
      />
      {/* Lock Screen Content */}
      <div className="flex h-full flex-col justify-between pb-8 pt-16">
        {/* Time and Date */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-white"
        >
          <div className="mb-2 text-7xl font-thin tracking-tight">
            {formatTime(currentTime)}
          </div>
          <div className="text-lg font-medium">{formatDate(currentTime)}</div>
        </motion.div>

        {/* Notifications Area */}
        <div className="flex flex-1 flex-col justify-center space-y-3 px-2">
          {sampleNotifications.map((notification) => (
            <div
              key={notification.app}
              className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center ${notification.iconContainerClassName}`}
                >
                  <notification.icon />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    {notification.app}
                  </div>
                  <div className="line-clamp-1 text-sm text-white/80">
                    {notification.message}
                  </div>
                </div>
                <div className="text-xs text-white/60">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Face ID / Touch ID Area */}
        <div className="mb-8 px-6 text-center">
          <Button
            onClick={unlockScreen}
            disabled={isUnlocking}
            className="group rounded-full border border-white/30 bg-white/20 px-6 py-3 text-white backdrop-blur-md hover:bg-white/30"
          >
            {isUnlocking ? (
              <div className="spin-custom relative h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent p-[3px]">
                <div className="to-purple-500 absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500" />
              </div>
            ) : (
              <>
                <div className="mb-1 h-6 w-6 rounded-full border-2 border-white"></div>
                Face ID
              </>
            )}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-end justify-between px-8">
          <div className="flex flex-col items-center">
            <Button
              size="lg"
              className="h-12 w-12 rounded-full border border-white/30 bg-white/20 p-0 backdrop-blur-md hover:bg-white/30"
            >
              <LuFlashlight className="h-6 w-6 text-white" />
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <Button
              size="lg"
              className="h-12 w-12 rounded-full border border-white/30 bg-white/20 p-0 backdrop-blur-md hover:bg-white/30"
            >
              <LuCamera className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LockScreen;
