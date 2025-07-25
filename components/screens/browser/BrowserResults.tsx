import {CustomSearchResult, CustomSearchResultData} from "@/types";
import {useBrowser} from "@/context/BrowserContext";
import {Dispatch, SetStateAction} from "react";

const BrowserResults = ({
    setSearchQuery,
     results,
     nextPage,
     previousPage,
     onPageChange,
 }: CustomSearchResult & {setSearchQuery: Dispatch<SetStateAction<string>>}) => {
    const {setCurrentSearch, setCurrentBrowserScreen} = useBrowser()

    const handleSearch = (result: CustomSearchResultData) => {
        setSearchQuery(result.formattedUrl)
        setCurrentSearch(result)
        setCurrentBrowserScreen("web")
    }

    return (
        <div className="p-4 text-sm text-gray-100 overflow-y-auto max-h-[calc(100vh-100px)] no-visible-scrollbar">
            {results.map((item, index) => (
                <div key={index} className="mb-5">
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 break-all"
                    >
                        {item.displayLink}
                    </a>

                    <div onClick={() => handleSearch(item)}
                        className="block text-sm font-medium text-blue-300 hover:underline"
                    >
                        {item.title}
                    </div>

                    {/*<a*/}
                    {/*    href={item.link}*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*    className="block text-sm font-medium text-blue-300 hover:underline"*/}
                    {/*>*/}
                    {/*    {item.title}*/}
                    {/*</a>*/}

                    <p className="text-gray-400 text-xs mt-1">{item.snippet}</p>
                </div>
            ))}

            <div className="flex justify-between mt-6 text-xs">
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
