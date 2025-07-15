"use client"

import type React from "react"
import {useState} from "react"
import {History} from "@/types";
import BrowserHistory from "@/components/screens/BrowserHistory";
import BrowserHome from "@/components/screens/BrowserHome";

type BrowserScreen = "home" | "history"

const historyData: History[] = [
    {
        id: 1,
        title: "GitHub - The world's leading software development platform",
        url: "https://github.com",
    },
    {
        id: 2,
        title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
        url: "https://stackoverflow.com",
    },
    {
        id: 3,
        title: "Vercel: Build and deploy the best web experiences with the Frontend Cloud",
        url: "https://vercel.com",
    },
    {
        id: 4,
        title: "React – A JavaScript library for building user interfaces",
        url: "https://react.dev",
    },
    {
        id: 5,
        title: "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML",
        url: "https://tailwindcss.com",
    },
    {
        id: 6,
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
    },
]

const Browser = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [history, setHistory] = useState<History[]>(historyData)

    const [screen, setScreen] = useState<BrowserScreen>("home")

    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (searchTerm?: string) => {
        const updatedSearchQuery = searchTerm ? searchTerm : searchQuery

        if (!updatedSearchQuery.trim()) return;

        const isLikelyURL = updatedSearchQuery.startsWith("http://") || updatedSearchQuery.startsWith("https://");

        const targetURL = isLikelyURL
            ? updatedSearchQuery
            : `https://www.google.com/search?q=${encodeURIComponent(updatedSearchQuery)}`;

        let searchTitle = updatedSearchQuery;

        if (isLikelyURL) {
            try {
                const url = new URL(updatedSearchQuery);
                const hostname = url.hostname.replace("www.", "");
                const pathname = url.pathname !== "/" ? url.pathname.split("/")[1] : "";

                // If there's a path, use it; otherwise, use the domain
                searchTitle = pathname
                    ? decodeURIComponent(pathname.charAt(0).toUpperCase() + " " + pathname.slice(1))
                    : hostname
                        .split(".")[0]
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase());
            } catch {
                // fallback to original if URL is invalid
                searchTitle = updatedSearchQuery;
            }
        } else {
            searchTitle = updatedSearchQuery;
        }

        setHistory((prev) => [
            {
                id: prev.length + 1,
                url: targetURL,
                title: searchTitle
            },
            ...prev
        ])

        setIsLoading(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        setProgress(0);

                        window.open(targetURL, "_blank");
                    }, 100);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 100);
    };


    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="relative w-full h-full overflow-hidden p-4 mt-10">
            {screen === 'home' && (
                <BrowserHome
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    onKeyPress={handleKeyPress}
                    isLoading={isLoading} 
                    progress={progress} 
                    setScreen={setScreen}
                    handleSearch={handleSearch}
                />
            )}

            {screen === 'history' && (
                <BrowserHistory
                    setScreen={setScreen}
                    history={history}
                    handleSearch={handleSearch}
                    setHistory={setHistory}
                />
            )}
        </div>
    )
}

export default Browser

