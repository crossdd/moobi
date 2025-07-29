import { FormEvent, useState } from "react";
import { useBrowser } from "@/context/BrowserContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BiMicrophone } from "react-icons/bi";
import { AiTwotoneCamera } from "react-icons/ai";

const BrowserWidget = () => {
  const { handleSearch } = useBrowser();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    await handleSearch(searchQuery);
  };

  return (
    <div className="relative col-span-3 flex h-11 items-center justify-between rounded-full border border-primary px-3 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Image
          src="/icons/google-g.svg"
          alt="Google"
          width={40}
          height={40}
          className="h-7 w-7 rounded-full"
        />

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-36 bg-transparent text-gray-200 focus:outline-none"
        />
      </form>

      <div className="flex items-center text-gray-50">
        <Button variant="secondary" className="h-7 w-7">
          <BiMicrophone />
        </Button>
        <Button variant="secondary" className="h-7 w-7">
          <AiTwotoneCamera />
        </Button>
      </div>
    </div>
  );
};
export default BrowserWidget;
