"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";


const AutoThemeSwitcher = () => {
    const { setTheme } = useTheme();

    useEffect(() => {
        const hour = new Date().getHours();
        const newTheme = hour >= 6 && hour < 19 ? "light" : "dark";
        setTheme(newTheme);
    }, [setTheme]);

    return null;
};

export default AutoThemeSwitcher;
