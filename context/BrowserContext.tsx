'use client';

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState,} from 'react';
import {type CustomSearchResult, type BrowserScreen, type HistoryType, CustomSearchResultData} from "@/types";
import {browserHistory} from "@/constants";

interface ContextType {
    currentBrowserScreen: BrowserScreen;
    setCurrentBrowserScreen: Dispatch<SetStateAction<BrowserScreen>>;
    currentTab: number
    setCurrentTab: Dispatch<SetStateAction<number>>
    searchResults: CustomSearchResult | null
    setSearchResults:  Dispatch<SetStateAction<CustomSearchResult | null>>
    currentSearch: CustomSearchResultData | null
    setCurrentSearch:  Dispatch<SetStateAction<CustomSearchResultData | null>>
    history: HistoryType[]
    setHistory: Dispatch<SetStateAction<HistoryType[]>>
    isSearching: boolean
    handleSearch: (query: string, start?: number) => Promise<void>
}

const INIT_STATE: ContextType = {
    currentBrowserScreen: 'browser-home',
    setCurrentBrowserScreen: () => {},
    searchResults: null,
    setSearchResults: () => {},
    currentTab: 1,
    setCurrentTab: () => {},
    currentSearch: null,
    setCurrentSearch: () => {},
    history: browserHistory,
    setHistory: () => {},
    isSearching: false,
    handleSearch: async() => {}
};

const BrowserContext = createContext<ContextType>(INIT_STATE);

const BrowserProvider = ({ children }: { children: ReactNode }) => {
    const [currentBrowserScreen, setCurrentBrowserScreen] = useState<BrowserScreen>("browser-home")
    const [searchResults, setSearchResults] = useState<CustomSearchResult | null>(null)
    const [currentSearch, setCurrentSearch] = useState<CustomSearchResultData | null>(null)
    const [history, setHistory] = useState<HistoryType[]>(browserHistory)
    const [currentTab, setCurrentTab] = useState(1)

    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = async (query: string, start?: number) => {
        const startIndex = start || 1

        if (!query.trim()) return

        setIsSearching(true)

        try {
            const res = await fetch(`/api/browser/search?q=${encodeURIComponent(query)}&start=${startIndex}`)

            const result = await res.json()

            if (!result.success) {
                console.log("Browser API Error", result.error)
                return
            }

            setHistory((prev) => [
                {
                    id: prev.length + 1,
                    query: query,
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })
                },
                ...prev
            ])

            setCurrentBrowserScreen("browser-search-results")
            setSearchResults(result.data)
        } catch (error) {
            console.error("Failed to fetch search results:", error)
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <BrowserContext.Provider
            value={{
                searchResults,
                setSearchResults,
                currentSearch,
                setCurrentSearch,
                currentBrowserScreen,
                setCurrentBrowserScreen,
                currentTab,
                setCurrentTab,
                history,
                setHistory,
                handleSearch,
                isSearching,
            }}
        >
            {children}
        </BrowserContext.Provider>
    );
};

const useBrowser = () => useContext(BrowserContext);

export { BrowserProvider, useBrowser };
