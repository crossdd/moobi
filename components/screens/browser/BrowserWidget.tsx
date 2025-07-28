import {FormEvent, useState} from 'react'
import {useBrowser} from "@/context/BrowserContext";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {BiMicrophone} from "react-icons/bi";
import {AiTwotoneCamera} from "react-icons/ai";
import {useMedia} from "@/context/MediaContext";

const BrowserWidget = () => {
    const {setCurrentScreen} = useMedia()
    const {handleSearch} = useBrowser()
    const [searchQuery, setSearchQuery] = useState("")

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!searchQuery.trim()) return

        setCurrentScreen("chrome")

        await handleSearch(searchQuery)
    }

    return (
        <div className="relative flex items-center justify-between row-span-1 col-span-3 h-11 rounded-full backdrop-blur-sm mb-8 px-3 border border-primary">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Image src="/icons/google-g.svg" alt="Google" width={40} height={40} className="w-7 h-7 rounded-full" />

                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="focus:outline-none bg-transparent text-gray-200 max-w-36"
                />
            </form>

            <div className="flex items-center text-gray-50">
                <Button variant="secondary" className="w-7 h-7">
                    <BiMicrophone />
                </Button>
                <Button variant="secondary" className="w-7 h-7">
                    <AiTwotoneCamera />
                </Button>
            </div>
        </div>
    )
}
export default BrowserWidget
