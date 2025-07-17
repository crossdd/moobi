"use client"

import type React from "react"
import {useState} from "react"
import {History} from "@/types";
import BrowserHistory from "@/components/screens/BrowserHistory";
import BrowserHome from "@/components/screens/BrowserHome";
import BrowserBookmark from "@/components/screens/BrowserBookmark";
import {useMedia} from "@/context/MediaContext";
import ProjectInfo from "@/components/screens/browser-bookmark/ProjectInfo";
import {LiaHomeSolid} from "react-icons/lia";
import {CgLink, CgMoreVertical} from "react-icons/cg";
import {BiPlus} from "react-icons/bi";

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
    const {currentBrowserScreen, setCurrentBrowserScreen, projectId, setProjectId} = useMedia()

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
        <div className="relative w-full h-full overflow-hidden mt-10">
            {currentBrowserScreen === 'home' && (
                <BrowserHome
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    onKeyPress={handleKeyPress}
                    isLoading={isLoading} 
                    progress={progress} 
                    setScreen={setCurrentBrowserScreen}
                />
            )}

            {currentBrowserScreen === 'history' && (
                <BrowserHistory
                    setScreen={setCurrentBrowserScreen}
                    history={history}
                    handleSearch={handleSearch}
                    setHistory={setHistory}
                />
            )}

            {(currentBrowserScreen === 'bookmark' || currentBrowserScreen === 'bookmark-pId') && (
                <main className="relative w-full h-full overflow-x-hidden overflow-y-scroll no-visible-scrollbar">
                    {/* Address Bar */}
                    <div className="sticky top-0 flex items-center justify-between gap-3 py-2 px-2 w-full text-white bg-black z-50">
                        <div className="flex items-center gap-2">
                            <LiaHomeSolid size={16}/>
                            <div className="bg-gray-600 rounded-full flex items-center gap-1 py-1 px-1">
                                <CgLink size={16} />
                                <input
                                    disabled
                                    placeholder="epiphanusonyeso.vercel.app"
                                    className="border-0 text-xs bg-transparent focus-visible:ring-0 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <BiPlus fill="white" size={16} />
                            <div className="w-6 h-6 border-2 border-primary p-1 text-white flex-center rounded-md text-xs font-light">
                                1
                            </div>
                            <CgMoreVertical size={16} />
                        </div>
                    </div>

                    {currentBrowserScreen === 'bookmark' ? (
                        <BrowserBookmark setScreen={setCurrentBrowserScreen} setProjectId={setProjectId} />
                    ) : (
                        <ProjectInfo projectId={projectId} />
                    )}
                </main>
            )}
        </div>
    )
}

export default Browser

