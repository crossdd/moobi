"use client"

import {Dispatch, SetStateAction, useState} from "react"
import {Button} from "@/components/ui/button"
import {LuArrowLeft, LuClock, LuTrash2} from "react-icons/lu";
import {CgMoreVertical} from "react-icons/cg";
import {BiLoader} from "react-icons/bi";
import {useBrowser} from "@/context/BrowserContext";
import {HistoryType} from "@/types";

interface BrowserHistoryProps {
    setSearchQuery: Dispatch<SetStateAction<string>>
}

const BrowserBookmark = ({ setSearchQuery}: BrowserHistoryProps) => {
    const {handleSearch, isSearching, setCurrentBrowserScreen } = useBrowser()
    const [searchTerm, setSearchTerm] = useState("")

    const bookmarkedPages: HistoryType[] = []

    const filteredBookmarks = bookmarkedPages.filter(
        (item) =>
            item.query.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleBookmarkClick = async (query: string) => {
        setSearchQuery(query)

        if(!query.trim()) return;

        await handleSearch(query)
    }

    return (
        <div className="flex-1 w-full relative h-full flex flex-col px-2 py-4">
            {/* Header */}
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="p-2" onClick={() => setCurrentBrowserScreen("browser-home")}>
                        <LuArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-lg font-medium">
                        Bookmarks
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button>
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
                    placeholder="Search bookmark"
                    className="w-full bg-gray-600 rounded-full border-0 py-3 px-4 text-base text-white flex-1 focus-visible:ring-0 focus:outline-none"
                />
            </div>

            {isSearching && (
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
                        {filteredBookmarks.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between p-3 cursor-pointer hover:bg-black-100/40"
                                onClick={() => handleBookmarkClick(item.url!)}
                            >
                                <div className="flex flex-col gap-1 w-[77%]">
                                    <h2 className="text-sm font-medium text-gray-200 truncate">{item.query}
                                    </h2>

                                    <p className="text-gray-300  text-xs truncate">{item?.url}</p>
                                </div>

                                <div className="text-gray-300 text-xs">{item.time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {filteredBookmarks.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <LuClock className="w-12 h-12 mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">No bookmarks found</h3>
                        <p className="text-sm text-center px-8">
                            {searchTerm ? "Try a different tracks term" : "You haven't bookmarked any pages yet."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BrowserBookmark