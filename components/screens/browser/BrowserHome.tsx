import { LiaHomeSolid } from "react-icons/lia";
import { BsPerson } from "react-icons/bs";
import { CgMoreVertical } from "react-icons/cg";
import Image from "next/image";
import { LuClock } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { BiCopy, BiLoader, BiSearch } from "react-icons/bi";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { useBrowserStore } from "@/stores";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { type NewsArticle } from "@/types";

interface BrowserHomeProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
const BrowserHome = ({ searchQuery, setSearchQuery }: BrowserHomeProps) => {
  const {
    currentTab,
    handleSearch,
    changeBrowserScreen,
    isSearching,
    fetchNewsArticles,
    newsArticles,
    setSelectedUrl,
  } = useBrowserStore();

  useEffect(() => {
    fetchNewsArticles("Google");
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleSearch(searchQuery);
  };

  const handleArticleClick = (article: NewsArticle) => {
    const formattedUrl = {
      title: article.title,
      link: article.url,
    };

    setSelectedUrl(formattedUrl);
    changeBrowserScreen("browser-frame");
  };

  return (
    <div className="no-visible-scrollbar relative flex h-screen flex-1 flex-col overflow-y-scroll p-4">
      {/* Address Bar */}
      <div className="flex w-full items-center justify-between gap-3 py-1">
        <LiaHomeSolid className="fill-white" size={20} />

        <div className="flex items-center gap-4">
          <div className="flex-center h-6 w-6 rounded-full bg-gray-600">
            <BsPerson fill="white" />
          </div>
          <div className="flex-center h-6 w-6 cursor-default rounded-md border-2 border-primary p-1 text-xs font-light text-white">
            {currentTab}
          </div>
          <CgMoreVertical className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center pb-4">
        {/* Google Logo */}
        <Image
          src="/icons/google.svg"
          alt="google"
          width={152}
          height={81}
          className="my-4"
        />

        <form
          onSubmit={handleSubmit}
          className="sticky top-0 w-full rounded-3xl border-0 bg-gray-600 px-3 py-2"
        >
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or type web address"
            className="w-[90%] flex-1 bg-transparent text-base text-white focus:outline-none focus-visible:ring-0"
          />

          <Button type="submit" size="sm" variant="ghost" className="w-[10%]">
            {isSearching ? (
              <BiLoader className="spin-custom h-6 w-6 text-white" />
            ) : (
              <BiSearch className="h-6 w-6 text-white" />
            )}
          </Button>
        </form>

        {/* Quick Access Icons */}
        <div className="mt-5 grid w-full max-w-xs grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => handleSearch("https://epiphanusonyeso.vercel.app")}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white"
            >
              <Image
                src="/images/logo.webp"
                alt="logo"
                width={42}
                height={42}
                className="object-cover object-center"
              />
            </div>
            <span className="text-xs text-gray-600">Epiphanus</span>
          </div>
          <div
            className="flex flex-col items-center gap-2"
            onClick={() => changeBrowserScreen("browser-history")}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
              <LuClock className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs text-gray-600">History</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-purple-500 flex h-12 w-12 items-center justify-center rounded-full">
              <FiMoreHorizontal className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs text-gray-600">More</span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 pb-28">
        {newsArticles?.length === 0 && (
          <>
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-2xl p-2 dark:bg-neutral-900"
              >
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            ))}
          </>
        )}

        {newsArticles?.map((article) => (
          <div
            key={article.title}
            className="flex cursor-pointer flex-col gap-2 rounded-2xl p-2 dark:bg-neutral-900"
            onClick={() => handleArticleClick(article)}
          >
            <img
              src={article.image || "/images/no-img.webp"}
              alt={article.title}
              width={100}
              height={100}
              className="h-28 w-full rounded-2xl object-cover object-center"
            />
            <h2 className="line-clamp-3 text-base font-medium">
              {article.title}
            </h2>
            <div className="flex w-full items-center justify-between">
              <Link
                href={article.source.url}
                target="_blank"
                className="flex items-center gap-2"
              >
                <div className="flex-center h-6 w-6 rounded-full bg-gray-600">
                  <BsPerson fill="white" />
                </div>
                <p className="text-sm dark:text-gray-400">
                  {article.source.name}
                </p>
              </Link>

              <BiCopy />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowserHome;
