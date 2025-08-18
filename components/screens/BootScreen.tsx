"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePhone } from "@/context/PhoneContext";

const BootScreen = () => {
  const { currentScreen, setCurrentScreen } = usePhone();
  const [bootStage, setBootStage] = useState<
    "initial" | "logo" | "progress" | "complete"
  >("initial");
  const [isShutdown, setIsShutDown] = useState(false);

  useEffect(() => {
    const bootSequence = async () => {
      setIsShutDown(false);

      const isBootScreen = currentScreen === "screen-boot";

      await new Promise((resolve) =>
        setTimeout(resolve, isBootScreen ? 1000 : 300),
      );

      setBootStage("logo");
      await new Promise((resolve) =>
        setTimeout(resolve, isBootScreen ? 2000 : 1000),
      );

      setBootStage("progress");
      await new Promise((resolve) =>
        setTimeout(resolve, isBootScreen ? 4000 : 3000),
      );

      setBootStage("complete");

      if (currentScreen === "screen-boot") {
        setCurrentScreen("screen-lock");
      } else {
        setIsShutDown(true);
      }
    };

    bootSequence();
  }, [currentScreen, setCurrentScreen]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[50px] bg-black">
      <AnimatePresence mode="wait">
        {bootStage === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />
        )}

        {(bootStage === "logo" ||
          bootStage === "progress" ||
          (bootStage === "complete" && !isShutdown)) && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
          >
            {/* Apple Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.5,
              }}
              className="relative mb-8"
            >
              {/* Apple Logo SVG */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  fill="currentColor"
                />
              </svg>

              {/* Subtle glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 scale-150 rounded-full bg-white blur-xl"
              />
            </motion.div>
          </motion.div>
        )}

        {isShutdown && <div className="absolute inset-0 bg-black" />}
      </AnimatePresence>
    </div>
  );
};

export default BootScreen;
