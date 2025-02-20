"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AutoThemeSwitcher = () => {
    const { setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);

        const hour = new Date().getHours();
        const newTheme = hour >= 6 && hour < 19 ? "light" : "dark";
        setTheme(newTheme);
    }, [setTheme]);

    if (!mounted) return null

    return null;
};

export default AutoThemeSwitcher;
