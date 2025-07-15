"use client"

import React, {useState} from "react"
import {Button} from "@/components/ui/button"
import {BrowserHistoryProps} from "@/types";
import {LuArrowLeft, LuClock, LuTrash2} from "react-icons/lu";
import {CgMoreVertical} from "react-icons/cg";

const BrowserHistory = ({setScreen, history, handleSearch, setHistory}: BrowserHistoryProps) => {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredHistory = history.filter(
        (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.url.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const clearAllHistory = () => {
        setHistory([])
    }

    return (
        <div className="flex-1 w-full relative h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="p-2" onClick={() => setScreen("home")}>
                        <LuArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-lg font-medium">
                        History
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={clearAllHistory}>
                        <LuTrash2 className="w-4 h-4 text-red-500" />
                    </button>
                    <CgMoreVertical className="w-5 h-5" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-3">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search history"
                    className="w-full bg-gray-600 rounded-full border-0 py-3 px-4 text-base text-white flex-1 focus-visible:ring-0 focus:outline-none"
                />
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto no-visible-scrollbar">
                    <div className="mb-4">
                        <div className="px-4 py-2 border-b border-primary">
                            <h2 className="text-sm font-medium text-gray-400">Today</h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {filteredHistory.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-black-100/40`}
                                    onClick={() => handleSearch(item.url)}
                                >
                                    {/* Favicon */}
                                    <div className="w-8 h-8 bg-gray-500 rounded-lg flex-center justify-center text-sm text-gray-800 uppercase font-bold">
                                        {item.title[0]}{item.title[3]}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-400 truncate">{item.title}</div>
                                        <div className="text-xs text-gray-500 truncate">{item.url}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                {filteredHistory.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <LuClock className="w-12 h-12 mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">No history found</h3>
                        <p className="text-sm text-center px-8">
                            {searchQuery ? "Try a different search term" : "Your browsing history will appear here"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BrowserHistory