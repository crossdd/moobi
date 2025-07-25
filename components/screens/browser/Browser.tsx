"use client"

import React, {Dispatch, FormEvent, ReactNode, SetStateAction, useState} from "react"
import BrowserHistory from "@/components/screens/browser/BrowserHistory";
import BrowserHome from "@/components/screens/browser/BrowserHome";
import BrowserBookmark from "@/components/screens/browser/BrowserBookmark";
import {LiaHomeSolid} from "react-icons/lia";
import {CgLink, CgMoreVertical} from "react-icons/cg";
import {BiPlus} from "react-icons/bi";
import {useBrowser} from "@/context/BrowserContext";
import BrowserResults from "@/components/screens/browser/BrowserResults";
import {BrowserScreen} from "@/types";
import BrowserWeb from "@/components/screens/browser/BrowserWeb";

const Browser = () => {
    const {currentBrowserScreen, setCurrentBrowserScreen, history, setHistory, setSearchResults, searchResults, currentSearch} = useBrowser()
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (query?: string, start?: number) => {
        const searchTerm = query ? query.trim() : searchQuery.trim()
        const startIndex = start || 1

        if (!searchTerm) return

        setIsLoading(true)

        try {
            const res = await fetch(`/api/browser/search?q=${encodeURIComponent(searchTerm)}&start=${startIndex}`)

            const result = await res.json()

            if (!result.success) {
                console.log("Error from api", result.error)
            }

            setHistory((prev) => [
                {
                    id: prev.length + 1,
                    query: searchQuery
                },
                ...prev
            ])

            setCurrentBrowserScreen("search-result")
            setSearchResults(result.data)
        } catch (error) {
            console.error("Failed to fetch search results:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const shouldHaveFrame = currentBrowserScreen === 'bookmark' || currentBrowserScreen === 'search-result' || currentBrowserScreen === 'web'

    return (
        <div className="relative w-full h-full overflow-hidden mt-10">
            {currentBrowserScreen === 'home' && (
                <BrowserHome
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                    isLoading={isLoading}
                    setScreen={setCurrentBrowserScreen}
                    onSubmit={handleSubmit}
                />
            )}

            {currentBrowserScreen === 'history' && (
                <BrowserHistory
                    setScreen={setCurrentBrowserScreen}
                    history={history}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                    setHistory={setHistory}
                    setSearchQuery={setSearchQuery}
                />
            )}

            {shouldHaveFrame && (
               <BrowserFrame setScreen={setCurrentBrowserScreen} onSubmit={handleSubmit} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
                   {currentBrowserScreen === 'bookmark' && (
                        <BrowserBookmark />
                   )}

                   {currentBrowserScreen === 'search-result' && searchResults && (
                       <BrowserResults {...searchResults} setSearchQuery={setSearchQuery} />
                   )}

                   {currentBrowserScreen === 'web' && currentSearch && (
                       <BrowserWeb />
                   )}
               </BrowserFrame>
            )}
        </div>
    )
}

export default Browser

const BrowserFrame = (
    {
        children,
        setScreen,
        searchQuery,
        setSearchQuery,
        onSubmit
    }: {
        children: ReactNode;
        setScreen:  Dispatch<SetStateAction<BrowserScreen>>;
        searchQuery: string;
        setSearchQuery: Dispatch<SetStateAction<string>>;
        onSubmit: (query?: string, start?: number) => Promise<void>
    }) => {
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await onSubmit()
    }

    return (
        <main className="relative w-full h-full overflow-x-hidden overflow-y-scroll no-visible-scrollbar">
            {/* Address Bar */}
            <div
                className="sticky top-0 flex items-center justify-between gap-3 py-2 px-2 w-full text-white bg-black z-50">
                <div className="flex items-center gap-2">
                    <LiaHomeSolid size={16} onClick={() => setScreen("home")}/>
                    <div className="bg-gray-600 rounded-full flex items-center gap-1 py-1 px-1">
                        <CgLink size={16}/>
                        <form onSubmit={handleSubmit}>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-0 text-xs bg-transparent focus-visible:ring-0 focus:outline-none"
                            />
                        </form>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <BiPlus fill="white" size={16}/>
                    <div
                        className="w-6 h-6 border-2 border-primary p-1 text-white flex-center rounded-md text-xs font-light">
                        1
                    </div>
                    <CgMoreVertical size={16}/>
                </div>
            </div>
            {children}
        </main>
    )
}