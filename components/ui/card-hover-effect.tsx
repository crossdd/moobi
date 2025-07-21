'use client'

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { ReactNode, useState } from "react";

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        contents: string[];
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-primary/80 block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    {item.contents.length > 0 && (
                        <Card>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription contents={item.contents} />
                        </Card>
                    )}
                </div>
            ))}
        </div>
    );
};

const Card = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <h4 className={cn("text-primary font-bold tracking-wide", className)}>
            {children}
        </h4>
    );
};
const CardDescription = ({
    className,
    contents,
}: {
    className?: string;
    contents: string[];
}) => {
    return (
        <ul className={cn("flex flex-col gap-4 list-disc list-outside my-3", className)}>
            {contents.map((content, index) => (
                <li key={index} className="text-gray-300 text-lg lg:text-base font-light">
                    {content}
                </li>
            ))}
        </ul>
    );
};
