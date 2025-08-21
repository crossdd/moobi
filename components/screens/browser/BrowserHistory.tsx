"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuClock, LuTrash2 } from "react-icons/lu";
import { CgMoreVertical } from "react-icons/cg";
import { BiLoader } from "react-icons/bi";
import { useBrowser } from "@/context/BrowserContext";
import SearchInput from "@/components/SearchInput";

interface BrowserHistoryProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const BrowserHistory = ({ setSearchQuery }: BrowserHistoryProps) => {
  const {
    handleSearch,
    setHistory,
    history,
    isSearching,
    setCurrentBrowserScreen,
  } = useBrowser();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter((item) =>
    item.query.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const clearAllHistory = () => {
    setHistory([]);
  };

  const handleHistoryClick = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) return;

    await handleSearch(query);
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col px-2 py-4">
      {/* Header */}
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setCurrentBrowserScreen("browser-home")}
          >
            <LuArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium">History</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearAllHistory}>
            <LuTrash2 className="h-4 w-4 text-red-500" />
          </button>
          <CgMoreVertical className="h-5 w-5" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search history"
        />
      </div>

      {isSearching && (
        <div className="flex-center">
          <BiLoader className="spin-custom h-6 w-6 text-gray-400" />
        </div>
      )}

      {/* History List */}
      <div className="no-visible-scrollbar flex-1 overflow-y-auto">
        <div className="mb-4">
          <div className="border-b border-primary px-4 py-2">
            <h2 className="text-sm font-medium text-gray-400">Today</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer justify-between p-3 hover:bg-black-100/40"
                onClick={() => handleHistoryClick(item.url || item.query)}
              >
                <div className="flex w-[77%] flex-col gap-1">
                  <h2 className="truncate text-sm font-medium text-gray-200">
                    {item.query}
                  </h2>

                  <p className="truncate text-xs text-gray-300">{item?.url}</p>
                </div>

                <div className="text-xs text-gray-300">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        {filteredHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <LuClock className="mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium">No history found</h3>
            <p className="px-8 text-center text-sm">
              {searchTerm
                ? "Try a different tracks term"
                : "Your browsing history will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserHistory;
