"use client"

import {Dispatch, SetStateAction, useState} from "react"
import {Button} from "@/components/ui/button"
import {BrowserScreen, HistoryType} from "@/types";
import {LuArrowLeft, LuClock, LuTrash2} from "react-icons/lu";
import {CgMoreVertical} from "react-icons/cg";
import {BiLoader} from "react-icons/bi";

interface BrowserHistoryProps {
    history: HistoryType[];
    setHistory: Dispatch<SetStateAction<HistoryType[]>>
    isLoading: boolean,
    setScreen: Dispatch<SetStateAction<BrowserScreen>>
    onSubmit: (query?: string, start?: number) => Promise<void>
    setSearchQuery: Dispatch<SetStateAction<string>>
}

const BrowserHistory = ({ onSubmit, history, isLoading, setScreen, setHistory, setSearchQuery}: BrowserHistoryProps) => {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredHistory = history.filter(
        (item) =>
            item.query.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const clearAllHistory = () => {
        setHistory([])
    }

    const handleSearch = async (query: string) => {
        setSearchQuery(query)

        setTimeout(() => {
            onSubmit()
        }, 500)
    }

    return (
        <div className="flex-1 w-full relative h-full flex flex-col px-2 py-4">
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search history"
                    className="w-full bg-gray-600 rounded-full border-0 py-3 px-4 text-base text-white flex-1 focus-visible:ring-0 focus:outline-none"
                />
            </div>

            {isLoading && (
                <div className="flex-center">
                    <BiLoader className="w-6 h-6 spin-custom text-gray-400" />
                </div>
            )}

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
                                    className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer hover:bg-black-100/40`}
                                    onClick={() => handleSearch(item.query)}
                                >
                                        <div className="flex-1 min-w-0 text-sm font-medium text-gray-400 truncate">{item.query}
                                        </div>

                                        <div className="text-gray-500 text-sm">9:03</div>
                                </div>
                            ))}
                        </div>
                    </div>

                {filteredHistory.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <LuClock className="w-12 h-12 mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">No history found</h3>
                        <p className="text-sm text-center px-8">
                            {searchTerm ? "Try a different tracks term" : "Your browsing history will appear here"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BrowserHistory