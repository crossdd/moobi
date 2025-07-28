import {LiaHomeSolid} from "react-icons/lia";
import {BsPerson} from "react-icons/bs";
import {CgMoreVertical} from "react-icons/cg";
import Image from "next/image";
import {LuClock} from "react-icons/lu";
import {FiMoreHorizontal} from "react-icons/fi";
import {Button} from "@/components/ui/button";
import {BiLoader, BiSearch} from "react-icons/bi";
import {Dispatch, FormEvent, SetStateAction} from "react";
import {useBrowser} from "@/context/BrowserContext";

interface BrowserHomeProps {
    searchQuery: string;
    setSearchQuery:  Dispatch<SetStateAction<string>>;
}

const BrowserHome = ({searchQuery, setSearchQuery}: BrowserHomeProps) => {
    const {currentTab, handleSearch, setCurrentBrowserScreen, isSearching} = useBrowser()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await handleSearch(searchQuery)
    }

    return (
        <div className="flex-1 flex flex-col p-4">
            {/* Address Bar */}
            <div className="flex items-center justify-between gap-3 py-1 w-full">
                <LiaHomeSolid className="fill-white" size={20}/>

                <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full flex-center bg-gray-600">
                        <BsPerson fill="white" />
                    </div>
                    <div className="w-6 h-6 border-2 border-primary p-1 text-white flex-center rounded-md text-xs font-light cursor-default">
                        {currentTab}
                    </div>
                    <CgMoreVertical className="text-white w-4 h-4" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 pb-4 flex flex-col items-center justify-center">
                {/* Google Logo */}
                <Image src="/icons/google.svg" alt="google" width={152} height={81} className="my-4" />

                <form onSubmit={handleSubmit} className="w-full bg-gray-600 rounded-full border-0 py-3 px-4">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search or type web address"
                        className="bg-transparent text-base text-white flex-1 w-[90%] focus-visible:ring-0 focus:outline-none"
                    />

                    <Button type="submit" size="sm" variant="ghost" className="w-[10%]">
                        {isSearching ? (
                            <BiLoader className="w-6 h-6 text-white spin-custom" />
                        ) : (
                            <BiSearch className="w-6 h-6 text-white" />
                        )}
                    </Button>
                </form>

                {/* Quick Access Icons */}
                <div className="grid grid-cols-3 gap-6 w-full mt-5 max-w-xs">
                    <div className="flex flex-col items-center gap-2">
                        <div
                            onClick={() => handleSearch('https://epiphanusonyeso.vercel.app')}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer"
                        >
                            <Image src="/images/logo.png" alt="logo" width={42} height={42}
                                   className="object-cover object-center"/>
                        </div>
                        <span className="text-xs text-gray-600">Epiphanus</span>
                    </div>
                    <div className="flex flex-col items-center gap-2" onClick={() =>
                        setCurrentBrowserScreen("browser-history")}>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <LuClock className="w-6 h-6 text-white"/>
                        </div>
                        <span className="text-xs text-gray-600">History</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <FiMoreHorizontal className="w-6 h-6 text-white"/>
                        </div>
                        <span className="text-xs text-gray-600">More</span>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-center items-center py-4 border-t border-gray-600">
                <div className="flex gap-8">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default BrowserHome