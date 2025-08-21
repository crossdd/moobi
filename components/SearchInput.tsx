import React, { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { LuSearchSlash } from "react-icons/lu";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  placeholder,
  className,
}: SearchInputProps) => {
  return (
    <div className="relative mb-4">
      <LuSearchSlash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-white/60" />

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full flex-1 rounded-full border-0 bg-gray-600 py-3 pl-8 pr-4 text-base text-white focus:outline-none focus-visible:ring-0",
          className,
        )}
      />
    </div>
  );
};
export default SearchInput;
