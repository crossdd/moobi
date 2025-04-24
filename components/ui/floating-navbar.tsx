"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { socialMediaPlatforms } from "@/constants";
import Link from "next/link";


export const FloatingNav = ({
    className,
}: {
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    x: -100,
                }}
                animate={{
                    x: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.4,
                }}
                className={cn(
                    "fixed right-4 top-1/2 -translate-y-1/2 z-[5000] flex flex-col gap-3",
                    className
                )}
            >
                {socialMediaPlatforms.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        title={item.title}
                        target="_blank"
                        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-300 w-10 h-10 p-1 hover:scale-150 transition-all ease-in-out duration-300"
                    >
                        <div
                            className="flex items-center justify-center w-6 h-6"
                        >
                            <item.icon fill="#000319" className="h-full w-full" />
                        </div>
                    </Link>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
