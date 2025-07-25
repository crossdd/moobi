'use client';

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState,} from 'react';
import {type CustomSearchResult, type BrowserScreen, type HistoryType, CustomSearchResultData} from "@/types";
import {browserHistory} from "@/constants";

interface ContextType {
    currentBrowserScreen: BrowserScreen;
    setCurrentBrowserScreen: Dispatch<SetStateAction<BrowserScreen>>;
    searchResults: CustomSearchResult | null
    setSearchResults:  Dispatch<SetStateAction<CustomSearchResult | null>>
    currentSearch: CustomSearchResultData | null
    setCurrentSearch:  Dispatch<SetStateAction<CustomSearchResultData | null>>
    history: HistoryType[]
    setHistory: Dispatch<SetStateAction<HistoryType[]>>
}

const INIT_STATE: ContextType = {
    currentBrowserScreen: 'home',
    setCurrentBrowserScreen: () => {},
    searchResults: null,
    setSearchResults: () => {},
    currentSearch: null,
    setCurrentSearch: () => {},
    history: browserHistory,
    setHistory: () => {}
};

const BrowserContext = createContext<ContextType>(INIT_STATE);

const BrowserProvider = ({ children }: { children: ReactNode }) => {
    const [currentBrowserScreen, setCurrentBrowserScreen] = useState<BrowserScreen>("home")
    const [searchResults, setSearchResults] = useState<CustomSearchResult | null>(null)
    const [currentSearch, setCurrentSearch] = useState<CustomSearchResultData | null>(null)
    const [history, setHistory] = useState<HistoryType[]>(browserHistory)

    return (
        <BrowserContext.Provider
            value={{
                searchResults,
                setSearchResults,
                currentSearch,
                setCurrentSearch,
                currentBrowserScreen,
                setCurrentBrowserScreen,
                history,
                setHistory
            }}
        >
            {children}
        </BrowserContext.Provider>
    );
};

const useBrowser = () => useContext(BrowserContext);

export { BrowserProvider, useBrowser };
