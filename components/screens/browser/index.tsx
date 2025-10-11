"use client";

import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import BrowserHistory from "@/components/screens/browser/BrowserHistory";
import BrowserHome from "@/components/screens/browser/BrowserHome";
import BrowserBookmark from "@/components/screens/browser/BrowserBookmark";
import { LiaHomeSolid } from "react-icons/lia";
import { CgLink, CgMoreVertical } from "react-icons/cg";
import { BiPlus } from "react-icons/bi";
import BrowserResults from "@/components/screens/browser/BrowserResults";
import { BrowserScreen } from "@/types";
import BrowserIframe from "@/components/screens/browser/BrowserIframe";
import { useBrowserStore } from "@/stores";

const Browser = () => {
  const {
    currentBrowserScreen,
    changeBrowserScreen,
    searchResults,
    selectedUrl,
    handleSearch,
  } = useBrowserStore();
  const [searchQuery, setSearchQuery] = useState(selectedUrl?.link ?? "");

  const shouldHaveFrame = [
    "browser-bookmark",
    "browser-search-results",
    "browser-frame",
  ];
  const hasFrame = shouldHaveFrame.includes(currentBrowserScreen);

  const isHome =
    currentBrowserScreen === "browser-home" ||
    (currentBrowserScreen !== "browser-history" && !hasFrame);

  console.log(currentBrowserScreen);

  return (
    <div className="relative mt-10 h-full w-full overflow-hidden">
      {isHome && (
        <BrowserHome
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      {currentBrowserScreen === "browser-history" && (
        <BrowserHistory setSearchQuery={setSearchQuery} />
      )}

      {hasFrame && (
        <Frame
          setScreen={changeBrowserScreen}
          onSubmit={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        >
          {currentBrowserScreen === "browser-bookmark" && (
            <BrowserBookmark setSearchQuery={setSearchQuery} />
          )}

          {currentBrowserScreen === "browser-search-results" &&
            searchResults && (
              <BrowserResults
                {...searchResults}
                setSearchQuery={setSearchQuery}
              />
            )}

          {currentBrowserScreen === "browser-frame" && selectedUrl && (
            <BrowserIframe />
          )}
        </Frame>
      )}
    </div>
  );
};

export default Browser;

const Frame = ({
  children,
  setScreen,
  searchQuery,
  setSearchQuery,
  onSubmit,
}: {
  children: ReactNode;
  setScreen: (screen: BrowserScreen) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onSubmit: (query: string, start?: number) => Promise<void>;
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(searchQuery);
  };

  return (
    <main className="no-visible-scrollbar relative h-full w-full overflow-x-hidden overflow-y-scroll">
      {/* Address Bar */}
      <div className="absolute top-0 z-50 flex w-full items-center justify-between gap-3 bg-white px-2 py-2 text-black dark:bg-black dark:text-white">
        <div className="flex items-center gap-2">
          <LiaHomeSolid size={16} onClick={() => setScreen("browser-home")} />
          <div className="flex items-center gap-1 rounded-full bg-gray-600 px-1 py-1">
            <CgLink size={16} />
            <form onSubmit={handleSubmit}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-xs focus:outline-none focus-visible:ring-0"
              />
            </form>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BiPlus fill="white" size={16} />
          <div className="flex-center h-6 w-6 rounded-md border-2 border-primary p-1 text-xs font-light text-white">
            1
          </div>
          <CgMoreVertical size={16} />
        </div>
      </div>
      {children}
    </main>
  );
};
