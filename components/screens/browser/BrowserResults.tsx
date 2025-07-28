import {CustomSearchResult, CustomSearchResultData} from "@/types";
import {useBrowser} from "@/context/BrowserContext";
import {Dispatch, SetStateAction} from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";

const BrowserResults = ({
    setSearchQuery,
    query,
     results,
     nextPage,
     previousPage,
     onPageChange,
 }: CustomSearchResult & {setSearchQuery: Dispatch<SetStateAction<string>>}) => {
    const {setCurrentSearch, setCurrentBrowserScreen, setHistory} = useBrowser()

    const handleSearch = (result: CustomSearchResultData) => {
        setSearchQuery(result.formattedUrl)
        setHistory((prev) => [
            {
                id: prev.length + 1,
                query: result.title,
                url: result.link,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                })
            },
            ...prev
        ])
        setCurrentSearch(result)
        setCurrentBrowserScreen("browser-frame")
    }

    return (
        <div className="px-3 pt-2 pb-12 text-sm text-gray-100 overflow-y-auto max-h-[calc(100vh-100px)] no-visible-scrollbar">
            <p className={cn("", results.length === 0 && "hidden")}>Showing results for <span className="text-blue-300 italic font-bold">{query}</span></p>

            <div className="my-5"/>

            {results.map((item, index) => (
                <div key={index} className="mb-5 cursor-default">
                    <div onClick={() => handleSearch(item)}
                        className="block text-sm font-medium text-blue-300 hover:underline"
                    >
                        {item.title}
                    </div>

                    <p
                        className="text-xs text-blue-400 break-all"
                    >
                        {item.displayLink}
                    </p>

                    <p className="text-gray-400 text-xs mt-1">{item.snippet}</p>
                </div>
            ))}

            {results.length === 0 && (
                <div className="flex-center flex-col gap-4 text-center">
                    <Image src="/icons/folder.svg" alt="empty" width={100} height={100} className="invert" />
                    <h2 className="text-white font-semibold text-xl">We couldn&apos;t find any data related to your search</h2>
                </div>
            )}

            <div className="flex justify-between my-6 text-sm">
                {previousPage ? (
                    <button
                        onClick={() => onPageChange?.(previousPage.startIndex)}
                        className="text-blue-400"
                    >
                        ◀ Previous
                    </button>
                ) : <div />}

                {nextPage && (
                    <button
                        onClick={() => onPageChange?.(nextPage.startIndex)}
                        className="text-blue-400 ml-auto"
                    >
                        Next ▶
                    </button>
                )}
            </div>
        </div>
    );
};

export default BrowserResults;
