"use client";

import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "motion/react";
import { ReactNode, useState } from "react";


export const FloatingNav = ({
    children,
    className,
}: {
    children: ReactNode;
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
                    y: -450,
                }}
                animate={{
                    y: visible ? 0 : -450,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.7,
                }}
                className={cn("fixed", className)}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};
