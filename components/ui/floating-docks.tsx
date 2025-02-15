"use client";

import {
    AnimatePresence,
    motion
} from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";

export const FloatingDock = ({
    items,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} />
            <FloatingDockMobile items={items} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="fixed right-0 top-3/4 z-50 block -translate-y-3/4 md:hidden"
        >
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    key={item.title}
                                    target="_blank"
                                    title={item.title}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 dark:bg-neutral-800"
                                >
                                    <div className="h-4 w-4">{item.icon}</div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <Button
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-800"
            >
                <Menu className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
            </Button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
}) => {
    return (
        <div
            className="mx-auto hidden items-end gap-4 rounded-2xl pb-3 md:flex flex-col fixed right-2 z-50 top-1/2 -translate-y-1/2"
        >
            {items.map((item) => (
                <Link
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    className="relative flex aspect-square items-center justify-center rounded-full bg-gray-300 w-10 h-10 p-1 hover:scale-150 transition-all ease-in-out duration-300">
                    <div
                        className="flex items-center justify-center w-6 h-6"
                    >
                        {item.icon}
                    </div>
                </Link>
            ))}
        </div>
    );
};
