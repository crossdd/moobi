import { CustomSearchResult, CustomSearchResultData } from "@/types";
import { useBrowserStore } from "@/stores";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const BrowserResults = ({
  setSearchQuery,
  query,
  results,
  nextPage,
  previousPage,
  onPageChange,
}: CustomSearchResult & {
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
  const { setSelectedUrl, changeBrowserScreen, setHistory } = useBrowserStore();

  const handleSearch = (result: CustomSearchResultData) => {
    setSearchQuery(result.formattedUrl!);
    setHistory(result.title, result.link);

    setSelectedUrl(result);
    changeBrowserScreen("browser-frame");
  };

  if (!results || results.length === 0) {
    changeBrowserScreen("browser-home");
    return null;
  }

  return (
    <div className="no-visible-scrollbar max-h-[calc(100vh-100px)] overflow-y-auto px-3 pb-12 pt-2 text-sm text-gray-100">
      <p className={cn("", results.length === 0 && "hidden")}>
        Showing results for{" "}
        <span className="font-bold italic text-blue-300">{query}</span>
      </p>

      <div className="my-5" />

      {results.map((item, index) => (
        <div key={index} className="mb-5 cursor-default">
          <div
            onClick={() => handleSearch(item)}
            className="block text-sm font-medium text-blue-300 hover:underline"
          >
            {item.title}
          </div>

          <p className="break-all text-xs text-blue-400">{item.displayLink}</p>

          <p className="mt-1 text-xs text-gray-400">{item.snippet}</p>
        </div>
      ))}

      {results.length === 0 && (
        <div className="flex-center flex-col gap-4 text-center">
          <Image
            src="/icons/folder.svg"
            alt="empty"
            width={100}
            height={100}
            className="invert"
          />
          <h2 className="text-xl font-semibold text-white">
            We couldn&apos;t find any data related to your search
          </h2>
        </div>
      )}

      <div className="my-6 flex justify-between text-sm">
        {previousPage ? (
          <button
            onClick={() => onPageChange?.(previousPage.startIndex)}
            className="text-blue-400"
          >
            ◀ Previous
          </button>
        ) : (
          <div />
        )}

        {nextPage && (
          <button
            onClick={() => onPageChange?.(nextPage.startIndex)}
            className="ml-auto text-blue-400"
          >
            Next ▶
          </button>
        )}
      </div>
    </div>
  );
};

export default BrowserResults;
