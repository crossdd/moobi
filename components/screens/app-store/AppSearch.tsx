import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { appCategories, mockApps } from "@/constants";
import { Button } from "@/components/ui/button";
import type { App, AppCategory, StoreScreen } from "@/types";
import { BiSearch } from "react-icons/bi";
import SearchInput from "@/components/SearchInput";
import AppSections from "@/components/screens/app-store/AppSections";
import { LuLoader } from "react-icons/lu";

const AppSearch = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedApp,
  setScreen,
}: {
  selectedCategory: AppCategory | "all";
  setSelectedCategory: Dispatch<SetStateAction<AppCategory | "all">>;
  setSelectedApp: Dispatch<SetStateAction<App | null>>;
  setScreen: Dispatch<SetStateAction<StoreScreen>>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<App[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSelectedCategory("all");
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredApps = mockApps.filter((app) => {
      if (selectedCategory !== "all" && app.category !== selectedCategory)
        return false;

      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        return (
          app.name.toLowerCase().includes(query) ||
          app.developer.toLowerCase().includes(query) ||
          app.description.toLowerCase().includes(query)
        );
      }

      return true;
    });

    setSearchResults(filteredApps);
    setIsSearching(false);
  };

  return (
    <div className="mt-5 flex flex-col gap-2 overflow-x-auto pb-2">
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Games, apps"
      />

      {isSearching && (
        <LuLoader className="spin-custom h-6 w-6 text-gray-400" />
      )}

      {!searchTerm &&
        searchResults.length === 0 &&
        appCategories.map((category) => (
          <Button
            key={category.key}
            onClick={() =>
              setSelectedCategory(category.key as AppCategory | "all")
            }
            className="flex flex-shrink-0 justify-start rounded-full border-0 bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/20"
          >
            <category.icon className="h-4 w-4" />
            <span className="ml-2">{category.name}</span>
          </Button>
        ))}

      {searchResults.length > 0 && (
        <AppSections
          title={`Search Results for ${searchTerm}`}
          apps={searchResults}
          setSelectedApp={setSelectedApp}
          setScreen={setScreen}
        />
      )}

      {searchTerm && searchResults.length === 0 && (
        <div className="py-16 text-center text-white/60">
          <BiSearch className="mx-auto mb-4 h-16 w-16 opacity-50" />
          <h3 className="mb-2 text-lg font-medium">No apps found</h3>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
export default AppSearch;
